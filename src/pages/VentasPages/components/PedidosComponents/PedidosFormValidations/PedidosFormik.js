
import { expresionesCrearPedido as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {    
    idCliente : null,
    fechaEntrega: '',
    detallesPedido : []
};


export const validateInputs = (values) => {

    let diaForm = values.fechaEntrega.slice(8,10) // obtengo el dia desde el form
    let mesForm = parseInt((values.fechaEntrega.slice(5,7))) - 1 //obtengo el mes desde el form
    let yearForm = values.fechaEntrega.slice(0,4) // obtengo el año desde form
    let fechaHoy = new Date()
    let diaHoy =  fechaHoy.getDate() //obtengo el dia desde el sistema
    let mesHoy =  fechaHoy.getMonth() //obtengo el mes desde el sistema
    let yearHoy = fechaHoy.getFullYear()  //obtengo el año desde el sistema
    
    let fechaComparar = new Date(yearForm, mesForm, diaForm) //creo el objeto fecha del form
    let fechaCompararHoy = new Date(yearHoy, mesHoy, diaHoy) //creo la fecha de hoy desde sistema
    
    let errores = {};    
    if (!values.fechaEntrega) {
        errores.fechaEntrega = 'El campo Fecha entrega es oblígatorio'
    } else if (!(fechaComparar > fechaCompararHoy)) {
        errores.fechaEntrega = 'La Fecha de entrega no puede ser hoy ni ninguna fecha pasada  '        
    }
    if (!values.cliente) {
        errores.cliente = 'Tienes que seleccionar un cliente'
    } else if (!(values.cliente == null)) {
        errores.cliente = 'Tienes que seleccionar un cliente'        
    }
    if (!values.detallesPedido) {
        errores.detallesPedido = 'Tienes que agregar almenos un producto'
    }
    return errores;

};
