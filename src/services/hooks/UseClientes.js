import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const instance = FetchData('Cliente')

    //llamado a la api de clientes
    useEffect(() => {
        const cargarClientes = async () => {
            const response = await instance.get()
            const data = response.data.resultado;
            console.log(data)
            setClientes(data)
        }
        cargarClientes();
    }, []);




    return {
        clientes,
    }
}
