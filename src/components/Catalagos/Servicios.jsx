import React, { useEffect, useMemo, useState } from 'react';
import { serviciosApi } from '../../services/servicioService';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../elements/Modal';
import { Button } from '../../elements/Button';
import { ConfirmDialog } from '../../elements/ConfirmDialog';
import { SkeletonRows, EmptyState } from '../../elements/Spinner';
import { StatusBadge } from '../../elements/Badge';
import { Input, Textarea, Select } from '../../elements/FormField';
import { fileToBase64, base64ToSrc, fmtMoney } from '../../utils/file';

const TIPOS = [
  { id: 1, nombre: 'Corte' },
  { id: 2, nombre: 'Barba' },
  { id: 3, nombre: 'Combo' },
  { id: 4, nombre: 'Spa' },
];
const tipoNombre = (id) => TIPOS.find((t) => t.id === id)?.nombre || '—';

const empty = { id: 0, nombre: '', descripcion: '', idTipo: 1, precioBase: '', horas: 1, base64: null, estatus: 1 };

const ServicioModal = ({ open, onClose, initial, onSaved }) => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const editing = !!initial?.id;

  useEffect(() => { if (open) { setForm(initial ? { ...empty, ...initial, precioBase: initial.precioBase ?? '' } : empty); setErrors({}); } }, [open, initial]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (f) setForm({ ...form, base64: await fileToBase64(f) });
  };

  const validate = () => {
    const er = {};
    if (!form.nombre.trim()) er.nombre = 'Requerido';
    if (form.precioBase === '' || Number(form.precioBase) < 0) er.precioBase = 'Precio inválido';
    if (Number(form.horas) <= 0) er.horas = 'Mínimo 1';
    setErrors(er);
    return !Object.keys(er).length;
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      const dto = { ...form, idTipo: Number(form.idTipo), precioBase: Number(form.precioBase), horas: Number(form.horas), estatus: Number(form.estatus) };
      const res = editing ? await serviciosApi.editar(dto) : await serviciosApi.crear(dto);
      toast.success(res.descripcion || 'Guardado');
      onSaved();
      onClose();
    } catch (err) { toast.error(err.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Editar servicio' : 'Nuevo servicio'} size="lg"
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>{editing ? 'Guardar cambios' : 'Crear'}</Button></>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre" value={form.nombre} onChange={set('nombre')} error={errors.nombre} />
        <Select label="Tipo" value={form.idTipo} onChange={set('idTipo')}>
          {TIPOS.map((t) => <option key={t.id} value={t.id} className="bg-black-barber">{t.nombre}</option>)}
        </Select>
        <Textarea label="Descripción" value={form.descripcion || ''} onChange={set('descripcion')} className="md:col-span-2" />
        <Input label="Precio base" type="number" min="0" step="0.01" value={form.precioBase} onChange={set('precioBase')} error={errors.precioBase} />
        <Input label="Horas" type="number" min="1" value={form.horas} onChange={set('horas')} error={errors.horas} />
        <Select label="Estatus" value={form.estatus} onChange={set('estatus')}>
          <option value={1} className="bg-black-barber">Activo</option>
          <option value={0} className="bg-black-barber">Inactivo</option>
        </Select>
        <div className="flex flex-col gap-1">
          <label className="text-barber-gold text-sm">Imagen</label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-3 py-2 rounded-md border-2 border-[#f1d7ba]/60 hover:border-barber-gold text-sm transition-colors">
              Subir imagen
              <input type="file" accept="image/*" onChange={onFile} className="hidden" />
            </label>
            {form.base64 && <img src={base64ToSrc(form.base64)} alt="" className="h-10 w-10 object-cover rounded" />}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const AnadidosPanel = ({ servicio, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '' });
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const load = async () => { setLoading(true); setItems(await serviciosApi.anadidos(servicio.id)); setLoading(false); };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [servicio.id]);

  const add = async () => {
    if (!nuevo.nombre.trim()) { toast.error('El añadido necesita nombre'); return; }
    try {
      setSaving(true);
      await serviciosApi.crearAnadido({ ...nuevo, precio: Number(nuevo.precio || 0), idPerteneciente: servicio.id });
      setNuevo({ nombre: '', descripcion: '', precio: '' });
      toast.success('Añadido creado');
      load();
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };

  const del = async (id) => { await serviciosApi.eliminarAnadido(id); toast.success('Añadido eliminado'); load(); };

  return (
    <div className="w-full lg:w-[420px] shrink-0 border border-barber-gold/30 rounded-lg p-4 bg-zinc-900/60 animate-slide-in-right">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-barber-gold font-medium">Añadidos · {servicio.nombre}</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-barber-gold transition hover:rotate-90 duration-200">✕</button>
      </div>
      {loading ? (
        <div className="space-y-2">{[0, 1].map((i) => <div key={i} className="h-8 rounded skeleton" />)}</div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {items.length === 0 && <p className="text-sm text-gray-500">Sin añadidos aún.</p>}
          {items.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-2 bg-zinc-800/50 rounded px-3 py-2 hover:bg-zinc-800 transition animate-fade-in">
              <div>
                <p className="text-sm text-gray-100">{a.nombre}</p>
                <p className="text-xs text-gray-500">{a.descripcion}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-barber-gold text-sm">{fmtMoney(a.precio)}</span>
                <button onClick={() => del(a.id)} className="text-red-400 hover:text-red-300 transition" aria-label="Eliminar">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3 pt-3 border-t border-barber-gold/20 space-y-2">
        <Input placeholder="Nombre del añadido" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <Input placeholder="Descripción" value={nuevo.descripcion} onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })} />
        <div className="flex gap-2">
          <Input placeholder="Precio" type="number" min="0" step="0.01" value={nuevo.precio} onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })} className="flex-1" />
          <Button loading={saving} onClick={add}>Agregar</Button>
        </div>
      </div>
    </div>
  );
};

export const ServiciosPage = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [panel, setPanel] = useState(null);
  const toast = useToast();

  const load = async () => { setLoading(true); setServicios(await serviciosApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const activos = useMemo(() => servicios.filter((s) => s.estatus === 1).length, [servicios]);
  const pct = servicios.length ? Math.round((activos / servicios.length) * 100) : 0;

  const remove = async () => { await serviciosApi.eliminar(confirm.id); toast.success('Servicio eliminado'); load(); };

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="border border-gray-600 rounded-lg shadow-md p-6">
        <p className="text-xl font-medium mb-4">Administra tus servicios</p>
        <div className="w-full bg-gradient-to-t from-slate-500 to-slate-400 rounded-full h-6 overflow-hidden">
          <div className="h-6 rounded-full bg-gradient-to-r from-barber-gold-dark to-barber-gold transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-6 pt-4 text-sm">
          <span className="flex items-center gap-2"><span className="h-4 w-4 bg-barber-gold-dark rounded-full" />Activos: {activos}</span>
          <span className="flex items-center gap-2"><span className="h-4 w-4 bg-slate-400 rounded-full" />Inactivos: {servicios.length - activos}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-end py-2">
          <Button onClick={() => setModal({ open: true, initial: null })}>+ Nuevo servicio</Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 overflow-x-auto">
            <table className="border border-gray-600 w-full text-sm">
              <thead className="border-b border-gray-600 text-gray-300">
                <tr>
                  <th className="text-start px-2 py-2 border-r border-gray-600">Nombre</th>
                  <th className="text-start px-2 border-r border-gray-600">Descripción</th>
                  <th className="text-center px-2 border-r border-gray-600">Tipo</th>
                  <th className="text-end px-2 border-r border-gray-600">Precio</th>
                  <th className="text-center px-2 border-r border-gray-600">Hrs</th>
                  <th className="text-center px-2 border-r border-gray-600">Estatus</th>
                  <th className="text-center px-2">Acciones</th>
                </tr>
              </thead>
              {loading ? <SkeletonRows cols={7} /> : (
                <tbody className="divide-y divide-gray-700">
                  {servicios.map((s) => (
                    <tr key={s.id} className="hover:bg-zinc-800/70 transition duration-200 animate-fade-in">
                      <td className="px-2 py-2 border-r border-gray-700">{s.nombre}</td>
                      <td className="px-2 border-r border-gray-700 text-gray-400">{s.descripcion}</td>
                      <td className="text-center px-2 border-r border-gray-700">{tipoNombre(s.idTipo)}</td>
                      <td className="text-end px-2 border-r border-gray-700">{fmtMoney(s.precioBase)}</td>
                      <td className="text-center px-2 border-r border-gray-700">{s.horas}</td>
                      <td className="px-2 border-r border-gray-700 text-center"><StatusBadge active={s.estatus === 1} /></td>
                      <td className="px-2">
                        <div className="flex justify-center gap-2 py-1">
                          <button onClick={() => setModal({ open: true, initial: s })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-barber-gold-dark transition active:scale-90" title="Editar">✎</button>
                          <button onClick={() => setConfirm({ open: true, id: s.id })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-red-600 transition active:scale-90" title="Eliminar">🗑</button>
                          <button onClick={() => setPanel(s)} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-amber-500 transition active:scale-90" title="Añadidos">＋</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {!loading && servicios.length === 0 && <EmptyState message="Aún no hay servicios. Crea el primero." />}
          </div>
          {panel && <AnadidosPanel servicio={panel} onClose={() => setPanel(null)} />}
        </div>
      </div>

      <ServicioModal open={modal.open} initial={modal.initial} onClose={() => setModal({ open: false, initial: null })} onSaved={load} />
      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })} onConfirm={remove} message="¿Eliminar este servicio? Esta acción no se puede deshacer." />
    </main>
  );
};
