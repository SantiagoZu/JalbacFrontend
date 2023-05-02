import { expresionesCrearPedido as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    cliente: '',
    fechaEntrega: '',
};

export const validationScheme = {
    cliente: regex.cliente,
    fechaEntrega: regex.fechaEntrega,
}

export const validateInputs = (values) => {

    let errores = {};
    let fechaInput = new Date(values.fechaEntrega)
    let fechaComparar = new Date(fechaInput.setDate(fechaInput.getDay() + 1)) 
    if (!values.cliente) {
        errores.cliente = 'El campo Cliente es oblígatorio'
    } else if (!validationScheme.cliente.test(values.cliente)) {
        errores.cliente = 'El nombre no puede tener numeros'
    }

    if (!values.fechaEntrega) {
        errores.fechaEntrega = 'El campo Fecha entrega es oblígatorio'
    } else if (!(fechaComparar.getTime() >= new Date().getTime())) {
        errores.fechaEntrega = 'La Fecha de entrega no puede ser hoy ni ninguna fecha pasada  ' 
        
    }

    return errores;

};
