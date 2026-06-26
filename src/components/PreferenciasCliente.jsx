export const PreferenciasClientePage = () => {
    return (
        <main className="flex justify-center items-center bg-zinc-900 text-white font-sans p-6 min-h-[91dvh] mt-2 mx-2 rounded-md">
            <div className="border border-gray-300 w-full lg:w-1/2">
                <header className="text-center font-serif text-2xl py-2 mx-2 mb-1 border-b border-gray-300">
                    Preferencias del cliente
                </header>
                <div className="mx-4 border-b border-gray-300 mb-3"></div>
                <div className="flex flex-col p-3">
                    <input type="text" readOnly className="text-center text-xl text-barber-gold-dark bg-transparent outline-none cursor-default" value={'Yahir'}/>
                    <div className="flex justify-between border-b border-dashed border-gray-300 py-2 mx-2">
                        <label>Número de navaja:</label>
                        <input className="border-gray-600 bg-transparent outline-none text-end text-barber-gold-dark" type="number" />
                    </div>
                    <div className="flex justify-between border-b border-dashed border-gray-300 py-2 mx-2">
                        <label>¿Aplicar spray anti irritación?:</label>
                        <input type="checkbox" />
                    </div>
                    <div className="flex justify-between border-b border-dashed border-gray-300 py-2 mx-2">
                        <label>Perfume favorito:</label>
                        <select name="perfume" id="perfume" className="w-40 text-end bg-transparent">
                            <option className="bg-black selection:bg-barber-gold" value="">Red x</option>
                        </select>
                    </div>
                    <div className="w-full flex justify-end p-2">
                        <button className="px-3 py-2 bg-barber-gold-dark hover:bg-barber-gold rounded-lg font-medium transition duration-200 text-gray-50 hover:text-gray-200">Guardar</button>
                    </div>
                </div>
            </div>
        </main>
    )
}