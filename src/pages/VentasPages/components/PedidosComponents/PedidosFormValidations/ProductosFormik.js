import { expresionesProducto as regex } from '../../../../../helpers/validacionesRegex';

export const initialValuesAgregarProducto = {
  material : '',
  nombreAnillido: '',
  peso: '',
  tipo: '',
  tamanoAnillo: '',
  tamanoPiedra: '',
  detalle: '',
  cantidad: '',
  idEstado: 1,
  idPedido: 1,
  documentoEmpleadoHidden: null,
  motivoDevolucion: '',


};

export const validationScheme = {
  nombreAnillido: regex.nombreAnillido,
  peso: regex.peso,
  tamanoAnillo: regex.tamanoAnillo,
  tamanoPiedra: regex.tamanoPiedra,
  detalle: regex.detalle,
  cantidad: regex.cantidad,
  motivoDevolucion: regex.motivoDevolucion
}

export const validateInputsAgregarProducto = async (values) => {
  let errores = {};
  if(values.documentoEmpleadoHidden == null) {

    errores.documentoEmpleadoHidden = 'Este empleado no se encuentra registrado'
  } 

  if (values.nombreAnillido && !validationScheme.nombreAnillido.test(values.nombreAnillido)) {
    errores.nombreAnillido = 'El nombre no puede tener caracteres especiales'
  }
  if (!values.tipo) {
    errores.tipo = 'El campo servicio es obligatorio'
  } 
  if (!values.peso) {
    errores.peso = 'El campo Peso es oblígatorio'
  } else if (!validationScheme.peso.test(values.peso)) {
    errores.peso = 'No puede ingresar letras'
  }
  if (!values.tamanoAnillo) {
    errores.tamanoAnillo = 'El campo tamaño del anillo es oblígatorio'
  } else if (!validationScheme.tamanoAnillo.test(values.tamanoAnillo)) {
    errores.tamanoAnillo = 'La medida no puede tener letras'
  }
  if (values.tamanoPiedra && !validationScheme.tamanoPiedra.test(values.tamanoPiedra)) {
    errores.tamanoPiedra = 'El numero no puede tener letras'
  }
  if (!values.detalle) {
    errores.detalle = 'El campo Detalle es oblígatorio'
  } else if (!validationScheme.detalle.test(values.detalle)) {
    errores.detalle = 'El texto no puede contener más de 100 caracteres'
  }
  if (!values.cantidad) {
    errores.cantidad = 'El campo Cantidad  es obligatorio'
  } else if (!validationScheme.cantidad.test(values.cantidad)) {
    errores.cantidad = 'La cantidad minima de productos es 1'
  }
  return errores;
};
export const validateInputsEditarProducto = async (values) => {
  let errores = {};
  if (values.documentoEmpleadoHidden === null) {
    errores.documentoEmpleadoHidden = 'Este empleado no se encuentra registrado'
  } 
  if (values.nombreAnillido && !validationScheme.nombreAnillido.test(values.nombreAnillido)) {
    errores.nombreAnillido = 'El nombre no puede tener caracteres especiales'
  }
  if (!values.peso) {
    errores.peso = 'El campo Peso es oblígatorio'
  } else if (!validationScheme.peso.test(values.peso)) {
    errores.peso = 'No puede ingresar letras'
  }
  if (!values.tamanoAnillo) {
    errores.tamanoAnillo = 'El campo tamaño del anillo es oblígatorio'
  } else if (!validationScheme.tamanoAnillo.test(values.tamanoAnillo)) {
    errores.tamanoAnillo = 'La medida no puede tener letras'
  }
  
  if (values.tamanoPiedra && !validationScheme.tamanoPiedra.test(values.tamanoPiedra)) {
    errores.tamanoPiedra = 'El numero no puede tener letras'
  }
  if (!values.detalle) {
    errores.detalle = 'El campo Detalle es oblígatorio'
  } else if (!validationScheme.detalle.test(values.detalle)) {
    errores.detalle = 'El texto no puede ser contener mas de 100 caracteres'
  }
  if (!values.cantidad) {
    errores.cantidad = 'El campo Cantidad  es obligatorio'
  } else if (!validationScheme.cantidad.test(values.cantidad)) {
    errores.cantidad = 'La cantidad minima de productos es 1'
  }

  return errores;
};

