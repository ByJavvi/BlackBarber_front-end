import React, { useEffect, useState } from 'react';
import { diasHabilesApi } from '../api';
import { useToast } from '../context/ToastContext';
import { Button } from '../elements/Button';
import { Spinner } from '../elements/Spinner';

const hhmm = (t) => (t ? String(t).slice(0, 5) : '00:00');

export const DiasHabilesPage = () => {
  const [dias, setDias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const toast = useToast();

  const load = async () => { setLoading(true); setDias(await diasHabilesApi.todos()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const update = (id, patch) => setDias((arr) => arr.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const guardar = async (d) => {
    try {
      setSavingId(d.id);
      await diasHabilesApi.editar({ ...d, horaInicio: `${hhmm(d.horaInicio)}:00`, horaFin: `${hhmm(d.horaFin)}:00` });
      toast.success(`${d.nombre} actualizado`);
    } catch (e) { toast.error(e.message); } finally { setSavingId(null); }
  };

  if (loading) return <main className="bg-zinc-900 min-h-[91dvh] m-2 rounded-md"><Spinner label="Cargando horarios..." /></main>;

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <h2 className="text-xl font-medium">Horarios de atención</h2>
      <p className="text-sm text-gray-400 mb-5">Activa los días hábiles y define el horario de la barbería.</p>

      <div className="space-y-3 max-w-3xl">
        {dias.map((d) => (
          <div key={d.id} className={`flex flex-col sm:flex-row sm:items-center gap-4 border rounded-xl p-4 transition-all duration-300 animate-fade-in ${d.habil ? 'border-barber-gold/40 bg-zinc-900/60' : 'border-gray-700 bg-zinc-900/30 opacity-70'}`}>
            <div className="flex items-center gap-3 w-40">
              <button
                onClick={() => update(d.id, { habil: !d.habil })}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${d.habil ? 'bg-barber-gold' : 'bg-zinc-600'}`}
                aria-label="Alternar día hábil"
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${d.habil ? 'translate-x-6' : ''}`} />
              </button>
              <span className="font-medium">{d.nombre}</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <input type="time" value={hhmm(d.horaInicio)} disabled={!d.habil} onChange={(e) => update(d.id, { horaInicio: e.target.value })}
                className="rounded-md border-2 border-[#f1d7ba]/40 focus:border-barber-gold bg-transparent px-2 py-1 outline-none disabled:opacity-40 transition-colors" />
              <span className="text-gray-500">a</span>
              <input type="time" value={hhmm(d.horaFin)} disabled={!d.habil} onChange={(e) => update(d.id, { horaFin: e.target.value })}
                className="rounded-md border-2 border-[#f1d7ba]/40 focus:border-barber-gold bg-transparent px-2 py-1 outline-none disabled:opacity-40 transition-colors" />
            </div>
            <Button variant="ghost" loading={savingId === d.id} onClick={() => guardar(d)}>Guardar</Button>
          </div>
        ))}
      </div>
    </main>
  );
};
