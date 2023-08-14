import React from 'react'
import {
    Card,
    CardBody,
    Button
} from '@windmill/react-ui'
import { Devolver } from '../../../../icons'
import { showAlertCorrect } from '../../../../helpers/Alertas'
import Swal from 'sweetalert2';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos'

export const CardDetalles = ({ detallePedido, pedido, recargarCarta = undefined }) => {
    const { updateDetallePedidos } = useDetallePedidos()
    const { updatePedidos } = usePedidos()    
    const DEVUELTO = 4
    const PRODUCCION = 2
    const ES_DEVUELTO = detallePedido.idEstado == DEVUELTO
    const ES_PRODUCCION = detallePedido.idEstado == PRODUCCION
    let detallePedidoValues = {
        idDetallePedido: detallePedido.idDetallePedido,
        idPedido: detallePedido.idPedido,
        idEmpleado: detallePedido.idEmpleado,
        idEstado: DEVUELTO,
        nombreAnillido: detallePedido.nombreAnillido,
        servicio: detallePedido.servicio,
        peso: detallePedido.peso,
        tamanoAnillo: detallePedido.tamanoAnillo,
        tamanoPiedra: detallePedido.tamanoPiedra,
        material: detallePedido.material,
        detalle: detallePedido.detalle,
        cantidad: detallePedido.cantidad,
        motivoDevolucion: detallePedido.motivoDevolucion || ''
    }
    let pedidoValues = {
        idPedido: pedido.idPedido,
        idCliente: pedido.idCliente,
        idEstado: DEVUELTO,
        fechaPedido: pedido.fechaPedido,
        fechaEntrega: pedido.fechaEntrega,
        isActivo: pedido.isActivo || ''
    }
    const botonesAlerta = {
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonColor: '#d33'
    }
    async function alertEscribirMotivo() {
        await Swal.fire({
            input: 'textarea',
            html: `<h1>Escribe el motivo de devolución</h1>`,
            inputAttributes: { 'style': 'resize : none' },
            preConfirm: texto => validateMotivoDevolucion(texto),
            ...botonesAlerta
        }).then(response => response.isConfirmed ? updateMotivoDevolucion(response.value) : null)
    }
    function validateMotivoDevolucion(texto) {
        if (!texto) return Swal.showValidationMessage('Tienes que escribir un motivo de devolución')
        if (!(/^[a-zA-ZÀ-ÿ0-9\s\,\"]{5,100}$/.test(texto))) Swal.showValidationMessage('El motivo de devolución no debe tener caracteres especiales')
    }
    async function updateMotivoDevolucion(motivo) {
        detallePedidoValues.motivoDevolucion = motivo
        try {
            await updateDetallePedidos(detallePedido.idDetallePedido, detallePedidoValues)
            await updatePedidos(pedido.idPedido, pedidoValues)
            recargarCarta(true)
            showAlertCorrect('Producto devuelto correctamente', 'success', () => null)
        } catch (error) {
            console.log(error)
        }
    }
    async function updateMandarProduccion() {
        detallePedidoValues.idEstado = PRODUCCION
        detallePedidoValues.motivoDevolucion = null
        try {
            const respuesta = await updateDetallePedidos(detallePedido.idDetallePedido, detallePedidoValues).then(response => response)
            const detallesDevueltos = respuesta.data.resultado.detallesActualizados.filter((detallePedido => detallePedido.idPedido == pedido.idPedido && detallePedido.idEstado == 4))
            if (detallesDevueltos.length == 0) {
                pedidoValues.idEstado = PRODUCCION
                await updatePedidos(pedido.idPedido, pedidoValues)
            }
            recargarCarta(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function alertMandarProduccion(titulo) {
        await Swal.fire({
            title: titulo,
            icon: 'warning',
            ...botonesAlerta
        }).then(response => response.isConfirmed ? updateMandarProduccion() : null)
    }
    async function devolverOMandarProduccion(Devolver) {
        const textoTitulo = Devolver ? '¿Estas seguro que deseas devolver este producto? ' : '¿Deseas pasar este producto a produccion?'
        if (!Devolver) return alertMandarProduccion(textoTitulo)
        await Swal.fire({
            title: textoTitulo,
            icon: 'warning',
            ...botonesAlerta
        }).then(response => response.isConfirmed ? alertEscribirMotivo() : null)
    }
    return (
        <Card key={detallePedido.idDetallePedido} className="mb-3 shadow-md w-auto">
            <CardBody className='h-full dark:bg-gray-700 bg-gray-100'>
                <div>
                    <div className='flex flex-row'>
                        <div className='space-y-1 mr-4 mb-1'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Nombre anillo
                            </p>
                            <p >
                                {detallePedido.nombreAnillido}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tipo de servicio
                            </p>
                            <p>
                                {detallePedido.servicio}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Peso(gr)
                            </p>
                            <p >
                                {detallePedido.peso}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tamaño piedra(mm)
                            </p>
                            <p>
                                {detallePedido.tamanoPiedra}
                            </p>

                        </div>

                        <div className='space-y-1 mb-1'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Material
                            </p>
                            <p>
                                {detallePedido.material}
                            </p>

                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Cantidad
                            </p>
                            <p>
                                {detallePedido.cantidad}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Estado
                            </p>
                            <p>
                                {detallePedido.idEstadoNavigation.nombre}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tamaño anillo
                            </p>
                            <p>
                                {detallePedido.tamanoAnillo}
                            </p>

                        </div>


                    </div>
                    <div className='relative'>
                        <div className='flex flex-row space-x-4'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-center text-sm">
                                Empleado
                            </p>
                            <p >
                                {detallePedido.idEmpleadoNavigation.nombre} {detallePedido.idEmpleadoNavigation.apellido}
                            </p>
                        </div>
                        <div className='flex flex-row space-x-4'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-center text-sm">
                                Detalles
                            </p>
                            <p className='text-center'>
                                {detallePedido.detalle}
                            </p>
                        </div>
                        {ES_DEVUELTO ? (
                            <div className='absolute top-0 right-0'>
                                <Button icon={Devolver} onClick={() => devolverOMandarProduccion(false)}>
                                </Button>
                            </div>
                        ) : null}
                        <div className='absolute top-0 right-0'>
                            {ES_PRODUCCION ? (
                                <Button icon={Devolver} onClick={() => devolverOMandarProduccion(true)}></Button>
                            ) : null}
                        </div>
                    </div>


                </div>
            </CardBody>
        </Card>

    )
}
