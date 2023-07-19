import { expresiones as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    nombre: '',
    apellido: '',
    documento: '',
    correo: '',
};

export const validationScheme = {
    nombre: regex.nombre,
    apellido: regex.nombre,
    documento: regex.documento,
    correo: regex.correo
}

export const validateInputs = (values) => {

    let errores = {};

    if (!values.nombre) {
        errores.nombre = 'El campo Nombre es oblígatorio'
    } else if (!validationScheme.nombre.test(values.nombre)) {
        errores.nombre = 'El nombre no debe tener números ni caracteres especiales'
    }

    if (!values.documento) {
        errores.documento = 'El campo Documento es oblígatorio'
    } else if (!validationScheme.documento.test(values.documento)) {
        errores.documento = 'El documento debe tener mínimo 4 caracteres'
    }

    if (!values.apellido) {
        errores.apellido = 'El campo Apellidos es oblígatorio'
    } else if (!validationScheme.nombre.test(values.apellido)) {
        errores.apellido = 'El apellido no debe tener números ni caracteres especiales'
    }

    if (!values.correo) {
        errores.correo = 'El campo Correo es oblígatorio'
    } else if (!validationScheme.correo.test(values.correo)) {
        errores.correo = 'El correo debe ser válido'
    }

    return errores;

};