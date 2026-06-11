export const BarberosPage = () => {
    return (
        <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh]">
            <div className="border border-gray-500 hover:border-gray-400 rounded-lg shadow-md p-6 transition duration-200">
                <p className="text-xl font-medium mb-4">
                    Administra tus barberos
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
            <div className="mt-4 w-full">
                <div className="flex justify-end w-full py-2">
                    <button className="p-3 bg-barber-gold-dark hover:bg-barber-gold rounded-lg font-medium transition duration-200 text-gray-50 hover:text-gray-200">Nuevo barbero</button>
                </div>
                <div className="w-full">
                    <table className="border border-gray-300 w-full">
                        <thead className="border-b border-gray-300">
                            <tr>
                                <th className="text-start px-2 border-r border-gray-300 w-[30%]">Nombre</th>
                                <th className="text-start px-2 border-r border-gray-300 w-[30%]">Usuario</th>
                                <th className="text-start px-2 border-r border-gray-300 w-[20%]">Estatus</th>
                                <th className="text-center px-2 w-[20%]">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            <tr className="hover:bg-gray-800 transition duration-200">
                                <td className="px-2 border-r border-gray-300">Yahir</td>
                                <td className="px-2 border-r border-gray-300">Yahir</td>
                                <td className="px-2 flex justify-center border-r border-gray-300">
                                    <div className="px-3 py-1 bg-green-100 text-green-700 border border-green-700 rounded-full my-1 font-medium text-center">
                                        Activo
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button className="h-8 w-8 bg-green-300 rounded-lg">
                                            As
                                        </button>
                                        <button className="h-8 w-8 bg-red-300 rounded-lg">
                                            El
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}