
import { minDate } from '../../../../../helpers/parseDate';


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
   
    console.log(errores)
    return errores;

};
