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
        await instance.post("/", obj)
    }

    const updatePedidos = async(id, obj) =>{
        await instance.put(`/${id}`, obj)
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
