import React, { useEffect, useMemo, useState } from 'react';
import { citasApi, barberosApi, usuariosApi } from '../api';
import { serviciosApi } from '../services/servicioService';
import { useAuth, ROLES } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../elements/Modal';
import { Button } from '../elements/Button';
import { Spinner, EmptyState } from '../elements/Spinner';
import { Badge } from '../elements/Badge';
import { Input, Select } from '../elements/FormField';
import { fmtDateTime, fmtMoney } from '../utils/file';

const ESTADOS = { 1: { t: 'Pendiente', tone: 'gold' }, 2: { t: 'Confirmada', tone: 'blue' }, 3: { t: 'Completada', tone: 'green' }, 4: { t: 'Cancelada', tone: 'red' } };

const CitaModal = ({ open, onClose, onSaved }) => {
  const toast = useToast();
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ idCliente: '', idBarbero: '', idServicio: '', fecha: '', hora: '' });
  const [checking, setChecking] = useState(false);
  const [disp, setDisp] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm({ idCliente: '', idBarbero: '', idServicio: '', fecha: '', hora: '' });
    setDisp(null);
    serviciosApi.listar().then((s) => setServicios(s.filter((x) => x.estatus === 1)));
    barberosApi.listar().then((b) => setBarberos(b.filter((x) => x.estatus === 1)));
    usuariosApi.listar().then((u) => setClientes(u.filter((x) => x.idRol === ROLES.CLIENTE)));
  }, [open]);

  const set = (k) => (e) => { setForm({ ...form, [k]: e.target.value }); setDisp(null); };
  const servicio = servicios.find((s) => s.id === Number(form.idServicio));

  const buildFechas = () => {
    const inicio = new Date(`${form.fecha}T${form.hora}`);
    const termino = new Date(inicio.getTime() + (servicio?.horas || 1) * 3600000);
    return { inicio, termino };
  };

  const verificar = async () => {
    if (!form.idBarbero || !form.fecha || !form.hora || !servicio) { toast.error('Completa barbero, servicio, fecha y hora'); return; }
    const { inicio, termino } = buildFechas();
    try {
      setChecking(true);
      const res = await citasApi.disponibilidad({ idBarbero: Number(form.idBarbero), horaInicio: inicio.toISOString(), horaFin: termino.toISOString() });
      setDisp(res?.estatus !== false);
      res?.estatus !== false ? toast.success('Horario disponible') : toast.error(res.descripcion || 'Horario ocupado');
    } catch (e) { toast.error(e.message); } finally { setChecking(false); }
  };

  const submit = async () => {
    if (!form.idCliente || !form.idBarbero || !servicio || !form.fecha || !form.hora) { toast.error('Faltan datos'); return; }
    const { inicio, termino } = buildFechas();
    const dto = {
      fechaInicio: inicio.toISOString(), fechaTermino: termino.toISOString(),
      idCliente: Number(form.idCliente), estatus: 1,
      servicios: [{ idBarbero: Number(form.idBarbero), idServicio: servicio.id, precio: servicio.precioBase, detalles: [] }],
    };
    try {
      setLoading(true);
      const res = await citasApi.crear(dto);
      toast.success(res.descripcion || 'Cita agendada'); onSaved(); onClose();
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Agendar cita" size="lg"
      footer={<>
        <Button variant="ghost" loading={checking} onClick={verificar}>Verificar disponibilidad</Button>
        <Button variant="subtle" onClick={onClose}>Cancelar</Button>
        <Button loading={loading} onClick={submit}>Agendar</Button>
      </>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select label="Cliente" value={form.idCliente} onChange={set('idCliente')}>
          <option value="" className="bg-black-barber">— Selecciona —</option>
          {clientes.map((c) => <option key={c.id} value={c.id} className="bg-black-barber">{c.username}</option>)}
        </Select>
        <Select label="Barbero" value={form.idBarbero} onChange={set('idBarbero')}>
          <option value="" className="bg-black-barber">— Selecciona —</option>
          {barberos.map((b) => <option key={b.id} value={b.id} className="bg-black-barber">{b.nombre}</option>)}
        </Select>
        <Select label="Servicio" value={form.idServicio} onChange={set('idServicio')} className="md:col-span-2">
          <option value="" className="bg-black-barber">— Selecciona —</option>
          {servicios.map((s) => <option key={s.id} value={s.id} className="bg-black-barber">{s.nombre} · {fmtMoney(s.precioBase)} · {s.horas}h</option>)}
        </Select>
        <Input label="Fecha" type="date" value={form.fecha} onChange={set('fecha')} />
        <Input label="Hora" type="time" value={form.hora} onChange={set('hora')} />
      </div>
      {disp !== null && (
        <div className={`mt-4 rounded-lg px-4 py-2 text-sm animate-scale-in border ${disp ? 'border-green-500/50 text-green-300 bg-green-500/10' : 'border-red-500/50 text-red-300 bg-red-500/10'}`}>
          {disp ? '✓ El barbero está disponible en ese horario.' : '✕ El horario no está disponible.'}
        </div>
      )}
    </Modal>
  );
};

export const CitasPage = () => {
  const { user } = useAuth();
  const isCliente = user?.idRol === ROLES.CLIENTE;
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState(0);
  const [modal, setModal] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = isCliente
      ? await citasApi.detalladasPorUsuario(user?.id || 4)
      : await citasApi.detalladasPorBarbero(user?.idBarbero || 1);
    setCitas(data); setLoading(false);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const visibles = useMemo(() => (filtro ? citas.filter((c) => c.estatus === filtro) : citas), [citas, filtro]);

  return (
    <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-medium">{isCliente ? 'Mis citas' : 'Agenda de citas'}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 bg-zinc-800 rounded-lg p-1">
            {[{ v: 0, t: 'Todas' }, { v: 1, t: 'Pendientes' }, { v: 2, t: 'Confirmadas' }, { v: 3, t: 'Completadas' }].map((f) => (
              <button key={f.v} onClick={() => setFiltro(f.v)} className={`px-3 py-1 rounded-md text-xs transition ${filtro === f.v ? 'bg-barber-gold-dark text-white' : 'text-gray-400 hover:text-white'}`}>{f.t}</button>
            ))}
          </div>
          <Button onClick={() => setModal(true)}>+ Agendar cita</Button>
        </div>
      </div>

      <div className="mt-5">
        {loading ? <Spinner label="Cargando citas..." /> : visibles.length === 0 ? <EmptyState message="No hay citas en esta vista." /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibles.map((c) => (
              <div key={c.id} className="border border-gray-700 hover:border-barber-gold/60 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 animate-fade-in-up">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-lg">{c.nombreCliente}</p>
                    <p className="text-xs text-gray-500">{fmtDateTime(c.fechaInicio)}</p>
                  </div>
                  <Badge tone={ESTADOS[c.estatus]?.tone || 'gray'}>{c.estatusDescripcion || ESTADOS[c.estatus]?.t}</Badge>
                </div>
                <div className="mt-3 space-y-1 text-sm">
                  {c.servicios?.map((s) => (
                    <div key={s.id} className="flex justify-between text-gray-300">
                      <span>{s.nombreServicio} <span className="text-gray-600">· {s.nombreBarbero}</span></span>
                      <span className="text-gray-400">{fmtMoney(s.precio)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-barber-gold font-semibold">{fmtMoney(c.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CitaModal open={modal} onClose={() => setModal(false)} onSaved={load} />
    </main>
  );
};
