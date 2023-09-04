import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const instance = FetchData('Cliente')

    useEffect(() => {
        getClientes();       
    }, []);

    const getClientes = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setClientes(data)
        return clientes;
    }

    const postClientes = async(obj) =>{
        await instance.post("", obj)
    }

    const updateClientes = async(id, obj) =>{
        await instance.put(`/${id}`, obj)
    }

    const deleteClientes = async(id) =>{
        await instance.delete(`/${id}`);
    }

    const validacionDocumento = async (documento) => {
        const response = await instance.post(`/${documento}`);
        return response.data;
    };

    return {
        clientes,
        getClientes,
        postClientes,
        updateClientes,
        deleteClientes,
        validacionDocumento
    }
}