import React, { useState, useEffect } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import responseDetalles from '../../../../utils/demo/dataHistorialEstadoProducto';
import {showAlertCorrect, showAlertDeleted} from '../../../../helpers/Alertas';
import {ModalEditarEstadoProducto} from './ModalEditarEstadoProducto';

import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableContainer,
} from '@windmill/react-ui'
import {EditIcon} from '../../../../icons';


export const ModalDetalleProducto = ({ isOpen, isClose }) => {
    const resultsPerPage = 10
    const responseDetallesProductos = responseDetalles.concat([])
    const [pageTable3, setPageTable3] = useState(1)
    const [dataTable3, setDataTable3] = useState([])

    useEffect(() => {
        setDataTable3(responseDetallesProductos.slice((pageTable3 - 1) * resultsPerPage, pageTable3 * resultsPerPage))
    }, [pageTable3])

    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [peso, cambiarPeso] = useState({ campo: '', valido: null });
    const [tamanoAnillo, cambiarTamanoAnillo] = useState({ campo: '', valido: null });
    const [tamanoPiedra, cambiarTamanoPiedra] = useState({ campo: '', valido: null });
    const [detalle, cambiarDetalle] = useState({ campo: '', valido: null });
    const [motivoDevolucion, cambiarMotivoDevolucion] = useState({ campo: '', valido: true, desactivado: true });
    const [cliente, cambiarCliente] = useState({ campo: '', valido: null });
    const [formularioValidoProducto, cambiarFormularioValidoProducto] = useState(null);
    const [formularioValidoEditarProducto, cambiarFormularioValidoEditarProducto] = useState(null);
    const [formularioValido, cambiarFormularioValido] = useState(null);
    
    const comparaFechas = (fecha1) => {
        if (new Date(fecha1).toLocaleDateString() >= new Date().toLocaleDateString("es-CO")) {

            return true
        }
        else {

            return false
        }
    }

    const validacionFormulario = (e) => {
        e.preventDefault();
        if (cliente.valido === 'true' && comparaFechas(document.getElementById("fechaEditar").value) && motivoDevolucion.valido === true) {

            cambiarFormularioValido(true);
            cambiarCliente({ campo: '', valido: null });
            if (motivoDevolucion.valido) {
                showAlertCorrect("Pedido agregado");
            }
            showAlertCorrect("Pedido editado");


        } else {
            cambiarFormularioValido(false);
            showAlertCorrect("Pedido editado");
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function openModal(){
        setModalIsOpen(true);
    }

    function closeModal(){
        setModalIsOpen(false);
    }

    return (
        <>
            <form action='' onSubmit={validacionFormulario}>
                <Modal isOpen={isOpen} onClose={isClose}>
                    <ModalHeader className='mb-3'>Editar devoluciones</ModalHeader>
                    <ModalBody>
                        <div >
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
                                            <TableCell>Empleado encargado</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Motivo devolucion</TableCell>
                                            <TableCell>acciones</TableCell>
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
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.estado}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.motivoDevolucion}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <Button layout="link" size="icon" aria-label="Edit" onClick={openModal}>
                                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                        <ModalEditarEstadoProducto isOpen={modalIsOpen} isClose={closeModal}/>
                                                    </div>
                                                </TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                            
                        </div>

                    </ModalBody>

                    <ModalFooter>


                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={isClose}>
                                Cancel
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large">
                                Accept
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </form>
        </>
    );
}
