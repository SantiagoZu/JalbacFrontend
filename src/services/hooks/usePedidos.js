import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const instance = FetchData('Pedido')

    useEffect(() => {
        getPedidos();       
    }, []);

    const getPedidos = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setPedidos(data)
        return pedidos;
    }

    const postPedidos = async(obj) =>{
        return await instance.post("/", obj).then((response) => {           
            return response
        })
    }

    const updatePedidos = async(id, obj) =>{
        return await instance.put(`/${id}`, obj).then((response) => {
            return response
        })
    }

    const deletePedidos = async(id) =>{
        await instance.delete(`/${id}`);
    }

    return {
        pedidos,
        getPedidos,
        postPedidos,
        updatePedidos,
        deletePedidos
    }
}
