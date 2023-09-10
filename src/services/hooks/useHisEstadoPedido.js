import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";
import {usePedidos} from "../hooks/usePedidos"

export const useHisEstadoPedido = () => {
    const [hisEstadoPedido, setHisEstadoPedido] = useState([]);
    const [hisEstadoPedidoEmpleado, setHisEstadoPedidoEmpleado] = useState([]);
    const instance = FetchData('HisEstadoPedido')
    const instancePedidos = FetchData('Pedido')
    const { idUsuario} = usePedidos()
    useEffect(() => {
        getHistorialesEmpleado()
        getHisEstadoPedido()

    }, []);

    const getHisEstadoPedido = async () => {
        const response = await instance.get()
        const data = response.data.resultado;
        setHisEstadoPedido(data)
    }

  const getHistorialesEmpleado = async () => {
    const response = await instance.get()
    const historiales = response.data.resultado;
    const response2 = await instancePedidos.get(`PorEmpleado/${idUsuario}`)
    const pedidoEmpleado = response2.data.resultado
    let historialesDelEmpleado = []

    historiales.forEach((historial) => {
      pedidoEmpleado.forEach((pedido) => {
        if (pedido.idPedido === historial.idPedido) {
          historialesDelEmpleado.push(historial)
        }
      })
    })

    setHisEstadoPedidoEmpleado(historialesDelEmpleado)
  }


    return {
        hisEstadoPedido,
        getHisEstadoPedido,
    hisEstadoPedidoEmpleado,
    
    }
}
