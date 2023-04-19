import React from 'react'
import { MensajeError } from './styles/styles';


export const Input2 = ({ placeholder, type, estado, cambiarEstado, expresionRegular, mensajeError, desactivado, id = "" }) => {


    const onChange = (e) => {
        if (type == "date") {
            if (new Date(estado.campo).toLocaleDateString() >= new Date().toLocaleDateString("es-CO")) {
                cambiarEstado({ ...estado, campo: e.target.value, valido: 'true' });

            }
            else {
                cambiarEstado({ ...estado, campo: e.target.value, valido: 'false' });

            }
        }
        else {
            cambiarEstado({ ...estado, campo: e.target.value, desactivado: desactivado });
        }

    }

    const validacion = () => {
        if (expresionRegular) {
            if (expresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' });

            } else {
                cambiarEstado({ ...estado, valido: 'false' });
            }
        }

    }

    return (
        <>
            <input

                type={type}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onClick={onChange}
                onKeyPress={validacion}
                onBlur={validacion}
                onMouseOut={onChange}
                onMouseLeave={onChange}
                disabled={desactivado}
                id={id}
                className='block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input'>
            </input>
            <MensajeError valido={estado.valido}>{mensajeError}</MensajeError>
        </>
    )
}