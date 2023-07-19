import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useHisEstadoDetallePedido = () => {
    const [hisEstadoDetallePedido, setHisEstadoDetallePedido] = useState([]);
    const instance = FetchData('HisEstadoDetallePedido')

    useEffect(() => {
        getHisEstadoDetallePedido();       
    }, []);

    const getHisEstadoDetallePedido = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setHisEstadoDetallePedido(data)
        return hisEstadoDetallePedido;
    }

    const postHisEstadoDetallePedido = async(obj) =>{
        await instance.post("/", obj)
    }


    return {
        hisEstadoDetallePedido,
        getHisEstadoDetallePedido,
        postHisEstadoDetallePedido,
        
    }
}
