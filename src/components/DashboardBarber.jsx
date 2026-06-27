import React, { useEffect, useState } from 'react';
import { dashboardApi, citasApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { KpiCard } from '../elements/KpiCard';
import { Spinner, EmptyState } from '../elements/Spinner';
import { Badge } from '../elements/Badge';
import { fmtDateTime, fmtMoney } from '../utils/file';

const ICON = {
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  check: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  play: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
};

const ESTADOS = { 1: { t: 'Pendiente', tone: 'gold' }, 2: { t: 'Confirmada', tone: 'blue' }, 3: { t: 'Completada', tone: 'green' }, 4: { t: 'Cancelada', tone: 'red' } };

export const DashboardBarber = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [citas, setCitas] = useState([]);
  const idBarbero = user?.idBarbero || 1;

  useEffect(() => {
    dashboardApi.barbero(idBarbero).then(setData);
    citasApi.detalladasPorBarbero(idBarbero).then(setCitas);
  }, [idBarbero]);

  if (!data) return <main className="bg-zinc-900 min-h-[91dvh] m-2 rounded-md"><Spinner label="Cargando tu jornada..." /></main>;

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <header className="border border-gray-700 rounded-xl p-6 mb-6 bg-gradient-to-r from-zinc-900 to-black-barber flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Hola, {user?.username || 'Barbero'}</h1>
          <p className="text-gray-400 mt-1">{data.descripcionDisponibilidad}</p>
        </div>
        <Badge tone={data.disponibilidad === 'Disponible' ? 'green' : 'gold'}>{data.disponibilidad}</Badge>
      </header>

      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Citas de hoy" value={data.citasDeldia} icon={ICON.calendar} delay={0} />
        <KpiCard title="En curso" value={data.citasEnCurso} icon={ICON.play} tone="blue" delay={80} />
        <KpiCard title="Por atender" value={data.citasPorAtender} hint={`Próxima: ${data.proximaCita || '—'}`} icon={ICON.clock} delay={160} />
        <KpiCard title="Atendidas" value={data.citasAtendidas} hint={data.calidadRitmo} icon={ICON.check} tone="green" delay={240} />
      </section>

      <section className="border border-gray-700 rounded-xl p-6 mt-6 animate-fade-in-up">
        <h3 className="text-lg font-medium mb-4">Agenda del día</h3>
        {citas.length === 0 ? <EmptyState message="No tienes citas asignadas." /> : (
          <div className="space-y-3">
            {citas.map((c) => (
              <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-gray-700/70 hover:border-barber-gold/50 rounded-lg p-4 transition-all duration-200 hover:translate-x-1 animate-fade-in">
                <div>
                  <p className="font-medium">{c.nombreCliente}</p>
                  <p className="text-sm text-gray-400">{c.servicios?.map((s) => s.nombreServicio).join(', ')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{fmtDateTime(c.fechaInicio)}</span>
                  <span className="text-barber-gold font-medium">{fmtMoney(c.total)}</span>
                  <Badge tone={ESTADOS[c.estatus]?.tone || 'gray'}>{c.estatusDescripcion || ESTADOS[c.estatus]?.t}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
