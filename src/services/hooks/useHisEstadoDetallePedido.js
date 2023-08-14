import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useHisEstadoDetallePedido = () => {
    const [hisEstadoDetallePedidos, setHisEstadoDetallePedidos] = useState([]);
    const [hisEstadoDetallePedido, setHisEstadoDetallePedido] = useState({});
    const instance = FetchData('HisEstadoDetallePedido')

    useEffect(() => {
        getHisEstadoDetallePedido();       
    }, []);

    const getHisEstadoDetallePedido = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setHisEstadoDetallePedidos(data)
        return hisEstadoDetallePedidos;
    }

    const HistorialDelDetalle = async (id) => {
        const response = await instance.get(`/${id}`)
        const data = response.data.resultado;
        setHisEstadoDetallePedido(data)
        return hisEstadoDetallePedido;
    }


    return {
        hisEstadoDetallePedidos,        
        getHisEstadoDetallePedido,
        HistorialDelDetalle,
    }
}
