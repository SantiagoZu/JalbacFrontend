import { expresiones as regex } from '../../../../helpers/validacionesRegex';

export const initialValues = {
    correo: '',
    contrasena: '',
    confirmContrasena: ''
};

export const validationScheme = {
    correo: regex.correo,
    contrasena: regex.contrasena,
    confirmContrasena: regex.contrasena
};

export const validateInputs = (values) => {

    let errores = {};

    if (!values.correo) {
        errores.correo = 'El correo electrónico es obligatorio.'
    } else if (!validationScheme.correo.test(values.correo)) {
        errores.correo = 'Debe incluir una dirección de correo valida.'
    }

    if (!values.contrasena) {
        errores.contrasena = 'La contraseña es obligatoria'
    } else if (!validationScheme.contrasena.test(values.contrasena)) {
        errores.contrasena = 'El campo debe tener entre 3 y 25 caracteres.'
    }

    if (!values.confirmContrasena) {
        errores.confirmContrasena = 'La contraseña es obligatoria'
    } else if (!validationScheme.confirmContrasena.test(values.confirmContrasena)) {
        errores.confirmContrasena = 'El campo debe tener entre 3 y 25 caracteres.'
    } else if(values.confirmContrasena !== values.contrasena){
        errores.confirmContrasena = 'Las contraseñas deben ser iguales'
    }

    return errores;

};