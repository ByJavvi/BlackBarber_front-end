import React, { useEffect, useState } from 'react';
import { usuariosApi } from '../../api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../elements/Modal';
import { Button } from '../../elements/Button';
import { SkeletonRows, EmptyState } from '../../elements/Spinner';
import { StatusBadge, Badge } from '../../elements/Badge';
import { Input, Select } from '../../elements/FormField';
import { fmtDateTime } from '../../utils/file';

const ROL_LABEL = { 1: 'Admin', 2: 'Barbero', 3: 'Cliente' };
const empty = { id: 0, username: '', correo: '', contrasena: '', estatus: 1, idRol: 3 };

const UsuarioModal = ({ open, onClose, initial, onSaved }) => {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const editing = !!initial?.id;

  useEffect(() => { if (open) { setForm(initial ? { ...empty, ...initial, contrasena: '' } : empty); setErrors({}); } }, [open, initial]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    const er = {};
    if (form.username.trim().length < 3) er.username = 'Mínimo 3 caracteres';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) er.correo = 'Correo inválido';
    if (!editing && form.contrasena.length < 8) er.contrasena = 'Mínimo 8 caracteres';
    setErrors(er);
    if (Object.keys(er).length) return;
    try {
      setLoading(true);
      const res = editing
        ? await usuariosApi.editar({ id: form.id, username: form.username, correo: form.correo, contrasena: form.contrasena, estatus: Number(form.estatus) })
        : await usuariosApi.crear({ username: form.username, correo: form.correo, contrasena: form.contrasena });
      toast.success(res.descripcion || 'Guardado'); onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Editar usuario' : 'Nuevo usuario'}
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>{editing ? 'Guardar' : 'Crear'}</Button></>}>
      <div className="space-y-4">
        <Input label="Username" value={form.username} onChange={set('username')} error={errors.username} />
        <Input label="Correo" value={form.correo} onChange={set('correo')} error={errors.correo} />
        <Input label={editing ? 'Nueva contraseña (opcional)' : 'Contraseña'} type="password" value={form.contrasena} onChange={set('contrasena')} error={errors.contrasena} />
        {editing && (
          <Select label="Estatus" value={form.estatus} onChange={set('estatus')}>
            <option value={1} className="bg-black-barber">Activo</option>
            <option value={0} className="bg-black-barber">Bloqueado</option>
          </Select>
        )}
      </div>
    </Modal>
  );
};

export const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, initial: null });
  const [query, setQuery] = useState('');
  const toast = useToast();

  const load = async () => { setLoading(true); setUsuarios(await usuariosApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const toggleEstatus = async (u) => {
    await usuariosApi.editar({ id: u.id, username: u.username, correo: u.correo, contrasena: '', estatus: u.estatus === 1 ? 0 : 1 });
    toast.success(u.estatus === 1 ? 'Usuario bloqueado' : 'Usuario activado');
    load();
  };

  const filtrados = usuarios.filter((u) =>
    `${u.username} ${u.correo}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-medium">Usuarios del sistema</h2>
        <div className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar..."
            className="rounded-md border-2 border-[#f1d7ba]/50 focus:border-barber-gold bg-transparent px-3 py-2 outline-none text-sm transition-colors" />
          <Button onClick={() => setModal({ open: true, initial: null })}>+ Nuevo usuario</Button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="border border-gray-600 w-full text-sm">
          <thead className="border-b border-gray-600 text-gray-300">
            <tr>
              <th className="text-start px-2 py-2 border-r border-gray-600">Username</th>
              <th className="text-start px-2 border-r border-gray-600">Correo</th>
              <th className="text-center px-2 border-r border-gray-600">Rol</th>
              <th className="text-center px-2 border-r border-gray-600">Creación</th>
              <th className="text-center px-2 border-r border-gray-600">Estatus</th>
              <th className="text-center px-2">Acciones</th>
            </tr>
          </thead>
          {loading ? <SkeletonRows cols={6} /> : (
            <tbody className="divide-y divide-gray-700">
              {filtrados.map((u) => (
                <tr key={u.id} className="hover:bg-zinc-800/70 transition duration-200 animate-fade-in">
                  <td className="px-2 py-2 border-r border-gray-700">{u.username}</td>
                  <td className="px-2 border-r border-gray-700 text-gray-400">{u.correo}</td>
                  <td className="text-center px-2 border-r border-gray-700"><Badge tone={u.idRol === 1 ? 'gold' : u.idRol === 2 ? 'blue' : 'gray'}>{ROL_LABEL[u.idRol] || 'Cliente'}</Badge></td>
                  <td className="text-center px-2 border-r border-gray-700 text-gray-400">{fmtDateTime(u.horaCreacion)}</td>
                  <td className="px-2 border-r border-gray-700 text-center"><StatusBadge active={u.estatus === 1} activeLabel="Activo" inactiveLabel="Bloqueado" /></td>
                  <td className="px-2">
                    <div className="flex justify-center gap-2 py-1">
                      <button onClick={() => setModal({ open: true, initial: u })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-barber-gold-dark transition active:scale-90" title="Editar">✎</button>
                      <button onClick={() => toggleEstatus(u)} className={`h-8 w-8 rounded-lg bg-zinc-700 transition active:scale-90 ${u.estatus === 1 ? 'hover:bg-red-600' : 'hover:bg-green-600'}`} title={u.estatus === 1 ? 'Bloquear' : 'Activar'}>{u.estatus === 1 ? '🔒' : '🔓'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!loading && filtrados.length === 0 && <EmptyState message="Sin usuarios que coincidan." />}
      </div>

      <UsuarioModal open={modal.open} initial={modal.initial} onClose={() => setModal({ open: false, initial: null })} onSaved={load} />
    </main>
  );
};
