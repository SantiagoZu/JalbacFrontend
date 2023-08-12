import React from 'react'
import { Card, CardBody, Modal, ModalHeader } from '@windmill/react-ui'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { CardDetalles } from './CardDetalles'
const ListaMotivosDevolucion = ({ motivosDevolucion }) => {
    const listMotivosSinNulos = motivosDevolucion.filter(motivo => motivo != null)
    const cardMotivosDevolucion = listMotivosSinNulos.map((motivo, i) => (
        <Card key={i} className="mb-3 shadow-md w-auto">
            <CardBody className='h-full dark:bg-gray-700 bg-gray-100'>
                <div className='flex flex-row gap-2'>
                    <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">Motivo: </p>
                    <p className='text-center'>{motivo}</p>
                </div>                
            </CardBody>
        </Card>
    )
    )
    return (
        <>
            {cardMotivosDevolucion}
        </>
    )
}
export const ModalDetallePedidoDevuelto = ({ isOpen, isClose, pedido }) => {
    const DEVUELTO = 4
    const { detallePedidos, getDetallePedidos } = useDetallePedidos()
    const HAY_DEVUELTOS = detallePedidos.filter((detallePedido, i) => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado == DEVUELTO).length != 0
    const esDevuelto = (detallePedido) => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado == DEVUELTO
    function recargarCarta(val) {
        if (val) {
            getDetallePedidos()
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader className='mb-5'>Detalles de productos devueltos</ModalHeader>
                <div className='-m-5 p-4 text-sm text-gray-700 dark:text-gray-400'>
                    <div className='grid grid-cols-2 gap-2'>
                        {HAY_DEVUELTOS ? detallePedidos.map(detallePedido => esDevuelto(detallePedido) ? (
                            <>
                                <CardDetalles key={detallePedido.idDetallePedido} detallePedido={detallePedido} pedido={pedido} updateCard={val => recargarCarta(val)} />
                                <ListaMotivosDevolucion motivosDevolucion={detallePedido.motivoDevolucion} />
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
