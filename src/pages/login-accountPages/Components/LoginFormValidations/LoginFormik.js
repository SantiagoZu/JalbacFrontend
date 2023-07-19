import { expresiones as regex } from '../../../../helpers/validacionesRegex';

export const initialValues = {
    correo: '',
    contrasena: ''
};

export const validationScheme = {
    correo: regex.correo,
    contrasena: regex.contrasena
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
        errores.contrasena = 'El campo debe tener mínimo 4 caracteres.'
    }

    return errores;

};