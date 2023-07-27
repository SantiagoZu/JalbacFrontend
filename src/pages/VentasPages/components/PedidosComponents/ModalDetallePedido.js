import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import response from '../../../../utils/demo/dataProductos'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import {CardDetalles} from './CardDetalles'

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

            <Modal isOpen={isOpen} onClose={isClose}  >
                <ModalHeader className='mb-8'> Detalles producto</ModalHeader>
                <ModalBody>
                    {detallePedidos.map((detallePedido, i) => idPedido == detallePedido.idPedido ? (
                        <CardDetalles detallePedido={detallePedido}/>
                    ): null)}
                </ModalBody>
                    
                <ModalFooter>

                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={isClose}>
                            Cerrar
                        </Button>
                    </div>

                </ModalFooter>
            </Modal>
        </>
    );
}
