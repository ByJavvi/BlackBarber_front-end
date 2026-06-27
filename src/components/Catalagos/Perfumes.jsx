import React, { useEffect, useState } from 'react';
import { perfumesApi } from '../../api';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../elements/Modal';
import { Button } from '../../elements/Button';
import { ConfirmDialog } from '../../elements/ConfirmDialog';
import { SkeletonRows, EmptyState } from '../../elements/Spinner';
import { StatusBadge } from '../../elements/Badge';
import { Input, Textarea } from '../../elements/FormField';
import { fileToBase64, base64ToSrc } from '../../utils/file';

const empty = { id: 0, nombre: '', descripcion: '', base64: null, disponible: true };

const PerfumeModal = ({ open, onClose, initial, onSaved }) => {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const editing = !!initial?.id;

  useEffect(() => { if (open) { setForm(initial ? { ...empty, ...initial } : empty); setError(''); } }, [open, initial]);

  const onFile = async (e) => { const f = e.target.files?.[0]; if (f) setForm({ ...form, base64: await fileToBase64(f) }); };

  const submit = async () => {
    if (!form.nombre.trim()) { setError('El nombre es requerido'); return; }
    try {
      setLoading(true);
      const res = editing ? await perfumesApi.editar(form) : await perfumesApi.crear(form);
      toast.success(res.descripcion || 'Guardado');
      onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Editar perfume' : 'Nuevo perfume'}
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>{editing ? 'Guardar' : 'Crear'}</Button></>}>
      <div className="space-y-4">
        <Input label="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} error={error} />
        <Textarea label="Descripción" value={form.descripcion || ''} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <label className="text-barber-gold text-sm">Imagen</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer px-3 py-2 rounded-md border-2 border-[#f1d7ba]/60 hover:border-barber-gold text-sm transition-colors">
                Subir imagen<input type="file" accept="image/*" onChange={onFile} className="hidden" />
              </label>
              {form.base64 && <img src={base64ToSrc(form.base64)} alt="" className="h-10 w-10 object-cover rounded" />}
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={!!form.disponible} onChange={(e) => setForm({ ...form, disponible: e.target.checked })} className="accent-barber-gold w-4 h-4" />
            <span className="text-sm text-gray-300">Disponible</span>
          </label>
        </div>
      </div>
    </Modal>
  );
};

export const PerfumesPage = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const toast = useToast();

  const load = async () => { setLoading(true); setPerfumes(await perfumesApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const remove = async () => { await perfumesApi.eliminar(confirm.id); toast.success('Perfume eliminado'); load(); };

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Catálogo de perfumes</h2>
        <Button onClick={() => setModal({ open: true, initial: null })}>+ Nuevo perfume</Button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="border border-gray-600 w-full text-sm">
          <thead className="border-b border-gray-600 text-gray-300">
            <tr>
              <th className="text-start px-2 py-2 border-r border-gray-600 w-[20%]">Nombre</th>
              <th className="text-start px-2 border-r border-gray-600 w-[40%]">Descripción</th>
              <th className="text-center px-2 border-r border-gray-600 w-[15%]">Imagen</th>
              <th className="text-center px-2 border-r border-gray-600 w-[12%]">Disponible</th>
              <th className="text-center px-2 w-[13%]">Acciones</th>
            </tr>
          </thead>
          {loading ? <SkeletonRows cols={5} /> : (
            <tbody className="divide-y divide-gray-700">
              {perfumes.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/70 transition duration-200 animate-fade-in">
                  <td className="px-2 py-2 border-r border-gray-700">{p.nombre}</td>
                  <td className="px-2 border-r border-gray-700 text-gray-400">{p.descripcion}</td>
                  <td className="px-2 border-r border-gray-700">
                    <div className="flex justify-center">
                      <img src={base64ToSrc(p.base64) || 'https://cdn-icons-png.flaticon.com/512/16627/16627731.png'} alt="" className="h-9 w-9 object-cover rounded" />
                    </div>
                  </td>
                  <td className="px-2 border-r border-gray-700 text-center"><StatusBadge active={!!p.disponible} activeLabel="Disponible" inactiveLabel="Agotado" /></td>
                  <td className="px-2">
                    <div className="flex justify-center gap-2 py-1">
                      <button onClick={() => setModal({ open: true, initial: p })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-barber-gold-dark transition active:scale-90" title="Editar">✎</button>
                      <button onClick={() => setConfirm({ open: true, id: p.id })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-red-600 transition active:scale-90" title="Eliminar">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {!loading && perfumes.length === 0 && <EmptyState message="No hay perfumes en el catálogo." />}
      </div>

      <PerfumeModal open={modal.open} initial={modal.initial} onClose={() => setModal({ open: false, initial: null })} onSaved={load} />
      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })} onConfirm={remove} message="¿Eliminar este perfume?" />
    </main>
  );
};
