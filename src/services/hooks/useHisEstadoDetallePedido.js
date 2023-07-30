import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useHisEstadoDetallePedido = () => {
    const [hisEstadoDetallePedidos, setHisEstadoDetallePedido] = useState([]);
    const instance = FetchData('HisEstadoDetallePedido')

    useEffect(() => {
        getHisEstadoDetallePedido();       
    }, []);

    const getHisEstadoDetallePedido = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setHisEstadoDetallePedido(data)
        return hisEstadoDetallePedidos;
    }


    return {
        hisEstadoDetallePedidos,
        getHisEstadoDetallePedido,
    }
}
