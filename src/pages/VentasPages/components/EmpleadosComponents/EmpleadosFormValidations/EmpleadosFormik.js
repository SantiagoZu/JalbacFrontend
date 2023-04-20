import { expresiones as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    nombre: ''
};

export const validationSchemes = {
    nombre: regex.nombre
}

export const validateInputs = (values, validations) => {

    let errores = {};

    if (!values.nombre) {
        errores.nombre = 'El campo nombre es obligatorio'
    }else if(validationSchemes.nombre.test(values.nombre)){
        errores.nombre = 'Debe de ser un nombre válido';
    }

    return errores;

};