import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useDetallePedidos = () => {
    const [detallePedidos, setDetallePedidos] = useState([]);
    const instance = FetchData('DetallePedido')
    useEffect(() => {
        getDetallePedidos();       
    }, []);

    const getDetallePedidos = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setDetallePedidos(data)
        return detallePedidos;
    }

    const postDetallePedidos = async(obj) =>{
        return await instance.post("/", obj).then((response) => {           
            return response
        })
 
    }

    const updateDetallePedidos = async(id, obj) =>{
        return await instance.put(`/${id}`, obj).then(response => {
            
            return response
        })
    }

    const deleteDetallePedidos = async(id) =>{
        await instance.delete(`/${id}`);
    }

    return {
        detallePedidos,
        setDetallePedidos,
        getDetallePedidos,
        postDetallePedidos,
        updateDetallePedidos,
        deleteDetallePedidos,
        setDetallePedidos
    }
}
