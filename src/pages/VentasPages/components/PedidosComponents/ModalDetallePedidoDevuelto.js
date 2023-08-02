import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import response from '../../../../utils/demo/dataProductos'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { CardDetalles } from './CardDetalles'


export const ModalDetallePedidoDevuelto = ({ isOpen, isClose, pedido }) => {

    const { detallePedidos } = useDetallePedidos()
    return (
        <>

            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader className='mb-5'>Detalles producto</ModalHeader>
                <div className='-m-5 p-4 text-sm text-gray-700 dark:text-gray-400'>
                    <div className='grid grid-cols-2 gap-2'>
                        {detallePedidos.map((detallePedido, i) => pedido.idPedido == detallePedido.idPedido && detallePedido.idEstado == 4 ? (
                            <CardDetalles detallePedido={detallePedido} pedido={pedido} />
                        ) : null)}
                    </div>
                </div>
            </Modal>
        </>
    );
}
