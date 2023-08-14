import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, TableContainer, TableCell, Table, TableBody, TableRow, TableHeader } from '@windmill/react-ui';
import { parsearFecha } from '../../../../helpers/parseDate';
import { useHisEstadoDetallePedido } from '../../../../services/hooks/useHisEstadoDetallePedido';

export const ModalHistorialDetalles = ({ isOpen, isClose, detalle }) => {
    const { hisEstadoDetallePedidos } = useHisEstadoDetallePedido()
    const [detallesFlitrados, setDetallesFlitrados] = useState([])
    useEffect(() => {
        if (detalle) {
            setDetallesFlitrados(hisEstadoDetallePedidos.filter((df) => df.idDetallePedido === detalle.idDetallePedido))
        }
    }, [detalle])

    return (

        <>
            <Modal isOpen={isOpen} onClose={isClose}>
                <ModalHeader>Estados por los que ha pasado el detalle</ModalHeader>
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
                            {detallesFlitrados.map((historial) => (
                                    <TableRow key={historial.idHisEstadoDetallePedido}>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{historial.idEstadoNavigation.nombre}</p>

                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{parsearFecha(historial.fecha)}</p>

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
