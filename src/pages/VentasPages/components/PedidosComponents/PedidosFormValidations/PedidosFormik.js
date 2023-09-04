
import { minDate } from '../../../../../helpers/parseDate';
import moment from 'moment'

export const initialValues = {
    documentoClienteHidden  : null,
    fechaEntrega: minDate,
    detallesPedido: 0
};


export const validateInputs = async (values) => {
    let errores = {};

    if (values.documentoClienteHidden === null) {
        errores.documentoClienteHidden = 'Este cliente no está registrado'
    } 
    

    if (moment(values.fechaEntrega).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) {
        errores.fechaEntrega = 'La fecha de entrega no puede ser hoy o una fecha pasada'
    }
    console.table(values)
    return errores;

};
