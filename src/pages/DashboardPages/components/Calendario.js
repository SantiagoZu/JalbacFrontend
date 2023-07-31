import React, { useState, useEffect } from 'react'
import moment from 'moment';

function Calendario({ fechaInicio, fechaFin, setFechaInicio, setFechaFin }) {
    const [fechaI, setFechaI] = useState(fechaInicio || '');
    const [fechaF, setFechaF] = useState(fechaFin || '');
    const fechaActual = moment().format('YYYY-MM-DD');

    const handleFechaInicioChange = (event) => {
        setFechaI(event.target.value);
    }

    const handleFechaFinChange = (event) => {
        setFechaF(event.target.value);
    }

    useEffect(() => {
        setFechaInicio(fechaI);
        setFechaFin(fechaF);
    }, [fechaI, fechaF, setFechaInicio, setFechaFin]);

    return (
        <>
            <div className="flex justify-left">
                <div>
                    <label className='font-medium dark:text-gray-300'>Fecha Inicio</label>
                    <input className='block w-full pr-4 mt-1 mb-1 text-sm text-red dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input' type="date" id={fechaInicio} value={fechaI} onChange={handleFechaInicioChange} />
                </div>
                <div>
                    <label className='font-medium dark:text-gray-300'>Fecha Fin</label>
                    <input className='block w-full pr-4 ml-4 mt-1 mb-1 text-sm text-red dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input' type="date" id={fechaFin} value={fechaF} onChange={handleFechaFinChange} />
                </div>
            </div>
        </>
    )
}
export default Calendario;