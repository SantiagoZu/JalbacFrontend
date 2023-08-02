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

    return {
        pedidosEmpleado,
        pedidos,
        getPedidos,
        postPedidos,
        updatePedidos,
        deletePedidos
    }
}
