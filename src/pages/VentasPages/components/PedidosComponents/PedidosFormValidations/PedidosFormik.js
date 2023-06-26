import { expresionesCrearPedido as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    cliente: '',
    fechaEntrega: '',
    estado: 'Recibido'
};

export const validationScheme = {
    cliente: regex.cliente,
    fechaEntrega: regex.fechaEntrega,
    estado: regex.estado,
}

export const validateInputs = (values) => {

    let diaForm = values.fechaEntrega.slice(8,10) // obtengo el dia desde el form
    let mesForm = parseInt((values.fechaEntrega.slice(5,7))) - 1 //obtengo el mes desde el form
    let yearForm = values.fechaEntrega.slice(0,4) // obtengo el año desde form
    let fechaHoy = new Date()
    let diaHoy =  fechaHoy.getDate() //obtengo el dia desde el sistema
    let mesHoy =  fechaHoy.getMonth() //obtengo el mes desde el sistema
    let yearHoy = fechaHoy.getFullYear()  //obtengo el año desde el sistema
    console.log(` ${diaForm} ${mesForm} ${yearForm} ${diaHoy} ${mesHoy} ${yearHoy}`)
    let fechaComparar = new Date(yearForm, mesForm, diaForm) //creo el objeto fecha del form
    let fechaCompararHoy = new Date(yearHoy, mesHoy, diaHoy) //creo la fecha de hoy desde sistema
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
