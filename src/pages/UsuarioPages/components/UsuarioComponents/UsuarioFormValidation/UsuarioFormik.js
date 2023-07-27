import { expresiones as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    correo: ''
};

export const validationScheme = {
    correo: regex.correo
}

export const validateInputs = (values) => {

    let errores = {};

    if (!values.correo) {
        errores.correo = 'El campo Correo es oblígatorio'
    } else if (!validationScheme.correo.test(values.correo)) {
        errores.correo = 'El correo debe ser válido'
    }

    return errores;

};