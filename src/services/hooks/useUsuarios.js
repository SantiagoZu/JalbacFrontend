import { FetchData } from "../GenericAxios";

export const useUsuarios = () => {
    const instance = FetchData('Usuario')

    const crearCuenta = async(obj) =>{
        return await instance.post("/", obj)
    }

    const enviarCorreo = async(obj) =>{
        return await instance.post("/EnviarCorreo", obj)
    }

    const resetPassword = async(obj) =>{
        return await instance.post("/ResetContraseña", obj)
    }

    return {
        crearCuenta,
        enviarCorreo,
        resetPassword
    }
}
