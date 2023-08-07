import { expresionesRol as regex } from '../../../../../helpers/validacionesRegex';

export const initialValues = {
    rol: '',
    checked: []
};

export const validationScheme = {
    rol: regex.rol
}

export const validateInputs = (values, select) => {

    let errores = {};

    if (!values.rol) {
        errores.rol = 'El campo rol es oblígatorio.'
    } else if (!validationScheme.rol.test(values.rol)) {
        errores.rol = 'El campo rol no debe tener números ni caracteres especiales.'
    }
    if (select.lenght < 1) {
        errores.checked = 'Ceda al rol por lo menos un permiso.'
    }
    return errores;

};

export const validateEditInputs = (values, selectedPermisos) =>{

    let errores = {};

    if (!values.rol) {
        errores.rol = 'El campo rol es oblígatorio.'
    } else if (!validationScheme.rol.test(values.rol)) {
        errores.rol = 'El campo rol no debe tener números ni caracteres especiales.'
    } 

    if (selectedPermisos.lenght < 1) {
        errores.checked = 'Ceda al rol por lo menos un permiso.'
    }

    // if (values.checked.length < 1){
    //     errores.checked = 'Ceda al rol por lo menos un permiso.'
    // }
    
    return errores;

};
