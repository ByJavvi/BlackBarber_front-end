import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../api';
import { KpiCard } from '../elements/KpiCard';
import { Spinner } from '../elements/Spinner';
import { fmtMoney } from '../utils/file';

const ICON = {
  scissors: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121',
  users: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  money: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m0-8c1.11 0 2.08.402 2.599 1M12 16c-1.11 0-2.08-.402-2.599-1',
};

export const DashboardAdmin = () => {
  const [data, setData] = useState(null);

  useEffect(() => { dashboardApi.admin().then(setData); }, []);

  if (!data) return <main className="bg-zinc-900 min-h-[91dvh] m-2 rounded-md"><Spinner label="Cargando panel..." /></main>;

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <header className="border border-gray-700 rounded-xl p-6 mb-6 bg-gradient-to-r from-zinc-900 to-black-barber">
        <h1 className="text-3xl font-semibold">Panel de administración</h1>
        <p className="text-gray-400 mt-1">Resumen operativo de BlackBarber al día de hoy.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard title="Citas del día" value={data.citasDeldia} hint={`${data.porcentajeCitas}% de ocupación`} icon={ICON.calendar} progress={data.porcentajeCitas} delay={0} />
        <KpiCard title="Ingresos del día" value={fmtMoney(data.ingresosDeldia)} hint={`${data.porcentajeXTicket > 0 ? '+' : ''}${data.porcentajeXTicket}% vs. ticket promedio`} icon={ICON.money} tone="green" delay={80} />
        <KpiCard title="Barberos activos" value={`${data.barberosActivos}/${data.barberostotal}`} hint="En operación" icon={ICON.users} tone="blue" delay={160} />
        <KpiCard title="Servicios activos" value={data.serviciosActivos} hint={`${data.extrasServicios} añadidos`} icon={ICON.scissors} delay={240} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="border border-gray-700 rounded-xl p-6 animate-fade-in-up">
          <h3 className="text-lg font-medium mb-4">Ocupación de hoy</h3>
          <div className="space-y-4">
            <Bar label="Citas confirmadas" pct={data.porcentajeCitas} />
            <Bar label="Barberos en turno" pct={Math.round((data.barberosActivos / Math.max(1, data.barberostotal)) * 100)} tone="blue" />
            <Bar label="Catálogo activo" pct={data.serviciosActivos ? 100 : 0} tone="green" />
          </div>
        </div>
        <div className="border border-gray-700 rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          <h3 className="text-lg font-medium mb-4">Resumen rápido</h3>
          <ul className="space-y-3 text-sm">
            <Row k="Ingreso del día" v={fmtMoney(data.ingresosDeldia)} />
            <Row k="Citas agendadas" v={data.citasDeldia} />
            <Row k="Servicios en catálogo" v={data.serviciosActivos} />
            <Row k="Añadidos disponibles" v={data.extrasServicios} />
            <Row k="Total de barberos" v={data.barberostotal} />
          </ul>
        </div>
      </section>
    </main>
  );
};

const Bar = ({ label, pct, tone = 'gold' }) => {
  const colors = { gold: 'from-barber-gold-dark to-barber-gold', blue: 'from-blue-700 to-blue-400', green: 'from-green-700 to-green-400' };
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">{label}</span><span className="text-gray-400">{pct}%</span></div>
      <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${colors[tone]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Row = ({ k, v }) => (
  <li className="flex justify-between border-b border-dashed border-gray-700 pb-2">
    <span className="text-gray-400">{k}</span><span className="text-barber-gold font-medium">{v}</span>
  </li>
);
