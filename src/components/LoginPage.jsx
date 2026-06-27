import logoBarber from '../assets/BlackBarberIcono.png';
import esquina from '../assets/esquina.svg';
import { Link, useNavigate } from 'react-router-dom';
import visibility from '../assets/visibility.svg';
import visibilityOff from '../assets/visibility_off.svg';
import { useState } from 'react';
import { authApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Corners = () => (
    <>
        <div className="absolute top-2 left-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="rotate-90" /></div>
        <div className="absolute top-2 right-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="rotate-180" /></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" /></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="-rotate-90" /></div>
    </>
);

export const LoginPage = () => {
    const [passwordHidden, setPasswordHidden] = useState(true);
    const [form, setForm] = useState({ email: '', contrasena: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, homeFor } = useAuth();
    const toast = useToast();

    const validate = () => {
        const e = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Correo inválido';
        if (!form.contrasena) e.contrasena = 'Ingresa tu contraseña';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            setLoading(true);
            const res = await authApi.login(form);
            if (!res?.estatus) {
                toast.error('Credenciales incorrectas');
                return;
            }
            const usuario = res.usuario || { correo: form.email, idRol: 3, username: form.email.split('@')[0] };
            login(usuario);
            toast.success(`Bienvenido, ${usuario.username || ''}`);
            navigate(homeFor(usuario.idRol));
        } catch (err) {
            toast.error(err.message || 'No fue posible iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center align-middle h-screen w-full">
            <aside className="lg:block hidden w-[50%] relative">
                <div style={{ backgroundImage: `url(${logoBarber})` }} className="w-full h-screen bg-cover bg-center" />
                <div className="absolute right-0 top-0 w-[40%] h-screen bg-gradient-to-r from-transparent to-[#1a1a1a]" />
            </aside>
            <aside className="bg-black-barber lg:w-[50%] w-full flex flex-col items-center justify-center gap-2 font-serif text-gray-50">
                <form onSubmit={handleSubmit} className="relative p-14 border border-barber-gold rounded-md animate-fade-in-up w-[30rem]">
                    <Corners />
                    <div className="flex items-center justify-center my-4 w-full">
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-barber-gold-dark"></div>
                        <span className="px-4 text-xs font-serif tracking-widest text-barber-gold">Bienvenido a</span>
                        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-barber-gold-dark"></div>
                    </div>
                    <div className="font-semibold text-5xl text-center">BlackBarber</div>
                    <div className="text-center mt-4 mb-4 text-gray-300">Por favor, inicia sesión</div>

                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="email" className="text-barber-gold">Correo</label>
                        <input
                            type="text" id="email" autoComplete="username"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className={`rounded-md border-2 bg-transparent px-2 py-1 outline-none transition-colors duration-200 ${errors.email ? 'border-red-500/70' : 'border-[#f1d7ba] focus:border-barber-gold'}`}
                        />
                        {errors.email && <span className="text-xs text-red-400 animate-fade-in">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="pass" className="text-barber-gold">Contraseña</label>
                        <div className={`flex rounded-md border-2 px-2 py-1 justify-between items-center gap-2 transition-colors duration-200 ${errors.contrasena ? 'border-red-500/70' : 'border-[#f1d7ba] focus-within:border-barber-gold'}`}>
                            <input
                                type={passwordHidden ? 'password' : 'text'} id="pass" autoComplete="current-password"
                                value={form.contrasena}
                                onChange={(e) => setForm({ ...form, contrasena: e.target.value })}
                                className="bg-transparent outline-none w-full"
                            />
                            <img
                                src={passwordHidden ? visibility : visibilityOff} alt="Mostrar/Ocultar"
                                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => setPasswordHidden(!passwordHidden)}
                            />
                        </div>
                        {errors.contrasena && <span className="text-xs text-red-400 animate-fade-in">{errors.contrasena}</span>}
                    </div>

                    <div className="flex justify-between mt-3 text-sm">
                        <Link className="text-barber-gold-dark hover:text-barber-gold duration-200" to="/email-recuperacion">¿Olvidaste tu contraseña?</Link>
                        <Link className="text-barber-gold-dark hover:text-barber-gold duration-200" to="/register">Regístrate</Link>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="flex items-center justify-center gap-2 bg-barber-gold-dark w-full py-2 rounded-md my-4 hover:bg-barber-gold hover:shadow-[0_0_14px_rgba(228,161,78,0.45)] active:scale-95 duration-200 text-xl disabled:opacity-60"
                    >
                        {loading && (
                            <svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        )}
                        Iniciar sesión
                    </button>

                    <div className="text-center text-xs text-gray-400">www.blackbarber.com | @BlackBarber</div>
                </form>
            </aside>
        </div>
    );
};
