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
                                    <CardDetalles key={detallePedido.idDetallePedido} detallePedido={detallePedido} pedido={pedido} updateCard={val => recargarCarta(val)} />
                                    <ListaMotivosDevolucion motivosDevolucion={detallePedido.motivoDevolucion} />
                                </div>

                            </>
                        ) : null
                        ) : <div>No hay productos devueltos</div>
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}

const ListaMotivosDevolucion = ({ motivosDevolucion }) => {
    const motivosSinNulos = motivosDevolucion.filter(motivo => motivo != null)
    const cardMotivosDevolucion = motivosSinNulos.map((motivo, i) => (
        <Card key={i} className="mb-2 shadow-md w-auto relative">
            <CardBody className='h-full dark:bg-gray-700 bg-gray-100'>
                <div className='flex flex-row gap-2'>
                    <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">Motivo devolución: </p>
                    <p className='text-center'>{motivo}</p>
                    {i === motivosSinNulos.length - 1
                        ? <Exclamation className='absolute text-yellow-500 w-5 top-0 right-0 mt-1 mr-1' />
                        : null}
                </div>
            </CardBody>
        </Card>
    )
    ).reverse()
    return (
        <>
            {cardMotivosDevolucion}
        </>
    )
}
