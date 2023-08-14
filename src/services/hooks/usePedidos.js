import { useEffect, useState } from "react";
import { FetchData } from "../GenericAxios";
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';

export const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEmpleado, setPedidosEmpleado] = useState([]);
    const instance = FetchData('Pedido')
    let cookie = Cookies.get("CookieJalbac");
    const unencryptToken = jwtDecode(cookie);
    const idUsuario = unencryptToken.unique_name;
    useEffect(() => {
        getPedidos();
        getPedidosEmpleado(idUsuario)        
    }, []);
    const getPedidos = async () => {
        const response = await instance.get()
        const data = response.data.resultado;

        setPedidos(data)
        return pedidos;
    }
    const getPedidosEmpleado = async (idUsuario) => {
        const response = await instance.get(`PorEmpleado/${idUsuario}`)
        const data = response.data.resultado;
             
        setPedidosEmpleado(data)
        return pedidosEmpleado;
    }

    const postPedidos = async (obj) => {
        return await instance.post("/", obj).then((response) => {
            return response
        })
    }

    const updatePedidos = async (id, obj) => {
        return await instance.put(`/${id}`, obj).then((response) => {
            return response
        })
    }

    const deletePedidos = async (id) => {
        await instance.delete(`/${id}`);
    }

    const toggleEstadoPedido = async (pedido, inactivarOActivar) => {
        const valuesPedido = {
            idPedido: pedido.idPedido,
            idCliente: pedido.idCliente,
            idEstado: pedido.idEstado,
            fechaPedido: pedido.fechaPedido,
            fechaEntrega: pedido.fechaEntrega,
            isActivo : inactivarOActivar
        };   
        
        return await updatePedidos(pedido.idPedido, valuesPedido)
    }
    return {
        pedidosEmpleado,
        pedidos,
        idUsuario,
        getPedidosEmpleado,
        getPedidos,
        postPedidos,
        updatePedidos,
        deletePedidos,
        toggleEstadoPedido
    }
}

/*

    const pedidosEmpleado = [
        {
            idPedido : 3, params...
        },
        {
            idPedido : 2, params...
        },
        {
            idPedido : 1, params...
        },
        {...},...
    ]
    the function must return: 
        const pedidosEmpleado = [
        {
            idPedido : 1, params...
        },
        {
            idPedido : 2, params...
        },
        {
            idPedido : 3, params...
        },
        {...},...
    ]
*/