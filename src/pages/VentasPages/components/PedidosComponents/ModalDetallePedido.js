import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button , Card , CardBody } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'
import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Pagination,
} from '@windmill/react-ui'
import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import response from '../../../../utils/demo/dataProductos'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'

const responseDetallePedido = response.concat([])
export const ModalDetallePedido = ({ isOpen, isClose, idPedido }) => {
    const [dataTable, setDataTable] = useState([])
    const [dataDetallePedido, setDataDetallePedidos] = useState([]);
    const { detallePedidos } = useDetallePedidos()

    console.log(detallePedidos)
    console.log(idPedido)
    const [pageTable, setPageTable] = useState(1)
    const resultsPerPage = 10

    const totalResults = response.length
    useEffect(() => {
        setDataTable(responseDetallePedido.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
    }, [pageTable])

    function onPageChangeTable(p) {
        setPageTable(p)
    }

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
                        <Card key={i} className="mb-8 shadow-md">
                            <CardBody>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    ID Detalle Pedido: {detallePedido.idDetallePedido}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Nombre Anillido: {detallePedido.nombreAnillido}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Tipo: {detallePedido.tipo}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Peso: {detallePedido.peso}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Tamaño Anillo: {detallePedido.tamanoAnillo}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Tamaño Piedra: {detallePedido.tamanoPiedra}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Material: {detallePedido.material}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Detalle: {detallePedido.detalle}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Cantidad: 5
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Estado: {detallePedido.idEstadoNavigation.nombre}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Empleado: {detallePedido.idEmpleadoNavigation.nombre}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Motivo Devolución: {detallePedido.motivoDevolucion}
                                </p>
                            </CardBody>
                        </Card>
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
