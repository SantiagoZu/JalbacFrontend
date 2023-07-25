import { expresiones as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    nombre: '',
    apellido: '',
    documento: '',
    correo: '',
    contrasena: '',
};

export const validationScheme = {
    nombre: regex.nombre,
    apellido: regex.nombre,
    documento: regex.documento,
    correo: regex.correo,
    contrasena: regex.contrasena
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
        errores.documento = 'El documento debe tener mínimo 4 a 10 caracteres'
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

    if (!values.contrasena) {
        errores.contrasena = 'El campo Contraseña es oblígatorio'
    } else if (!validationScheme.contrasena.test(values.contrasena)) {
        errores.contrasena = 'La contraseña debe tener de 3 a 25 caracteres'
    }

    return errores;

};

export const validateEditInputs = (values) => {

    let errores = {};

    if (!values.nombre) {
        errores.nombre = 'El campo Nombre es oblígatorio'
    } else if (!validationScheme.nombre.test(values.nombre)) {
        errores.nombre = 'El nombre no debe tener números ni caracteres especiales'
    }

    if (!values.documento) {
        errores.documento = 'El campo Documento es oblígatorio'
    } else if (!validationScheme.documento.test(values.documento)) {
        errores.documento = 'El documento debe tener mínimo 4 a 10 caracteres'
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