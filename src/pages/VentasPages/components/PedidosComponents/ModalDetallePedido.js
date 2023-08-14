import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader } from '@windmill/react-ui';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { CardDetalles } from './CardDetalles'
export const ModalDetallePedido = ({ isOpen, isClose, pedido }) => {
    const { detallePedidos, getDetallePedidos } = useDetallePedidos()
    const HAY_DETALLES = detallePedidos.filter(detallePedido => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado != 4).length != 0
    function recargarCarta(val) {
        if (val) getDetallePedidos()
    }
    return (
        <>
            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader className='mb-5'>Detalles del pedido</ModalHeader>
                <div className='-m-5 p-4 text-sm text-gray-700 dark:text-gray-400'>
                    <div className='grid grid-cols-2 gap-2'>
                        {HAY_DETALLES ?
                            detallePedidos.map((detallePedido, i) => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado != 4 ? (
                                <CardDetalles detallePedido={detallePedido} pedido={pedido} recargarCarta={val => recargarCarta(val)} />
                            ) : null
                            ) : <h1>No hay detalles debido a que los detalles se encuentran devueltos</h1>
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}
