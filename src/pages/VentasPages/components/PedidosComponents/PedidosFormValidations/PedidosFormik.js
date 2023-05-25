import { expresionesCrearPedido as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    cliente: '',
    fechaEntrega: '',
    estado: ''
};

export const validationScheme = {
    cliente: regex.cliente,
    fechaEntrega: regex.fechaEntrega,
    estado: regex.estado,
}

export const validateInputs = (values) => {

    let diaForm = values.fechaEntrega.slice(8,10)
    let mesForm = parseInt((values.fechaEntrega.slice(5,7))) - 1 
    let yearForm = values.fechaEntrega.slice(0,4) 
    let fechaHoy = new Date()
    let diaHoy =  fechaHoy.getDate()
    let mesHoy =  fechaHoy.getMonth()
    let yearHoy = fechaHoy.getFullYear() 
    console.log(` ${diaForm} ${mesForm} ${yearForm} ${diaHoy} ${mesHoy} ${yearHoy}`)
    let fechaComparar = new Date(yearForm, mesForm, diaForm)
    let fechaCompararHoy = new Date(yearHoy, mesHoy, diaHoy)
    console.log(fechaComparar > fechaCompararHoy)
    let errores = {};
    if (!values.cliente) {
        errores.cliente = 'El campo Cliente es oblígatorio'
    } else if (!validationScheme.cliente.test(values.cliente)) {
        errores.cliente = 'El nombre no puede tener numeros'
    }
    if (!values.fechaEntrega) {
        errores.fechaEntrega = 'El campo Fecha entrega es oblígatorio'
    } else if (!(fechaComparar > fechaCompararHoy)) {
        errores.fechaEntrega = 'La Fecha de entrega no puede ser hoy ni ninguna fecha pasada  '        
    }

    return errores;

};
