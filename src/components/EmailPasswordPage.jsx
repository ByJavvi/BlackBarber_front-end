import logoBarber from '../assets/BlackBarberIcono.png';
import esquina from '../assets/esquina.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authApi } from '../api';
import { useToast } from '../context/ToastContext';

const Corners = () => (
    <>
        <div className="absolute top-2 left-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="rotate-90" /></div>
        <div className="absolute top-2 right-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="rotate-180" /></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" /></div>
        <div className="absolute bottom-2 right-2 w-12 h-12 pointer-events-none select-none"><img src={esquina} alt="" className="-rotate-90" /></div>
    </>
);

export const EmailPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Correo inválido'); return; }
        setError('');
        try {
            setLoading(true);
            await authApi.enviarEmailRecuperacion({ email });
            setSent(true);
            toast.success('Correo de recuperación enviado');
        } catch (err) {
            toast.error(err.message || 'No fue posible enviar el correo');
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
            <aside className="bg-[#1a1a1a] lg:w-[50%] w-full flex flex-col items-center justify-center gap-2 font-serif text-gray-50">
                <form onSubmit={handleSubmit} className="relative p-14 border border-barber-gold rounded-md animate-fade-in-up">
                    <Corners />
                    <Link to="/login" className="inline-flex items-center gap-1 text-barber-gold-dark hover:text-barber-gold transition group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Regresar
                    </Link>
                    <div className="w-80 flex flex-col gap-3">
                        <div className="flex items-center justify-center my-3 w-full">
                            <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-barber-gold-dark"></div>
                            <span className="px-4 text-xs font-serif tracking-widest text-barber-gold text-center">¿Olvidaste tu contraseña?</span>
                            <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-barber-gold-dark"></div>
                        </div>

                        {sent ? (
                            <div className="text-center animate-scale-in py-4">
                                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/15 border border-green-500/50 flex items-center justify-center mb-3">
                                    <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="text-gray-300">Revisa tu bandeja de entrada en <span className="text-barber-gold">{email}</span> y sigue las instrucciones.</p>
                            </div>
                        ) : (
                            <>
                                <div className="text-center text-gray-300">Ingresa tu correo electrónico para recuperar tu contraseña</div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-barber-gold">Correo</label>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className={`rounded-md border-2 bg-transparent px-2 py-1 outline-none transition-colors ${error ? 'border-red-500/70' : 'border-[#f1d7ba] focus:border-barber-gold'}`} />
                                    {error && <span className="text-xs text-red-400 animate-fade-in">{error}</span>}
                                </div>
                                <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 bg-barber-gold-dark w-full py-2 rounded-md mt-2 hover:bg-barber-gold hover:shadow-[0_0_14px_rgba(228,161,78,0.45)] active:scale-95 duration-200 text-xl disabled:opacity-60">
                                    {loading && (<svg className="w-5 h-5 animate-spin-slow" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>)}
                                    Enviar email
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </aside>
        </div>
    );
};
