export const ServiciosPage = () => {
    return(
        <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh]">
            <div className="border border-gray-500 hover:border-gray-400 rounded-lg shadow-md p-6 transition duration-200">
                <p className="text-xl font-medium mb-4">
                    Administra tus servicios
                </p>
                {/* Barra de progreso */}
                <div className="flex flex-col w-full bg-gradient-to-t from-slate-400 to-slate-300 rounded-full h-6 relative">
                    <div className="flex items-center w-[80%] bg-gradient-to-t from-barber-gold-dark to-barber-gold h-6 rounded-full"></div>
                </div>
                <div className="flex gap-4 py-5">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-barber-gold-dark rounded-full"></div>
                        Activos
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-slate-400 rounded-full"></div>
                        Inactivos
                    </div>
                </div>
            </div>
        
        </main>
    )
}