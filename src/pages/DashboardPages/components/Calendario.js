import React, { useState, useEffect } from 'react'
import { showAlertIncorrect } from '../../../helpers/Alertas';
import moment from 'moment';

function Calendario({ fechaInicio, fechaFin, setFechaInicio, setFechaFin }) {
    const fechaActual = moment().format('YYYY-MM-DD');
    const [fechaI, setFechaI] = useState(fechaInicio);
    const [fechaF, setFechaF] = useState(fechaFin);

    const handleFechaInicioChange = (event) => {
        const nuevaFechaI = event.target.value;
        if (validarFecha(nuevaFechaI, fechaF)) {
            setFechaI(nuevaFechaI);
        } else {
            event.target.value = fechaI;
            showAlertIncorrect('La fecha inicio no puede ser mayor a la fecha fin.', 'error')
        }
    };

    const handleFechaFinChange = (event) => {
        const nuevaFechaF = event.target.value;
        if (validarFecha(fechaI, nuevaFechaF)) {
            setFechaF(nuevaFechaF);
        } else {
            event.target.value = fechaF;
            showAlertIncorrect('La fecha fin no puede ser menor a la fecha inicio.', 'error')
        }
    };

    const ajustarFechaFin = (inicio, fin) => {
        const fechaInicio = moment(inicio);
        const fechaFin = moment(fin);

        if (fechaInicio.year() < fechaFin.year()) {
            const ultimoDia = fechaInicio.clone().endOf('year');
            setFechaF(ultimoDia.format('YYYY-MM-DD'));
        }
    };

    const validarFecha = (inicio, fin) => {
        return moment(inicio).isSameOrBefore(fin);
    };

    useEffect(() => {
        setFechaI(fechaInicio);
        ajustarFechaFin(fechaInicio, fechaF);
    }, [fechaInicio]);

    useEffect(() => {
        setFechaF(fechaFin);
    }, [fechaFin]);

    useEffect(() => {
        setFechaInicio(fechaI);
        setFechaFin(fechaF);
    }, [fechaF, fechaI, setFechaFin, setFechaInicio]);

    return (
        <>
            <div className="flex justify-left mb-3">
                <div>
                    <label className='font-medium dark:text-gray-300'>Fecha Inicio</label>
                    <input className='block w-full pr-4 mt-1 mb-1 text-sm text-red dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input' type="date" id={fechaInicio} defaultValue={fechaInicio} onChange={handleFechaInicioChange} max={fechaActual}/>
                </div>

                <div>
                    <label className='font-medium dark:text-gray-300'>Fecha Fin</label>
                    <input className='block w-full pr-4 ml-4 mt-1 mb-1 text-sm text-red dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input' type="date" id={fechaFin} defaultValue={fechaFin} onChange={handleFechaFinChange} max={fechaActual}/>
                </div>
            </div>
        </>
    )
}
export default Calendario;