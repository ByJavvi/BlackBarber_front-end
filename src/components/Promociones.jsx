import React, { useEffect, useMemo, useState } from 'react';
import { promocionesApi } from '../api';
import { useAuth, ROLES } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../elements/Modal';
import { Button } from '../elements/Button';
import { ConfirmDialog } from '../elements/ConfirmDialog';
import { SkeletonRows, EmptyState } from '../elements/Spinner';
import { StatusBadge } from '../elements/Badge';
import { Input, Textarea } from '../elements/FormField';
import { fmtDate } from '../utils/file';

const empty = { id: 0, descripcion: '', fechaInicio: '', fechaFin: '' };
const vigente = (p) => new Date(p.fechaFin) >= new Date(new Date().toDateString());

const PromoModal = ({ open, onClose, initial, onSaved }) => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const editing = !!initial?.id;

  useEffect(() => { if (open) { setForm(initial ? { ...empty, ...initial } : empty); setErrors({}); } }, [open, initial]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    const er = {};
    if (!form.descripcion.trim()) er.descripcion = 'Requerido';
    if (!form.fechaInicio) er.fechaInicio = 'Requerido';
    if (!form.fechaFin) er.fechaFin = 'Requerido';
    if (form.fechaInicio && form.fechaFin && form.fechaFin < form.fechaInicio) er.fechaFin = 'Debe ser posterior al inicio';
    setErrors(er);
    if (Object.keys(er).length) return;
    try {
      setLoading(true);
      const res = editing ? await promocionesApi.editar(form) : await promocionesApi.crear(form);
      toast.success(res.descripcion || 'Guardado'); onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Editar promoción' : 'Nueva promoción'}
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>{editing ? 'Guardar' : 'Crear'}</Button></>}>
      <div className="space-y-4">
        <Textarea label="Descripción" value={form.descripcion} onChange={set('descripcion')} error={errors.descripcion} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Fecha inicio" type="date" value={form.fechaInicio?.slice(0, 10) || ''} onChange={set('fechaInicio')} error={errors.fechaInicio} />
          <Input label="Fecha fin" type="date" value={form.fechaFin?.slice(0, 10) || ''} onChange={set('fechaFin')} error={errors.fechaFin} />
        </div>
      </div>
    </Modal>
  );
};

export const PromocionesPage = () => {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const { user } = useAuth();
  const toast = useToast();
  const canEdit = user?.idRol === ROLES.ADMIN;

  const load = async () => { setLoading(true); setPromos(await promocionesApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const activas = useMemo(() => promos.filter(vigente).length, [promos]);
  const pct = promos.length ? Math.round((activas / promos.length) * 100) : 0;

  const remove = async () => { await promocionesApi.eliminar(confirm.id); toast.success('Promoción eliminada'); load(); };

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="border border-gray-600 rounded-lg shadow-md p-6">
        <p className="text-xl font-medium mb-4">{canEdit ? 'Administra tus promociones' : 'Promociones disponibles'}</p>
        <div className="w-full bg-gradient-to-t from-slate-500 to-slate-400 rounded-full h-6 overflow-hidden">
          <div className="h-6 rounded-full bg-gradient-to-r from-barber-gold-dark to-barber-gold transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-6 pt-4 text-sm">
          <span className="flex items-center gap-2"><span className="h-4 w-4 bg-barber-gold-dark rounded-full" />Vigentes: {activas}</span>
          <span className="flex items-center gap-2"><span className="h-4 w-4 bg-slate-400 rounded-full" />Vencidas: {promos.length - activas}</span>
        </div>
      </div>

      <div className="mt-4">
        {canEdit && <div className="flex justify-end py-2"><Button onClick={() => setModal({ open: true, initial: null })}>+ Nueva promoción</Button></div>}
        <div className="overflow-x-auto">
          <table className="border border-gray-600 w-full text-sm">
            <thead className="border-b border-gray-600 text-gray-300">
              <tr>
                <th className="text-start px-2 py-2 border-r border-gray-600 w-[45%]">Descripción</th>
                <th className="text-center px-2 border-r border-gray-600">Inicio</th>
                <th className="text-center px-2 border-r border-gray-600">Vence</th>
                <th className="text-center px-2 border-r border-gray-600">Estatus</th>
                {canEdit && <th className="text-center px-2">Acciones</th>}
              </tr>
            </thead>
            {loading ? <SkeletonRows cols={canEdit ? 5 : 4} /> : (
              <tbody className="divide-y divide-gray-700">
                {promos.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-800/70 transition duration-200 animate-fade-in">
                    <td className="px-2 py-2 border-r border-gray-700">{p.descripcion}</td>
                    <td className="text-center px-2 border-r border-gray-700">{fmtDate(p.fechaInicio)}</td>
                    <td className="text-center px-2 border-r border-gray-700">{fmtDate(p.fechaFin)}</td>
                    <td className="px-2 border-r border-gray-700 text-center"><StatusBadge active={vigente(p)} activeLabel="Vigente" inactiveLabel="Vencida" /></td>
                    {canEdit && (
                      <td className="px-2">
                        <div className="flex justify-center gap-2 py-1">
                          <button onClick={() => setModal({ open: true, initial: p })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-barber-gold-dark transition active:scale-90" title="Editar">✎</button>
                          <button onClick={() => setConfirm({ open: true, id: p.id })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-red-600 transition active:scale-90" title="Eliminar">🗑</button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!loading && promos.length === 0 && <EmptyState message="No hay promociones por ahora." />}
        </div>
      </div>

      <PromoModal open={modal.open} initial={modal.initial} onClose={() => setModal({ open: false, initial: null })} onSaved={load} />
      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })} onConfirm={remove} message="¿Eliminar esta promoción?" />
    </main>
  );
};
