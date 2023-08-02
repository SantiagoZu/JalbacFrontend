import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";

export const useHisEstadoPedido = () => {
    const [hisEstadoPedido, setHisEstadoPedido] = useState([]);
    const instance = FetchData('HisEstadoPedido')

    useEffect(() => {
        getHisEstadoPedido();       
    }, []);

    const getHisEstadoPedido = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setHisEstadoPedido(data)
        return hisEstadoPedido;
    }

    return {
        hisEstadoPedido,
        getHisEstadoPedido,
    }
}
