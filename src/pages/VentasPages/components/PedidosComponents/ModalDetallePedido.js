import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
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
    const {detallePedidos} = useDetallePedidos()
    
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
  
    function closeModal(){
      setModalIsOpen(false);
    }
    
    
    return (
        <>
       
            <Modal isOpen={isOpen} onClose={isClose}  >
                <ModalHeader className='mb-8'> Detalles producto</ModalHeader>
                <ModalBody>
                    <TableContainer >
                        <Table >
                            <TableHeader>
                                <tr >
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre anillo</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Peso</TableCell>
                                    <TableCell>Tamaño anillo</TableCell>
                                    <TableCell>Tamaño piedra</TableCell>
                                    <TableCell>Material</TableCell>
                                    <TableCell>Detalle</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Empleado encargado</TableCell>
                                    <TableCell>Motivo devolucion</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody className="w-12">
                                {detallePedidos.map((detallePedido, i) => idPedido == detallePedido.idPedido ? (
                                    <TableRow key={i}> {console.log(idPedido , detallePedido.idPedido)}
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idDetallePedido}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.nombreAnillido}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.tipo}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.peso}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.tamanoAnillo}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.tamanoPiedra}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.material}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.detalle}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">5</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idEstadoNavigation.nombre}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idEmpleadoNavigation.nombre}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.motivoDevolucion}</p>
                                        </TableCell>
                                        
                                    </TableRow>
                                ) : null
                                )}
                            </TableBody>
                        </Table>

                    </TableContainer>
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
