import { expresiones as regex } from '../../../../../helpers/validacionesRegex';
import { useClientes } from '../../../../../services/hooks/useClientes';
import {useState} from 'react';

export const initialValues = {
    nombre: '',
    apellido: '',
    documento: '',
    telefono: '',
    estado: ''
};

export const validationScheme = {
    nombre: regex.nombre,
    apellido: regex.nombre,
    documento: regex.documento,
    telefono: regex.telefono,
};

export const validateInputs = (values) => {

    // const {validarDocumento} = useClientes();
    // const [documentoRepetido, setDocumentoRepetido] = useState(false);

    // validarDocumento(values.documento).then(response =>{
    //     const data = response.data.resultado.isExistoso;
    //     setDocumentoRepetido(data);
    // }).catch(response =>{

    // })

    let errores = {};

    if (!values.nombre) {
        errores.nombre = 'El campo nombre es oblígatorio.'
    } else if (!validationScheme.nombre.test(values.nombre)) {
        errores.nombre = 'El campo nombre no debe tener números ni caracteres especiales.'
    }

    if (!values.documento) {
        errores.documento = 'El campo documento es oblígatorio.'
    } else if (!validationScheme.documento.test(values.documento)) {
        errores.documento = 'El campo documento debe tener mínimo 4 caracteres.'
    } 
    // else if (documentoRepetido) {
    //     errores.documento = 'Ya existe un cliente con el mismo documento.'
    // }

    if (!values.apellido) {
        errores.apellido = 'El campo apellidos es oblígatorio.'
    } else if (!validationScheme.nombre.test(values.apellido)) {
        errores.apellido = 'El campo apellido no debe tener números ni caracteres especiales.'
    }

    if (!values.telefono) {
        errores.telefono = 'El campo telefono es oblígatorio.'
    } else if (!validationScheme.telefono.test(values.telefono)) {
        errores.telefono = 'El campo telefono debe ser válido.'
    }

    return errores;

};