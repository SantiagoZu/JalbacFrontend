
import { minDate } from '../../../../../helpers/parseDate';
import moment from 'moment'

export const initialValues = {    
    idCliente : null,
    fechaEntrega: minDate,
    detallesPedido : 0
};


export const validateInputs = (values) => {
    let errores = {};         
    if (values.idCliente === null) {
        errores.idCliente = 'Tienes que seleccionar un cliente' 
    }
    if(moment(values.fechaEntrega).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')){
        errores.fechaEntrega = 'La fecha de entrega no puede ser hoy o una fecha pasada'
    }
    console.log(values)
    return errores;

};
