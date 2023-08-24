import React from 'react'
import { Card, CardBody, Modal, ModalHeader } from '@windmill/react-ui'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { CardDetalles } from './CardDetalles'
import { Exclamation } from '../../../../icons'

export const ModalDetallePedidoDevuelto = ({ isOpen, isClose, pedido }) => {
    const DEVUELTO = 4
    const { detallePedidos, getDetallePedidos } = useDetallePedidos()
    const HAY_DEVUELTOS = detallePedidos.filter((detallePedido, i) => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado == DEVUELTO).length != 0

    function recargarCarta(val) {
        if (val) getDetallePedidos()
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader className='mb-5'>Detalles de productos devueltos</ModalHeader>
                <div className='-m-5 p-4 text-sm text-gray-700 dark:text-gray-400'>
                    <div className='grid grid-cols-2 gap-2'>
                        {HAY_DEVUELTOS ? detallePedidos.map(detallePedido => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado == DEVUELTO ? (
                            <>
                                <div>
                                    <CardDetalles key={detallePedido.idDetallePedido} detallePedido={detallePedido} pedido={pedido} recargarCarta={val => recargarCarta(val)} />
                                    <Card className='mb-3 shadow-md w-auto '>
                                        <CardBody className="h-full dark:bg-gray-700 bg-gray-100 flex flex-col justify-center">
                                            <p className='text-center font-bold text-white'>Motivos de devolucion</p>
                                            <ListaMotivosDevolucion motivosDevolucion={detallePedido.motivoDevolucion} />
                                        </CardBody>
                                    </Card>
                                </div>

                            </>
                        ) : null
                        ) : <div className='col-span-2 mb-5'>No hay productos devueltos</div>
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}

const ListaMotivosDevolucion = ({ motivosDevolucion }) => {
    const motivosSinNulos = motivosDevolucion.filter(motivo => motivo != null)
    let numeroMotivos = motivosSinNulos.length + 1
    const cardMotivosDevolucion = motivosSinNulos.map((motivo, i) => {
        numeroMotivos--
        return (
            <div className="m-2 relative">
                <p className='text-center'>{motivo}</p>
                <p className='absolute text-yellow-500 w-5 top-0 right-0 -mr-3' >{numeroMotivos}</p>
            </div>
        )
    }
    ).reverse()
    return (
        <>
            {cardMotivosDevolucion}
        </>
    )
}