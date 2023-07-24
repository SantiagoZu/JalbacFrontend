import { expresionesProducto as regex } from '../../../../../helpers/validacionesRegex';

export const initialValuesAgregarProducto = {
    nombreAnillido: '',
    peso: '',
    tipo: '',
    tamanoAnillo: '',
    tamanoPiedra: '',
    detalle: '',
    cantidad: 0,  
    idEstado : 1,
   
    idEmpleado : 0,
    material : '',
    motivoDevolucion : '',

    
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

export const validateInputsAgregarProducto = (values) => {
    let errores = {};
    if (!values.nombreAnillido) {
        errores.nombreAnillido = 'El campo nombreAnillido es oblígatorio'
    } else if (!validationScheme.nombreAnillido.test(values.nombreAnillido)) {
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
    if (!values.tamanoPiedra) {
      errores.tamanoPiedra = 'El campo tamaño de piedra es oblígatorio'
    } else if (!validationScheme.tamanoPiedra.test(values.tamanoPiedra)) {
      errores.tamanoPiedra = 'El numero no puede tener letras'
    }
    if (!values.detalle) {
      errores.detalle = 'El campo Detalle es oblígatorio'
    } else if (!validationScheme.detalle.test(values.detalle)) {
      errores.detalle = 'El texto no puede ser contener mas de 100 caractere'
    }
    if (!values.cantidad) {
      errores.cantidad = 'El campo Cantidad  es obligatorio'
    } else if (!validationScheme.cantidad.test(values.cantidad)) {
      errores.cantidad = 'La cantidad minima de productos es 1'
    }
    return errores;
};
export const validateInputsEditarProducto = (values) => {
  let errores = {};
  if (!values.nombreAnillido) {
    errores.nombreAnillido = 'El campo nombreAnillido es oblígatorio'
} else if (!validationScheme.nombreAnillido.test(values.nombreAnillido)) {
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
if (!values.tamanoPiedra) {
  errores.tamanoPiedra = 'El campo tamaño de piedra es oblígatorio'
} else if (!validationScheme.tamanoPiedra.test(values.tamanoPiedra)) {
  errores.tamanoPiedra = 'El numero no puede tener letras'
}
if (!values.detalle) {
  errores.detalle = 'El campo Detalle es oblígatorio'
} else if (!validationScheme.detalle.test(values.detalle)) {
  errores.detalle = 'El texto no puede ser contener mas de 100 caractere'
}
if (!values.cantidad) {
  errores.cantidad = 'El campo Cantidad  es obligatorio'
} else if (!validationScheme.cantidad.test(values.cantidad)) {
  errores.cantidad = 'La cantidad minima de productos es 1'
}
  if (!values.motivoDevolucion) {
    errores.motivoDevolucion = 'El campo Fecha entrega es oblígatorio'
  } else if (!validationScheme.motivoDevolucion.test(values.motivoDevolucion)) {
    errores.motivoDevolucion = 'El texto no puede  contener mas de 100 caracteres'
  }
  return errores;
};

