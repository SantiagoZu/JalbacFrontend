import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import response from '../../../../utils/demo/dataProductos'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { CardDetalles } from './CardDetalles'

const responseDetallePedido = response.concat([])
export const ModalDetallePedido = ({ isOpen, isClose, idPedido }) => {
    const [dataTable, setDataTable] = useState([])
    const [dataDetallePedido, setDataDetallePedidos] = useState([]);
    const { detallePedidos } = useDetallePedidos()

    console.log(detallePedidos)
    console.log(idPedido)
    const [pageTable, setPageTable] = useState(1)



    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModalDetalle() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }


    return (
        <>

            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader className='mb-5'>Detalles producto</ModalHeader>
                <div className='-m-5 p-4 text-sm text-gray-700 dark:text-gray-400'>
                    <div className='grid grid-cols-2 gap-2'>
                        {detallePedidos.map((detallePedido, i) => idPedido == detallePedido.idPedido ? (
                            <CardDetalles detallePedido={detallePedido} />
                        ) : null)}
                    </div>
                </div>
            </Modal>
        </>
    );
}
