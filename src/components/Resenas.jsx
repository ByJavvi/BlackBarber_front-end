import React, { useEffect, useState } from 'react';
import { resenasApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../elements/Modal';
import { Button } from '../elements/Button';
import { ConfirmDialog } from '../elements/ConfirmDialog';
import { Spinner, EmptyState } from '../elements/Spinner';
import { Stars } from '../elements/Badge';
import { Input, Textarea, StarRating } from '../elements/FormField';

const empty = { id: 0, idCita: '', calificacion: 5, comentario: '' };

const ResenaModal = ({ open, onClose, initial, onSaved, idUsuario }) => {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const editing = !!initial?.id;

  useEffect(() => { if (open) setForm(initial ? { ...empty, ...initial } : empty); }, [open, initial]);

  const submit = async () => {
    if (!form.comentario.trim()) { toast.error('Escribe un comentario'); return; }
    try {
      setLoading(true);
      const dto = { ...form, idCita: Number(form.idCita) || null, idUsuario, calificacion: Number(form.calificacion) };
      const res = editing ? await resenasApi.editar(dto) : await resenasApi.crear(dto);
      toast.success(res.descripcion || 'Reseña guardada'); onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? 'Editar reseña' : 'Nueva reseña'}
      footer={<><Button variant="subtle" onClick={onClose}>Cancelar</Button><Button loading={loading} onClick={submit}>{editing ? 'Guardar' : 'Publicar'}</Button></>}>
      <div className="space-y-4">
        <Input label="ID de cita" type="number" value={form.idCita} onChange={(e) => setForm({ ...form, idCita: e.target.value })} />
        <div>
          <label className="text-barber-gold text-sm">Calificación</label>
          <div className="mt-1"><StarRating value={Number(form.calificacion)} onChange={(n) => setForm({ ...form, calificacion: n })} /></div>
        </div>
        <Textarea label="Comentario" value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} />
      </div>
    </Modal>
  );
};

export const ResenasPage = () => {
  const { user } = useAuth();
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, initial: null });
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const toast = useToast();

  const load = async () => { setLoading(true); setResenas(await resenasApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const promedio = resenas.length ? (resenas.reduce((a, r) => a + (r.calificacion || 0), 0) / resenas.length).toFixed(1) : '0.0';
  const remove = async () => { await resenasApi.eliminar(confirm.id); toast.success('Reseña eliminada'); load(); };

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-medium">Reseñas de clientes</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-3xl font-bold text-barber-gold">{promedio}</span>
            <Stars value={Math.round(Number(promedio))} size="w-5 h-5" />
            <span className="text-sm text-gray-500">({resenas.length})</span>
          </div>
        </div>
        <Button onClick={() => setModal({ open: true, initial: null })}>+ Nueva reseña</Button>
      </div>

      <div className="mt-5">
        {loading ? <Spinner label="Cargando reseñas..." /> : resenas.length === 0 ? <EmptyState message="Aún no hay reseñas." /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resenas.map((r) => (
              <div key={r.id} className="border border-gray-700 hover:border-barber-gold/50 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <Stars value={r.calificacion} />
                  <span className="text-xs text-gray-500">Cita #{r.idCita}</span>
                </div>
                <p className="text-gray-300 mt-3 leading-relaxed">"{r.comentario}"</p>
                <div className="flex justify-end gap-2 mt-3">
                  <button onClick={() => setModal({ open: true, initial: r })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-barber-gold-dark transition active:scale-90" title="Editar">✎</button>
                  <button onClick={() => setConfirm({ open: true, id: r.id })} className="h-8 w-8 rounded-lg bg-zinc-700 hover:bg-red-600 transition active:scale-90" title="Eliminar">🗑</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ResenaModal open={modal.open} initial={modal.initial} idUsuario={user?.id} onClose={() => setModal({ open: false, initial: null })} onSaved={load} />
      <ConfirmDialog open={confirm.open} onClose={() => setConfirm({ open: false, id: null })} onConfirm={remove} message="¿Eliminar esta reseña?" />
    </main>
  );
};
