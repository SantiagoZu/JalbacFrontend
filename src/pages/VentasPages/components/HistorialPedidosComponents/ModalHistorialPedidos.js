import React from 'react'
import { Modal, ModalHeader, ModalBody, TableContainer, TableCell, Table, TableBody, TableRow, TableHeader } from '@windmill/react-ui';
import { returnDate } from '../../../../helpers/parseDate';
export const ModalHistorialPedidos = ({ isOpen, isClose, pedido }) => {
    
    if (!pedido || !pedido.historialesDePedido) {
        return null;
    }

    const { historialesDePedido } = pedido
    
    return (    
        <>
            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader>Estados por los que ha pasado el pedido</ModalHeader>
                <ModalBody>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableCell>Estado cambiado</TableCell>
                                    <TableCell>Fecha cambiado</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {historialesDePedido.map((historial) => (
                                    <TableRow key={historial.idHisEstadoPedido}>

                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{historial.idEstadoNavigation.nombre}</p>

                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{returnDate(historial.fecha)}</p>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ModalBody>
            </Modal>
        </>
    )
}
