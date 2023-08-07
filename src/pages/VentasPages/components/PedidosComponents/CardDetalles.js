import React, { useEffect } from 'react'
import {
    Card,
    CardBody,
    Button
} from '@windmill/react-ui'
import { Devolver } from '../../../../icons'
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas'
import Swal from 'sweetalert2';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos'

export const CardDetalles = ({ detallePedido, pedido, updateCard = undefined }) => {
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
        motivoDevolucion: detallePedido.motivoDevolucion || ''
    }
    const updateValuesPedido = {
        idPedido: pedido.idPedido,
        idCliente: pedido.idCliente,
        idEstado: 4,
        fechaPedido: pedido.fechaPedido,
        fechaEntrega: pedido.fechaEntrega
    }    
    async function cambiarEstado(Devolver) {        
        let textoTitulo = Devolver ? '¿Estas seguro que deseas devolver este producto? ' : '¿Deseas pasar este producto a produccion?'
        if (Devolver) {
            await Swal.fire({

                title: textoTitulo,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar'

            }).then(async response => {
                if (response.isConfirmed) {
                    const devuelto = await Swal.fire({
                        input: 'textarea',
                        html: `<h1>Escribe el motivo de devolucion</h1>`,
                        inputAttributes: {
                            'aria-label': 'Type your message here',
                            'style': 'resize : none'
                        },
                        
                        preConfirm: response => {
                            if (!response) {
                                Swal.showValidationMessage('Tienes que escribir un motivo de devolucion')
                            }
                            else if (!(/^[a-zA-Z0-9 ]{5,100}$/.test(response))) {
                                Swal.showValidationMessage('El motivo de devolucion no debe tener caracteres especiales')
                            }
                        },
                        showCancelButton: true,
                        cancelButtonText: 'Cancelar',
                        showConfirmButton: true,
                        confirmButtonText: 'Confirmar'
                    }).then(async response => {
                        if (response.isConfirmed) {
                            updateValues.motivoDevolucion = response.value
                            console.log(updateValues)
                            await updateDetallePedidos(detallePedido.idDetallePedido, updateValues).then(response => {
                                showAlertCorrect('Producto devuelto correctamente', 'success', () => null)
                                console.log(response);
                                updatePedidos(pedido.idPedido, updateValuesPedido).then(response => response)
                            }).catch(response => console.log(response))
                        }
                        return response
                    })
                    
                    if(devuelto) {
                        updateCard(true)
                    }
                }
            })
        }
        else {
            const sentToProduction = await Swal.fire({
                title: textoTitulo,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                showConfirmButton: true,
                confirmButtonText: 'Confirmar'
            }).then(async response => {
                if (response.isConfirmed) {
                    updateValues.idEstado = 2
                    updateValues.motivoDevolucion = null                    
                    let respuesta = await updateDetallePedidos(detallePedido.idDetallePedido, updateValues).then(async response => response)                     
                    const detallesDevueltos = respuesta.data.resultado.detallesNuevos.filter((detallePedido => detallePedido.idPedido == pedido.idPedido && detallePedido.idEstado == 4))
                    if(detallesDevueltos.length == 0) {
                        updateValuesPedido.idEstado = 2
                        updatePedidos(pedido.idPedido, updateValuesPedido).then(res => console.log(res))    
                    }                           
                    return response
                }
            })
            if(sentToProduction) {
                updateCard(true)
            }            
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
                                Tipo de servicio
                            </p>
                            <p>
                                {detallePedido.tipo}
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
                            <p className='text-center'>
                                {detallePedido.idEmpleadoNavigation.nombre}
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
                        {detallePedido.idEstado == 4 ? (
                            <div className='flex flex-row space-x-4'>
                                <p className=" text-gray-700 dark:text-gray-300 font-bold text-center text-sm">
                                    Motivo devolucion
                                </p> {console.log(detallePedido)}
                                <p className='text-center'>
                                    {detallePedido.motivoDevolucion[detallePedido.motivoDevolucion.length - 1]}
                                </p>
                            </div>
                        ) : null}
                        {detallePedido.idEstado == 4 ? (
                            <div className='absolute top-0 right-0'>
                                <Button icon={Devolver} onClick={() => cambiarEstado(false)}>
                                </Button>
                            </div>
                        ) : null}
                        <div className='absolute top-0 right-0'>
                            {detallePedido.idEstado == 3 ? (
                                <Button icon={Devolver} onClick={() => cambiarEstado(true)}>
                                </Button>
                            ) : null}
                        </div>
                    </div>


                </div>
            </CardBody>
        </Card>
    )
}
