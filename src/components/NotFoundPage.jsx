import esquina from '../assets/esquina.svg'

export const NotFoundPage = () => {
    return (
        <section className="w-full h-screen bg-[#1a1a1a] relative flex flex-col justify-center items-center font-serif text-gray-50 select-none">
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
            <div className='text-xl'>Ups...</div>
            <div className='text-9xl animate-pulse'>404</div>
            <div className='text-xl mt-8'>Página no encontrada</div>
        </section>
    );
}