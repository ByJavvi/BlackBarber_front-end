import React, { useEffect, useMemo, useState } from 'react';
import { consultasApi } from '../api';
import { useToast } from '../context/ToastContext';
import { Modal } from '../elements/Modal';
import { Button } from '../elements/Button';
import { Spinner, EmptyState } from '../elements/Spinner';
import { Badge } from '../elements/Badge';

export const ConsultasPage = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas');
  const [detalle, setDetalle] = useState(null);
  const toast = useToast();

  const load = async () => { setLoading(true); setConsultas(await consultasApi.listar()); setLoading(false); };
  useEffect(() => { load(); }, []);

  const pendientes = useMemo(() => consultas.filter((c) => c.estatus === 0).length, [consultas]);
  const visibles = filtro === 'todas' ? consultas : consultas.filter((c) => (filtro === 'pendientes' ? c.estatus === 0 : c.estatus === 1));

  const marcar = async (c, estatus) => {
    await consultasApi.editar({ ...c, estatus });
    toast.success(estatus === 1 ? 'Marcada como atendida' : 'Reabierta');
    setDetalle(null); load();
  };

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-medium">Buzón de consultas</h2>
          <p className="text-sm text-gray-400">{pendientes} pendiente(s) por atender</p>
        </div>
        <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
          {[{ v: 'todas', t: 'Todas' }, { v: 'pendientes', t: 'Pendientes' }, { v: 'atendidas', t: 'Atendidas' }].map((f) => (
            <button key={f.v} onClick={() => setFiltro(f.v)} className={`px-3 py-1 rounded-md text-xs transition ${filtro === f.v ? 'bg-barber-gold-dark text-white' : 'text-gray-400 hover:text-white'}`}>{f.t}</button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {loading ? <Spinner label="Cargando consultas..." /> : visibles.length === 0 ? <EmptyState message="No hay consultas en esta vista." /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibles.map((c) => (
              <button key={c.id} onClick={() => setDetalle(c)} className="text-left border border-gray-700 hover:border-barber-gold/60 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 animate-fade-in-up">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{c.nombre}</p>
                    <p className="text-xs text-gray-500">{c.correo}</p>
                  </div>
                  <Badge tone={c.estatus === 0 ? 'gold' : 'green'}>{c.estatus === 0 ? 'Pendiente' : 'Atendida'}</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-3 line-clamp-2">{c.mensaje}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal open={!!detalle} onClose={() => setDetalle(null)} title="Consulta"
        footer={detalle && (detalle.estatus === 0
          ? <Button onClick={() => marcar(detalle, 1)}>Marcar atendida</Button>
          : <Button variant="subtle" onClick={() => marcar(detalle, 0)}>Reabrir</Button>)}>
        {detalle && (
          <div className="space-y-3">
            <div className="flex justify-between"><span className="text-gray-400">De</span><span>{detalle.nombre}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Correo</span><a className="text-barber-gold hover:underline" href={`mailto:${detalle.correo}`}>{detalle.correo}</a></div>
            <div className="pt-2 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Mensaje</p>
              <p className="text-gray-200 leading-relaxed">{detalle.mensaje}</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
};
