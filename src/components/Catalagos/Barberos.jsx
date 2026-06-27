import React, { useEffect, useMemo, useState } from 'react';
import { barberosApi, usuariosApi } from '../../api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../elements/Modal';
import { Button } from '../../elements/Button';
import { ConfirmDialog } from '../../elements/ConfirmDialog';
import { SkeletonRows, EmptyState } from '../../elements/Spinner';
import { StatusBadge } from '../../elements/Badge';
import { Input, Select } from '../../elements/FormField';

const empty = { id: 0, nombre: '', estatus: 1 };

const BarberoModal = ({ open, onClose, initial, onSaved }) => {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const editing = !!initial?.id;

  useEffect(() => { if (open) { setForm(initial ? { ...empty, ...initial } : empty); setError(''); } }, [open, initial]);

  const submit = async () => {
    if (!form.nombre.trim()) { setError('El nombre es requerido'); return; }
    try {
      setLoading(true);
      const dto = { id: form.id, nombre: form.nombre, idUsuario: form.idUsuario ?? null, estatus: Number(form.estatus) };
      const res = editing ? await barberosApi.editar(dto) : await barberosApi.crear(dto);
      toast.success(res.descripcion || 'Guardado');
      onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Editar barbero' : 'Nuevo barbero'}
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>{editing ? 'Guardar' : 'Crear'}</Button></>}>
      <div className="space-y-4">
        <Input label="Nombre del barbero" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} error={error} />
        <Select label="Estatus" value={form.estatus} onChange={(e) => setForm({ ...form, estatus: e.target.value })}>
          <option value={1} className="bg-black-barber">Activo</option>
          <option value={0} className="bg-black-barber">Inactivo</option>
        </Select>
      </div>
    </Modal>
  );
};

const AsignarModal = ({ open, onClose, barbero, onSaved }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => { if (open) { usuariosApi.listar().then(setUsuarios); setIdUsuario(barbero?.idUsuario || ''); } }, [open, barbero]);

  const submit = async () => {
    if (!idUsuario) { toast.error('Selecciona un usuario'); return; }
    try {
      setLoading(true);
      const res = await barberosApi.asignarPerfil({ idUsuario: Number(idUsuario), idBarbero: barbero.id });
      toast.success(res.descripcion || 'Perfil asignado');
      onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Asignar perfil · ${barbero?.nombre || ''}`} size="sm"
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>Asignar</Button></>}>
      <Select label="Cuenta de usuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)}>
        <option value="" className="bg-black-barber">— Selecciona —</option>
        {usuarios.map((u) => <option key={u.id} value={u.id} className="bg-black-barber">{u.username} ({u.correo})</option>)}
      </Select>
      <p className="text-xs text-gray-500 mt-3">Vincula este barbero con una cuenta para que pueda iniciar sesión y ver su agenda.</p>
    </Modal>
  );
};

export const BarberosPage = () => {
  const [barberos, setBarberos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, initial: null });
  const [asignar, setAsignar] = useState({ open: false, barbero: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const toast = useToast();

  const load = async () => { setLoading(true); setBarberos(await barberosApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const activos = useMemo(() => barberos.filter((b) => b.estatus === 1).length, [barberos]);
  const pct = barberos.length ? Math.round((activos / barberos.length) * 100) : 0;

  const remove = async () => { await barberosApi.eliminar(confirm.id); toast.success('Barbero eliminado'); load(); };

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="border border-gray-600 rounded-lg shadow-md p-6">
        <p className="text-xl font-medium mb-4">Administra tus barberos</p>
        <div className="w-full bg-gradient-to-t from-slate-500 to-slate-400 rounded-full h-6 overflow-hidden">
          <div className="h-6 rounded-full bg-gradient-to-r from-barber-gold-dark to-barber-gold transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex gap-6 pt-4 text-sm">
          <span className="flex items-center gap-2"><span className="h-4 w-4 bg-barber-gold-dark rounded-full" />Activos: {activos}</span>
          <span className="flex items-center gap-2"><span className="h-4 w-4 bg-slate-400 rounded-full" />Inactivos: {barberos.length - activos}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-end py-2"><Button onClick={() => setModal({ open: true, initial: null })}>+ Nuevo barbero</Button></div>
        <div className="overflow-x-auto">
          <table className="border border-gray-600 w-full text-sm">
            <thead className="border-b border-gray-600 text-gray-300">
              <tr>
                <th className="text-start px-2 py-2 border-r border-gray-600 w-[35%]">Nombre</th>
                <th className="text-start px-2 border-r border-gray-600 w-[30%]">Usuario</th>
                <th className="text-center px-2 border-r border-gray-600 w-[15%]">Estatus</th>
                <th className="text-center px-2 w-[20%]">Acciones</th>
              </tr>
            </thead>
            {loading ? <SkeletonRows cols={4} /> : (
              <tbody className="divide-y divide-gray-700">
                {barberos.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-800/70 transition duration-200 animate-fade-in">
                    <td className="px-2 py-2 border-r border-gray-700">{b.nombre}</td>
                    <td className="px-2 border-r border-gray-700 text-gray-400">{b.nombreUsuario || <span className="italic text-gray-600">Sin asignar</span>}</td>
                    <td className="px-2 border-r border-gray-700 text-center"><StatusBadge active={b.estatus === 1} /></td>
                    <td className="px-2">
                      <div className="flex justify-center gap-2 py-1">
                        <button onClick={() => setModal({ open: true, initial: b })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-barber-gold-dark transition active:scale-90" title="Editar">✎</button>
                        <button onClick={() => setAsignar({ open: true, barbero: b })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-amber-500 transition active:scale-90" title="Asignar perfil">👤</button>
                        <button onClick={() => setConfirm({ open: true, id: b.id })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-red-600 transition active:scale-90" title="Eliminar">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {!loading && barberos.length === 0 && <EmptyState message="No hay barberos registrados." />}
        </div>
      </div>

      <BarberoModal open={modal.open} initial={modal.initial} onClose={() => setModal({ open: false, initial: null })} onSaved={load} />
      <AsignarModal open={asignar.open} barbero={asignar.barbero} onClose={() => setAsignar({ open: false, barbero: null })} onSaved={load} />
      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })} onConfirm={remove} message="¿Eliminar este barbero?" />
    </main>
  );
};
