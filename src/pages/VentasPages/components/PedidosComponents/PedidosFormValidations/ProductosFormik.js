import { expresionesProducto as regex } from '../../../../../helpers/validacionesRegex';

export const initialValuesAgregarProducto = {
    nombre: '',
    peso: '',
    tamanoAnillo: '',
    tamanoPiedra: '',
    detalle: '',
    cantidad: '',  

    
};

export const initialValuesEditarProducto = {
  nombre: '',
  peso: '',
  tamanoAnillo: '',
  tamanoPiedra: '',
  detalle: '',
  cantidad: '',  
  motivoDevolucion:  ''
  
};


export const validationScheme = {
    nombre: regex.nombre,
    peso: regex.peso,
    tamanoAnillo: regex.tamanoAnillo,
    tamanoPiedra: regex.tamanoPiedra,
    detalle: regex.detalle,
    cantidad: regex.cantidad, 
    motivoDevolucion: regex.motivoDevolucion
}

export const validateInputsAgregarProducto = (values) => {
    let errores = {};
    if (!values.nombre) {
        errores.nombre = 'El campo nombre es oblígatorio'
    } else if (!validationScheme.nombre.test(values.nombre)) {
        errores.nombre = 'El nombre no puede tener caracteres especiales'
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
  if (!values.nombre) {
      errores.nombre = 'El campo nombre es oblígatorio'
  } else if (!validationScheme.nombre.test(values.nombre)) {
      errores.nombre = 'El nombre no puede tener caracteres especiales'
  }
  if (!values.peso) {
      errores.peso = 'El campo Fecha entrega es oblígatorio'
  } else if (!validationScheme.peso.test(values.peso)) {
      errores.peso = 'No puede ingresar letras'
  }
  if (!values.tamanoAnillo) {
    errores.tamanoAnillo = 'El campo Fecha entrega es oblígatorio'
  } else if (!validationScheme.tamanoAnillo.test(values.tamanoAnillo)) {
    errores.tamanoAnillo = 'La medida no puede tener letras'
  }
  if (!values.tamanoPiedra) {
    errores.tamanoPiedra = 'El campo Fecha entrega es oblígatorio'
  } else if (!validationScheme.tamanoPiedra.test(values.tamanoPiedra)) {
    errores.tamanoPiedra = 'El numero no puede tener letras'
  }
  if (!values.detalle) {
    errores.detalle = 'El campo Fecha entrega es oblígatorio'
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

