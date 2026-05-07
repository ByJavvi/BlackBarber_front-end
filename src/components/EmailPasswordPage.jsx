import { Outlet } from 'react-router-dom';
import logoBarber from '../assets/BlackBarberIcono.png'
import esquina from '../assets/esquina.svg'
import { Link } from 'react-router-dom';

export const EmailPasswordPage = () => {
    return (
        <div className='flex justify-center align-middle h-screen w-full'>
            <aside className='lg:block hidden w-[50%] relative'>
                <div style={{ backgroundImage: `url(${logoBarber})` }} className="w-full h-screen bg-cover bg-center" />
                {/* <img src={logoBarber} alt="" className='w-full h-screen' /> */}
                <div className='absolute right-0 top-0 w-[40%] h-screen bg-gradient-to-r from-transparent to-[#1a1a1a] ' />
            </aside>
            <aside className='bg-[#1a1a1a] lg:w-[50%] w-full flex flex-col items-center justify-center gap-2 font-serif text-gray-50'>
                <div className='relative p-14 border border-barber-gold rounded-md'>
                    <div className="absolute top-2 left-2 w-12 h-12 b pointer-events-none select-none">
                        <img src={esquina} alt="" className='rotate-90' />
                    </div>
                    <div className="absolute top-2 right-2 w-12 h-12 b pointer-events-none select-none">
                        <img src={esquina} alt="" className='rotate-180' />
                    </div>
                    <div className="absolute bottom-2 left-2 w-12 h-12 b pointer-events-none select-none">
                        <img src={esquina} alt="" className='' />
                    </div>
                    <div className="absolute bottom-2 right-2 w-12 h-12 b pointer-events-none select-none">
                        <img src={esquina} alt="" className='-rotate-90' />
                    </div>
                    <div>
                        <Link to="/login">
                        Regresar
                        </Link>
                    </div>
                    <div className='w-80 flex flex-col gap-3'>
                        <div className="flex items-center justify-center my-4 w-full">
                        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-barber-gold-dark"></div>
                        <span className="px-4 text-xs font-serif tracking-widest text-barber-gold">¿Olvidaste tu contraseña?</span>
                        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-barber-gold-dark"></div>
                    </div>
                    <div className='text-center'>
                        Ingresa tu correo electrónico para recuperar tu contraseña
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='text-barber-gold'>Correo</label>
                        <input type="text" id='email' className='rounded-md border-[#f1d7ba] border-2 bg-transparent px-2 py-1 outline-none' />
                    </div>
                    </div>
                    
                    <div className='mt-4'>
                        <button className='text-center bg-barber-gold-dark w-full py-2 rounded-md my-2 hover:bg-barber-gold duration-200 text-xl'>
                            Enviar email
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    )
}