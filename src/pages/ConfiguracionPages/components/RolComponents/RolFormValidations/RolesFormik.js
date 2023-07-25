import { expresionesRol as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    rol: '',
    checked: []
};

export const validationScheme = {
    rol: regex.rol
}

export const validateInputs = (values) => {

    let errores = {};

    if (!values.rol) {
        errores.rol = 'El campo rol es oblígatorio.'
    } else if (!validationScheme.rol.test(values.rol)) {
        errores.rol = 'El campo rol no debe tener números ni caracteres especiales.'
    }

    if (Object.keys(values.checked).length < 1) {
        errores.checked = 'Ceda al rol por lo menos un permiso.';
    }
    
    return errores;

};
