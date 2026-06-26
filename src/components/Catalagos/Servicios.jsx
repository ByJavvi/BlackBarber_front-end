import React, { useState } from 'react';

export const ServiciosPage = () => {
    const [isTableAnadidosOpen, setanAnadidosTable] = useState(false);

    const toggleAnadidosTable = () => {
        setanAnadidosTable(!isTableAnadidosOpen);
    };

    return (
        <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh]  mt-2 mx-2 rounded-md">
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
            <div className="mt-4 w-full">
                <div className="flex justify-end w-full py-2">
                    <button className="p-3 bg-barber-gold-dark hover:bg-barber-gold rounded-lg font-medium transition duration-200 text-gray-50 hover:text-gray-200">Nuevo servicio</button>
                </div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <div className={`w-full transition-all duration-200`}>
                            <table className="border border-gray-300 w-full">
                                <thead className="border-b border-gray-300">
                                    <tr>
                                        <th className="text-start px-2 border-r border-gray-300 w-[15%]">Nombre</th>
                                        <th className="text-start px-2 border-r border-gray-300 w-[30%]">Descripción</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Tipo</th>
                                        <th className="text-end px-2 border-r border-gray-300 w-[10%]">Precio</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[5%]">Horas</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Imagen</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Estatus</th>
                                        <th className="text-center px-2 w-[10%]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    <tr className="hover:bg-gray-800 transition duration-200">
                                        <td className="px-2 border-r border-gray-300">Corte clásico</td>
                                        <td className="px-2 border-r border-gray-300">Corte clásico para caballero</td>
                                        <td className="text-center px-2 border-r border-gray-300">Corte</td>
                                        <td className="text-end px-2 border-r border-gray-300">$90.00</td>
                                        <td className="text-center px-2 border-r border-gray-300">1</td>
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
                                                <button className="h-8 w-8 bg-amber-300 rounded-lg" onClick={toggleAnadidosTable}>
                                                    As
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`w-1 rounded-full bg-gray-300 ${isTableAnadidosOpen
                        ? 'block'
                        : 'hidden'
                        }`}></div>
                    <div className={`transition-all duration-200 ${isTableAnadidosOpen
                        ? 'flex'
                        : 'hidden'
                        }`}>
                        <div className="w-full">
                            <div className="w-full">
                                <table className="border border-gray-300 w-full">
                                    <thead className="border-b border-gray-300">
                                        <tr>
                                            <th className="text-start px-2 border-r border-gray-300 w-[15%]">Nombre</th>
                                            <th className="text-start px-2 border-r border-gray-300 w-[30%]">Descripción</th>
                                            <th className="text-end px-2 border-r border-gray-300 w-[10%]">Precio</th>
                                            <th className="text-center px-2 border-r border-gray-300 w-[10%]">Estatus</th>
                                            <th className="text-center px-2 w-[10%]">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-300">
                                        <tr className="hover:bg-gray-800 transition duration-200">
                                            <td className="px-2 border-r border-gray-300">Diseño Barba</td>
                                            <td className="px-2 border-r border-gray-300">Diseño de barba</td>
                                            <td className="text-end px-2 border-r border-gray-300">$20.00</td>
                                            <td className="px-2 border-r border-gray-300">
                                                <div className='flex justify-center items-center'>
                                                    <div className="px-3 py-1 bg-green-100 text-green-700 border border-green-700 rounded-full my-1 font-medium text-center">
                                                        Activo
                                                    </div>
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
                                        <tr className="hover:bg-gray-800 transition duration-200">
                                            <td className="border-r border-gray-300">
                                                <input type="text" id="nombreNuevoAnadido" className='w-full bg-transparent px-2 focus:outline-none' />
                                            </td>
                                            <td className="border-r border-gray-300">
                                                <input type="text" id="descripcionNuevoAnadido" className='w-full bg-transparent px-2 focus:outline-none' />
                                            </td>
                                            <td className="border-r border-gray-300">
                                                <input type="number" name="precioNuevoAnadido" id="precioNuevoAnadido" className='w-full bg-transparent px-2 focus:outline-none text-end' />
                                            </td>
                                            <td className="px-2 border-r border-gray-300 text-center">
                                                -
                                            </td>
                                            <td className='text-center'>
                                                -
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}