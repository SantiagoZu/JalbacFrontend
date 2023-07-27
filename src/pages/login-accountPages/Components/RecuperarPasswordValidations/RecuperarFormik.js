import { expresiones as regex } from '../../../../helpers/validacionesRegex';

export const initialValues = {
    correo: ''
};

export const validationScheme = {
    correo: regex.correo
};

export const validateInputs = (values) => {

    let errores = {};

    if (!values.correo) {
        errores.correo = 'El correo electrónico es obligatorio.'
    } else if (!validationScheme.correo.test(values.correo)) {
        errores.correo = 'Debe incluir una dirección de correo valida.'
    }

    return errores;

};