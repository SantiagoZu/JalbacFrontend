import { FetchData } from "../GenericAxios";

export const useUsuarios = () => {
    const instance = FetchData('Usuario')

    const crearCuenta = async(obj) =>{
        return await instance.post("/", obj)
    }

    return {
        crearCuenta
    }
}
