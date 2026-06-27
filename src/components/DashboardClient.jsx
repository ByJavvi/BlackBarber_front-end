import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { promocionesApi, citasApi, preferenciasApi, perfumesApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { KpiCard } from '../elements/KpiCard';
import { Spinner, EmptyState } from '../elements/Spinner';
import { Badge } from '../elements/Badge';
import { fmtDateTime, fmtMoney } from '../utils/file';

const ESTADOS = { 1: { t: 'Pendiente', tone: 'gold' }, 2: { t: 'Confirmada', tone: 'blue' }, 3: { t: 'Completada', tone: 'green' }, 4: { t: 'Cancelada', tone: 'red' } };
const diasRestantes = (fin) => Math.max(0, Math.ceil((new Date(fin) - new Date()) / 86400000));

export const DashboardClient = () => {
  const { user } = useAuth();
  const idUsuario = user?.id || 4;
  const [loading, setLoading] = useState(true);
  const [promos, setPromos] = useState([]);
  const [citas, setCitas] = useState([]);
  const [prefs, setPrefs] = useState(null);
  const [perfumes, setPerfumes] = useState([]);

  useEffect(() => {
    Promise.all([
      promocionesApi.vigentes(),
      citasApi.detalladasPorUsuario(idUsuario),
      preferenciasApi.porUsuario(idUsuario),
      perfumesApi.listar(),
    ]).then(([p, c, pr, pf]) => { setPromos(p); setCitas(c); setPrefs(pr); setPerfumes(pf); setLoading(false); });
  }, [idUsuario]);

  if (loading) return <main className="bg-zinc-900 min-h-[91dvh] m-2 rounded-md"><Spinner label="Cargando tu información..." /></main>;

  const porVencer = promos.filter((p) => diasRestantes(p.fechaFin) <= 7).length;
  const perfumeNombre = perfumes.find((x) => x.id === prefs?.idPerfume)?.nombre || '—';

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <header className="border border-gray-700 rounded-xl p-6 bg-gradient-to-r from-zinc-900 to-black-barber">
        <p className="text-4xl md:text-5xl font-medium">Buen día, {user?.username || 'cliente'}</p>
        <p className="text-gray-400 mt-1">{user?.correo}</p>
      </header>

      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <KpiCard title="Promos activas" value={promos.length} hint="Disponibles ahora" delay={0} progress={Math.min(100, promos.length * 25)} />
        <KpiCard title="Por vencer" value={porVencer} hint="Terminan en ≤7 días" tone="red" delay={80} />
        <KpiCard title="Tus citas" value={citas.length} hint="En tu historial" tone="blue" delay={160} />
        <KpiCard title="Completadas" value={citas.filter((c) => c.estatus === 3).length} hint="Servicios recibidos" tone="green" delay={240} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 border border-gray-700 rounded-xl p-6 animate-fade-in-up">
          <h3 className="text-lg font-medium mb-4">Historial de citas</h3>
          {citas.length === 0 ? <EmptyState message="Aún no tienes citas registradas." /> : (
            <div className="space-y-3">
              {citas.map((c) => (
                <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-gray-700/70 hover:border-barber-gold/50 rounded-lg p-4 transition-all hover:translate-x-1 animate-fade-in">
                  <div>
                    <p className="text-sm text-gray-300">{c.servicios?.map((s) => s.nombreServicio).join(', ')}</p>
                    <p className="text-xs text-gray-500">{c.servicios?.[0]?.nombreBarbero}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{fmtDateTime(c.fechaInicio)}</span>
                    <span className="text-barber-gold">{fmtMoney(c.total)}</span>
                    <Badge tone={ESTADOS[c.estatus]?.tone || 'gray'}>{c.estatusDescripcion || ESTADOS[c.estatus]?.t}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border border-gray-700 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Tus preferencias</h3>
            <Link to="/prefs-cliente" className="text-xs text-barber-gold-dark hover:text-barber-gold transition">Editar →</Link>
          </div>
          {prefs ? (
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-dashed border-gray-700 pb-2"><span className="text-gray-400">N° de navaja</span><span className="text-barber-gold">{prefs.numeroNavaja ?? '—'}</span></li>
              <li className="flex justify-between border-b border-dashed border-gray-700 pb-2"><span className="text-gray-400">Spray anti-irritación</span><span className="text-barber-gold">{prefs.sprayAntiIrritacion ? 'Sí' : 'No'}</span></li>
              <li className="flex justify-between border-b border-dashed border-gray-700 pb-2"><span className="text-gray-400">Perfume favorito</span><span className="text-barber-gold">{perfumeNombre}</span></li>
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500 mb-3">Aún no configuras tus preferencias.</p>
              <Link to="/prefs-cliente" className="text-barber-gold hover:underline">Configurar ahora</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
