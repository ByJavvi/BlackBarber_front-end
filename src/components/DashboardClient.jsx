import rightArrow from '../assets/arrow_right.svg';
import {ProgressBar} from '../elements/ProgressBar';

export const DashboardClient = () => {
    return(
        <main className="bg-zinc-900 text-white font-sans p-6 min-h-[91dvh]">
            <div className="border border-gray-500 hover:border-gray-400 rounded-lg shadow-md p-6 transition duration-200">
                <p className="text-6xl font-medium mb-4">
                    Buen día, Yahir
                </p>
                yahirvazquez@gmail.com
            </div>
            <div className="flex justify-between w-full overflow-x-auto">
            <div className="border-gray-500 hover:border-gray-400 border rounded-lg hover:shadow shadow-gray-50 p-6 hover:p-8 mt-6 transition-all duration-200 w-[24%]">
                <div className='px-6'>
                    <div className="flex justify-between items-center w-full gap-4">
                    <div className='font-normal text-xl'>
                        PROMOCIONES ACTIVAS
                    </div>
                    <div>
                        <img src={rightArrow} alt="Right Arrow" className='w-4 h-4'/>
                    </div>
                </div>
                <div className='text-4xl font-bold text-gray-200'>
                    2
                </div>
                <div>
                    Disponibles ahora
                </div>
                </div>
                <div className='w-full mt-6'>
                    {ProgressBar(60)}
                </div>
            </div>
            <div className="border-gray-500 hover:border-gray-400 border rounded-lg hover:shadow shadow-gray-50 p-6 hover:p-8 mt-6 transition-all duration-200 w-[24%]">
                <div className='px-6'>
                    <div className="flex justify-between items-center w-full gap-4">
                    <div className='font-normal text-xl'>
                        POR VENCER
                    </div>
                    <div>
                        <img src={rightArrow} alt="Right Arrow" className='w-4 h-4'/>
                    </div>
                </div>
                <div className='text-4xl font-bold text-gray-200'>
                    2
                </div>
                <div>
                    Terminan en 3 días
                </div>
                </div>
                <div className='w-full mt-6'>
                    {ProgressBar(60)}
                </div>
            </div>
            <div className="border-gray-500 hover:border-gray-400 border rounded-lg hover:shadow shadow-gray-50 p-6 hover:p-8 mt-6 transition-all duration-200 w-[24%]">
                <div className='px-6'>
                    <div className="flex justify-between items-center w-full gap-4">
                    <div className='font-normal text-xl'>
                        NUEVAS
                    </div>
                    <div>
                        <img src={rightArrow} alt="Right Arrow" className='w-4 h-4'/>
                    </div>
                </div>
                <div className='text-4xl font-bold text-gray-200'>
                    2
                </div>
                <div>
                    Publicadas recientemente
                </div>
                </div>
                <div className='w-full mt-6'>
                    {ProgressBar(60)}
                </div>
            </div>
            <div className="border-gray-500 hover:border-gray-400 border rounded-lg hover:shadow shadow-gray-50 p-6 hover:p-8 mt-6 transition-all duration-200 w-[24%]">
                <div className='px-6'>
                    <div className="flex justify-between items-center w-full gap-4">
                    <div className='font-normal text-xl'>
                        TERMINAN HOY
                    </div>
                    <div>
                        <img src={rightArrow} alt="Right Arrow" className='w-4 h-4'/>
                    </div>
                </div>
                <div className='text-4xl font-bold text-gray-200'>
                    2
                </div>
                <div>
                    Aprovechalas hoy
                </div>
                </div>
                <div className='w-full mt-6'>
                    {ProgressBar(60)}
                </div>
            </div>
            </div>
            <div className='flex justify-between w-full mt-6'>
                <div className='border border-gray-500 hover:border-gray-400 rounded-lg shadow-md p-6 transition duration-200 w-[64%]'>
                    <div className='font-normal'>
                    Historial de citas
                    </div>
                    <div>
                        <table>
                            <thead>
                                <td>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </td>
                            </thead>
                        </table>
                    </div>
                </div>
                <div className='border border-gray-500 hover:border-gray-400 rounded-lg shadow-md p-6 transition duration-200 w-[34%]'>
                    <div className='font-normal'>
                    Tus preferencias
                    </div>
                </div>
            </div>
        </main>
    );
}