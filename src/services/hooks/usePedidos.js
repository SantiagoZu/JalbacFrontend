import { useEffect, useState, useMemo } from "react";
import { FetchData } from "../GenericAxios";
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';
import { useDetallePedidos } from "./useDetallePedidos";


export const usePedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [pedidosEmpleado, setPedidosEmpleado] = useState([]);
    const instance = FetchData('Pedido')
    const {updateDetallePedidos} = useDetallePedidos()

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
            isActivo: inactivarOActivar
        };

        return await updatePedidos(pedido.idPedido, valuesPedido)
    }

    const updateFase = async (pedido, detallesAEditar, estado) => {
        try {
            const valuesPedido = {
                idPedido: pedido.idPedido,
                idCliente: pedido.idCliente,
                idEstado: estado,
                fechaPedido: pedido.fechaPedido,
                fechaEntrega: pedido.fechaEntrega,
                isActivo: pedido.isActivo
            };

            for (const detallePedido of detallesAEditar) {
                const valuesDetalle = {
                    idDetallePedido: detallePedido.idDetallePedido || '',
                    idPedido: detallePedido.idPedido || '',
                    idEmpleado: detallePedido.idEmpleado || '',
                    idEstado: estado || '',
                    nombreAnillido: detallePedido.nombreAnillido || '',
                    tipo: detallePedido.tipo || '',
                    peso: detallePedido.peso || '',
                    tamanoAnillo: detallePedido.tamanoAnillo || '',
                    tamanoPiedra: detallePedido.tamanoPiedra || '',
                    material: detallePedido.material || '',
                    detalle: detallePedido.detalle || '',
                    cantidad: detallePedido.cantidad || '',
                    motivoDevolucion: null
                }
                updateDetallePedidos(detallePedido.idDetallePedido, valuesDetalle)
            }
            return await updatePedidos(pedido.idPedido, valuesPedido)
        } catch (error) {
            console.log(error)
        }
    }
    return {
        pedidosEmpleado,
        pedidos,
        idUsuario,
        setPedidos,
        getPedidosEmpleado,
        getPedidos,
        postPedidos,
        updatePedidos,
        deletePedidos,
        toggleEstadoPedido,
        updateFase 
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