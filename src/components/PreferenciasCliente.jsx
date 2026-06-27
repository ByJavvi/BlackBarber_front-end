import React, { useEffect, useState } from 'react';
import { preferenciasApi, perfumesApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../elements/Button';
import { Spinner } from '../elements/Spinner';

export const PreferenciasClientePage = () => {
  const { user } = useAuth();
  const idCliente = user?.id || 4;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [perfumes, setPerfumes] = useState([]);
  const [form, setForm] = useState({ id: 0, numeroNavaja: '', sprayAntiIrritacion: false, idPerfume: '' });
  const toast = useToast();

  useEffect(() => {
    Promise.all([preferenciasApi.porUsuario(idCliente), perfumesApi.listar()]).then(([p, pf]) => {
      setPerfumes(pf.filter((x) => x.disponible));
      if (p) setForm({ id: p.id || 0, numeroNavaja: p.numeroNavaja ?? '', sprayAntiIrritacion: !!p.sprayAntiIrritacion, idPerfume: p.idPerfume ?? '' });
      setLoading(false);
    });
  }, [idCliente]);

  const guardar = async () => {
    try {
      setSaving(true);
      const dto = {
        id: form.id,
        numeroNavaja: form.numeroNavaja === '' ? null : Number(form.numeroNavaja),
        sprayAntiIrritacion: form.sprayAntiIrritacion,
        idPerfume: form.idPerfume === '' ? null : Number(form.idPerfume),
        idCliente,
      };
      const res = await preferenciasApi.crearEditar(dto);
      toast.success(res.descripcion || 'Preferencias guardadas');
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };

  if (loading) return <main className="bg-zinc-900 min-h-[91dvh] m-2 rounded-md"><Spinner label="Cargando preferencias..." /></main>;

  return (
    <main className="flex justify-center items-start bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="border border-barber-gold/40 rounded-xl w-full lg:w-1/2 max-w-xl animate-fade-in-up bg-zinc-900/60">
        <header className="text-center font-serif text-2xl py-4 border-b border-barber-gold/30 text-barber-gold">
          Preferencias del cliente
        </header>
        <div className="flex flex-col p-6 gap-1">
          <p className="text-center text-xl text-gray-200 mb-4">{user?.username || 'Cliente'}</p>

          <div className="flex justify-between items-center border-b border-dashed border-gray-700 py-3">
            <label className="text-gray-300">Número de navaja</label>
            <input type="number" step="0.5" min="0" value={form.numeroNavaja} onChange={(e) => setForm({ ...form, numeroNavaja: e.target.value })}
              className="border-2 border-[#f1d7ba]/40 focus:border-barber-gold bg-transparent outline-none text-end text-barber-gold rounded-md px-2 py-1 w-28 transition-colors" />
          </div>

          <div className="flex justify-between items-center border-b border-dashed border-gray-700 py-3">
            <label className="text-gray-300">¿Aplicar spray anti-irritación?</label>
            <button onClick={() => setForm({ ...form, sprayAntiIrritacion: !form.sprayAntiIrritacion })}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${form.sprayAntiIrritacion ? 'bg-barber-gold' : 'bg-zinc-600'}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${form.sprayAntiIrritacion ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          <div className="flex justify-between items-center border-b border-dashed border-gray-700 py-3">
            <label className="text-gray-300">Perfume favorito</label>
            <select value={form.idPerfume} onChange={(e) => setForm({ ...form, idPerfume: e.target.value })}
              className="w-44 text-end bg-transparent border-2 border-[#f1d7ba]/40 focus:border-barber-gold rounded-md px-2 py-1 outline-none text-barber-gold transition-colors">
              <option value="" className="bg-black-barber">— Ninguno —</option>
              {perfumes.map((p) => <option key={p.id} value={p.id} className="bg-black-barber">{p.nombre}</option>)}
            </select>
          </div>

          <div className="flex justify-end pt-5">
            <Button loading={saving} onClick={guardar}>Guardar preferencias</Button>
          </div>
        </div>
      </div>
    </main>
  );
};
