import { FetchData } from "../GenericAxios";
import { useEffect, useState } from "react";

export const useUsuarios = () => {
    const instance = FetchData('Usuario')
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setUsuarios(data)
        return usuarios;
    }


    const crearCuenta = async(obj) =>{
        return await instance.post("/", obj)
    }

    const enviarCorreo = async(obj) =>{
        return await instance.post("/EnviarCorreo", obj)
    }

    const resetPassword = async(obj) =>{
        return await instance.post("/ResetContraseña", obj)
    }

    const validacionCorreo = async (correo) => {
        const response = await instance.post(`/${correo}`);
        return response.data;
        
    };

    return {
        usuarios,
        crearCuenta,
        enviarCorreo,
        resetPassword,
        validacionCorreo
    }
}
