
import { minDate } from '../../../../../helpers/parseDate';
import moment from 'moment'

export const initialValues = {
    documentoCliente: null,
    fechaEntrega: minDate,
    detallesPedido: 0
};


export const validateInputs = async (values, validacionDocumento) => {
    let errores = {};
    if (values.documentoCliente === null) {
        errores.documentoCliente = 'Tienes que seleccionar un cliente'
    } else {
        try {
            const existCliente = await validacionDocumento(values.documentoCliente)
            if (!existCliente.isExistoso) errores.documentoCliente = 'Este cliente no se encuentra registrado'            
        } catch (e) {
            console.log(e)
        }
    }
    if (moment(values.fechaEntrega).format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD')) {
        errores.fechaEntrega = 'La fecha de entrega no puede ser hoy o una fecha pasada'
    }
    console.table(values)
    return errores;

};
