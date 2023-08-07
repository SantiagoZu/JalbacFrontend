import React from 'react'
import {
    Card,
    CardBody,
    Button
} from '@windmill/react-ui'
import { Devolver } from '../../../../icons'
// import { showAlertCorrect, showAlertDeleted } from '../../../../helpers/Alertas'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos'
import Swal from 'sweetalert2'

export const CardDetalles = ({ detallePedido, pedido }) => {
    const { updateDetallePedidos } = useDetallePedidos()
    const { updatePedidos } = usePedidos()
    const updateValues = {
        idDetallePedido: detallePedido.idDetallePedido,
        idPedido: detallePedido.idPedido,
        idEmpleado: detallePedido.idEmpleado,
        idEstado: 4,
        nombreAnillido: detallePedido.nombreAnillido,
        tipo: detallePedido.tipo,
        peso: detallePedido.peso,
        tamanoAnillo: detallePedido.tamanoAnillo,
        tamanoPiedra: detallePedido.tamanoPiedra,
        material: detallePedido.material,
        detalle: detallePedido.detalle,
        cantidad: detallePedido.cantidad,
        motivoDevolucion: detallePedido.motivoDevolucion
    }
    const updateValuesPedido = {
        idPedido: pedido.idPedido,
        idCliente: pedido.idCliente,
        idEstado: 4,
        fechaPedido: pedido.fechaPedido,
        fechaEntrega: pedido.fechaEntrega
    }
    console.log(updateValues)
    async function cambiarEstado() {
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Motivo de devolución',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
                'aria-label': 'Type your message here'
            },
            showCancelButton: true
        })

        if (text) {
            Swal.fire(text)
        }
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
                                Tipo
                            </p>
                            <p>
                                {detallePedido.tipo}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Peso
                            </p>
                            <p >
                                {detallePedido.peso}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tamaño piedra
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
                            <p className='text-center'>
                                {detallePedido.idEmpleadoNavigation.nombre}
                            </p>
                        </div>
                        <div className='flex flex-row space-x-4'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-center text-sm">
                                Detalle
                            </p>
                            <p className='text-center'>
                                {detallePedido.detalle}
                            </p>
                        </div>
                        <div className='absolute top-0 right-0'>
                            <Button icon={Devolver} onClick={() => cambiarEstado()}>
                            </Button>
                        </div>
                    </div>


                </div>
            </CardBody>
        </Card>
    )
}
