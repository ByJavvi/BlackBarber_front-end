export const PerfumesPage = () => {
    return (
        <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md">
            <div className="mt-4 w-full">
                <div className="flex justify-end w-full py-2">
                    <button className="p-3 bg-barber-gold-dark hover:bg-barber-gold rounded-lg font-medium transition duration-200 text-gray-50 hover:text-gray-200">Nuevo perfume</button>
                </div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <div className={`w-full transition-all duration-200`}>
                            <table className="border border-gray-300 w-full">
                                <thead className="border-b border-gray-300">
                                    <tr>
                                        <th className="text-start px-2 border-r border-gray-300 w-[15%]">Nombre</th>
                                        <th className="text-start px-2 border-r border-gray-300 w-[30%]">Descripción</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Imagen</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Disponible</th>
                                        <th className="text-center px-2 w-[10%]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    <tr className="hover:bg-gray-800 transition duration-200">
                                        <td className="px-2 border-r border-gray-300">Red State</td>
                                        <td className="px-2 border-r border-gray-300">Perfume con sensación fresca</td>
                                        <td className="px-2 border-r border-gray-300">
                                            <div className="w-full flex justify-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/16627/16627731.png" alt="" className="h-8" />
                                            </div>
                                        </td>
                                        <td className="px-2 flex justify-center border-r border-gray-300">
                                            <div className="px-3 py-1 bg-green-100 text-green-700 border border-green-700 rounded-full my-1 font-medium text-center">
                                                Activo
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                <button className="h-8 w-8 bg-green-300 rounded-lg">
                                                    Ed
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
                </div>
            </div>
        </main>
    )
}