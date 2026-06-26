import React, { useState } from 'react';

export const UsuariosPage = () => {
    return (
        <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh]  mt-2 mx-2 rounded-md">
            <div className="mt-4 w-full">
                <div className="flex justify-end w-full py-2">
                    <button className="p-3 bg-barber-gold-dark hover:bg-barber-gold rounded-lg font-medium transition duration-200 text-gray-50 hover:text-gray-200">Nuevo usuario</button>
                </div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <div className={`w-full transition-all duration-200`}>
                            <table className="border border-gray-300 w-full">
                                <thead className="border-b border-gray-300">
                                    <tr>
                                        <th className="text-start px-2 border-r border-gray-300 w-[30%]">Nombre</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Correo</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Hora creación</th>
                                        <th className="text-center px-2 border-r border-gray-300 w-[10%]">Estatus</th>
                                        <th className="text-center px-2 w-[10%]">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    <tr className="hover:bg-gray-800 transition duration-200">
                                        <td className="px-2 border-r border-gray-300">Yahir</td>
                                        <td className="text-center px-2 border-r border-gray-300">yahiradmin@gmail.com</td>
                                        <td className="text-center px-2 border-r border-gray-300">30/11/2026:13:50:45</td>
                                        <td className="px-2 flex justify-center border-r border-gray-300">
                                            <div className="px-3 py-1 bg-green-100 text-green-700 border border-green-700 rounded-full my-1 font-medium text-center">
                                                Activo
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                <button className="h-8 w-8 bg-amber-300 rounded-lg">
                                                    As
                                                </button>
                                                <button className="h-8 w-8 bg-red-300 rounded-lg">
                                                    Bl
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