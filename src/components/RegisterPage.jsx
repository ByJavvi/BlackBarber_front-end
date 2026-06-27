import logoBarber from '../assets/BlackBarberIcono.png';
import esquina from '../assets/esquina.svg';
import visibility from '../assets/visibility.svg';
import visibilityOff from '../assets/visibility_off.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usuariosApi } from '../api';
import { useToast } from '../context/ToastContext';

const Corners = () => (
    <>
        <div className="absolute top-2 left-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="rotate-90" /></div>
        <div className="absolute top-2 right-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="rotate-180" /></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" /></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="-rotate-90" /></div>
    </>
);

export const RegisterPage = () => {
    const [form, setForm] = useState({ username: '', correo: '', contrasena: '', confirmar: '' });
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const strength = (() => {
        const p = form.contrasena;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s; // 0-4
    })();

    const validate = () => {
        const e = {};
        if (form.username.trim().length < 3) e.username = 'Mínimo 3 caracteres';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) e.correo = 'Correo inválido';
        if (form.contrasena.length < 8) e.contrasena = 'Mínimo 8 caracteres';
        if (form.confirmar !== form.contrasena) e.confirmar = 'Las contraseñas no coinciden';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setLoading(true);
            const res = await usuariosApi.crear({ username: form.username, correo: form.correo, contrasena: form.contrasena });
            if (res?.estatus === false) { toast.error(res.descripcion || 'No se pudo registrar'); return; }
            toast.success('Cuenta creada. ¡Ya puedes iniciar sesión!');
            navigate('/login');
        } catch (err) {
            toast.error(err.message || 'Error al registrar');
        } finally {
            setLoading(false);
        }
    };

    const strengthColors = ['bg-zinc-700', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const inputCls = (err) => `rounded-md border-2 bg-transparent px-2 py-1 outline-none transition-colors duration-200 ${err ? 'border-red-500/70' : 'border-[#f1d7ba] focus:border-barber-gold'}`;

    return (
        <div className="flex justify-center align-middle h-screen w-full">
            <aside className="lg:block hidden w-[50%] relative">
                <div style={{ backgroundImage: `url(${logoBarber})` }} className="w-full h-screen bg-cover bg-center" />
                <div className="absolute right-0 top-0 w-[40%] h-screen bg-gradient-to-r from-transparent to-[#1a1a1a]" />
            </aside>
            <aside className="bg-[#1a1a1a] lg:w-[50%] w-full flex flex-col items-center justify-center gap-2 font-serif text-gray-50">
                <form onSubmit={handleSubmit} className="relative p-14 border border-barber-gold rounded-md animate-fade-in-up">
                    <Corners />
                    <Link to="/login" className="inline-flex items-center gap-1 text-barber-gold-dark hover:text-barber-gold transition group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Regresar
                    </Link>
                    <div className="w-80 flex flex-col gap-3">
                        <div className="flex items-center justify-center my-2 w-full">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-barber-gold-dark"></div>
                            <span className="px-4 text-xs font-serif tracking-widest text-barber-gold">Regístrate</span>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-barber-gold-dark"></div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-barber-gold">Username</label>
                            <input type="text" value={form.username} onChange={set('username')} className={inputCls(errors.username)} />
                            {errors.username && <span className="text-xs text-red-400 animate-fade-in">{errors.username}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-barber-gold">Correo</label>
                            <input type="text" value={form.correo} onChange={set('correo')} className={inputCls(errors.correo)} />
                            {errors.correo && <span className="text-xs text-red-400 animate-fade-in">{errors.correo}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-barber-gold">Contraseña</label>
                            <div className={`flex rounded-md border-2 px-2 py-1 items-center gap-2 transition-colors ${errors.contrasena ? 'border-red-500/70' : 'border-[#f1d7ba] focus-within:border-barber-gold'}`}>
                                <input type={show ? 'text' : 'password'} value={form.contrasena} onChange={set('contrasena')} className="bg-transparent outline-none w-full" />
                                <img src={show ? visibilityOff : visibility} alt="" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => setShow(!show)} />
                            </div>
                            <div className="flex gap-1 mt-1">
                                {[0, 1, 2, 3].map((i) => (
                                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i < strength ? strengthColors[strength] : 'bg-zinc-700'}`} />
                                ))}
                            </div>
                            {errors.contrasena && <span className="text-xs text-red-400 animate-fade-in">{errors.contrasena}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-barber-gold">Repite tu contraseña</label>
                            <input type={show ? 'text' : 'password'} value={form.confirmar} onChange={set('confirmar')} className={inputCls(errors.confirmar)} />
                            {errors.confirmar && <span className="text-xs text-red-400 animate-fade-in">{errors.confirmar}</span>}
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 bg-barber-gold-dark w-full py-2 rounded-md mt-5 hover:bg-barber-gold hover:shadow-[0_0_14px_rgba(228,161,78,0.45)] active:scale-95 duration-200 text-xl disabled:opacity-60">
                        {loading && (<svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>)}
                        Regístrate
                    </button>
                </form>
            </aside>
        </div>
    );
};
