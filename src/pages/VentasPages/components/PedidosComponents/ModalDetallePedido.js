import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalCrearCliente = ({ isOpen, isClose }) => {

    
    return (
        <>
            <Modal isOpen={isModalOpenVerDetalle} onClose={closeModalVerDetalle}  >
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
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Empleado encargado</TableCell>
                                    <TableCell>Motivo devolucion</TableCell>
                                </tr>
                            </TableHeader>
                            <TableBody className="w-12">
                                {dataTable3.map((producto, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.ID}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.nombre}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tipo}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.peso}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tamanoAnillo}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tamanoPiedra}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.material}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.detalle}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.estado}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{producto.motivoDevolucion}</p>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </TableContainer>
                </ModalBody>

                <ModalFooter>

                    <div className="block w-full sm:hidden">
                        <Button block size="large" layout="outline" onClick={closeModalVerDetalle}>
                            Cerrar
                        </Button>
                    </div>

                </ModalFooter>
            </Modal>
        </>
    );
}
