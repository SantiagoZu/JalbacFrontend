import React, { useState, useEffect } from 'react'
import { ModalCrearProducto } from './ModalCrearProducto';
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
import { EditIcon, TrashIcon, SearchIcon } from '../../../../icons';

import { ModalEditarProducto } from './ModalEditarProducto';
import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect, showAlertDeleted } from '../../../../helpers/Alertas';
import response from '../../../../utils/demo/dataProductos'
const responseProducto = response.concat([])


export const ModalEditarPedido = ({ isOpen, isClose }) => {
    const [dataTable, setDataTable] = useState([])

    const [pageTable, setPageTable] = useState(1)
    const resultsPerPage = 10

    const totalResults = response.length
      useEffect(() => {
        setDataTable(responseProducto.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
      }, [pageTable])

      function onPageChangeTable(p) {
        setPageTable(p)
      }
    
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)

    function openModalCrearProducto() {
      setModalIsOpen(true);
    }
  
    function closeModal(){
      setModalIsOpen(false);
    }
    
      
    function openModalEditarProducto() {
        setModalIsOpenEditarProducto(true);
      }
    
      function closeModalEditarProducto(){
        setModalIsOpenEditarProducto(false);
      }
    
      function alertaEliminado() {
        showAlertDeleted('¿Estás seguro que deseas eliminar el empleado?', 'warning', 'Eliminado correctamente', 'success')
      }
    
  

    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const [cliente, cambiarCliente] = useState({ campo: '', valido: null });
    const [fechaPedido, cambiarFechaPedido] = useState({ campo: `${year}-${month}-${day}`, valido: null });
    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [peso, cambiarPeso] = useState({ campo: '', valido: null });
    const [tamanoAnillo, cambiarTamanoAnillo] = useState({ campo: '', valido: null });
    const [tamanoPiedra, cambiarTamanoPiedra] = useState({ campo: '', valido: null });
    const [detalle, cambiarDetalle] = useState({ campo: '', valido: null });
    const [motivoDevolucion, cambiarMotivoDevolucion] = useState({ campo: '', valido: true, desactivado: true });
 



    const [clienteEditarPedido, cambiarClienteEditarPedido] = useState({ campo: '', valido: null });
    const [motivoDevolucionEditarPedido, cambiarMotivoDevolucionEditarPedido] = useState({ campo: '', valido: true, desactivado: true });
    const [fechaPedidoEditar, cambiarFechaPedidoEditar] = useState({ campo: `${year}-${month}-${day}`, valido: null });
    // const [estadoPedido, cambiarEstadoPedido] = useState({ campo: '', valido: null, desactivado: true });

    const [formularioValido, cambiarFormularioValido] = useState(null);
    
    const [formularioValidoEditarProducto, cambiarFormularioValidoEditarProducto] = useState(null);

    const validacionFormulario = (e) => {
        e.preventDefault();
        if (cliente.valido === 'true' && fechaPedido.valido === "true" && motivoDevolucion.valido === true) {

            cambiarFormularioValido(true);
            cambiarCliente({ campo: '', valido: null });
            cambiarFechaPedido({ campo: '', valido: null });

            showAlertCorrect("Pedido agregado","success" , isClose);

        } else {
            cambiarFormularioValido(false);
            showAlertIncorrect('Digíte el fomulario correctamente', 'error');
        }
    }

    return (
        <>
            <form action='' onSubmit={validacionFormulario}>
                <Modal isOpen={isOpen} onClose={isClose}>
                    <ModalHeader className='mb-3'>Editar pedido</ModalHeader>
                    <ModalBody>
                        <Label className="mt-4">
                            <Input2 placeholder={"ingrese un cliente"} className="mt-1" estado={cliente} type={"text"} cambiarEstado={cambiarCliente} expresionRegular={expresiones.cliente} mensajeError={"El nombre no puede tener numeros"} />
                        </Label>

                        <Label className="mt-4">
                            <span>Fecha Entrega</span>

                            <Input2
                                placeholder="ingrese una fecha"
                                estado={fechaPedido}
                                type="date"
                                cambiarEstado={cambiarFechaPedido}
                                expresionRegular={false}
                                mensajeError={"La fecha debe ser mayor que el dia de hoy"}

                                id="fechaEditar"
                            />


                        </Label>
                        <Label className="mt-4">
                            <span>Asignar empleado</span>
                            <Select>
                                <option>Josue</option>
                                <option>Barreto</option>
                                <option>Portela</option>
                            </Select>
                        </Label>
                        <Label className="mt-4">
                            <span >Estado</span>
                            <Select className="mt-1">
                                <option>En produccion</option>
                                <option >Devuelto</option>
                                <option>Entregado</option>
                            </Select>
                        </Label>

                        <Button className="mb-4 mt-4" onClick={openModalCrearProducto}>
                            Agregar producto
                            <span className="mb-1" aria-hidden="true">
                                +
                            </span>
                        </Button>
                        <ModalCrearProducto  isOpen={modalIsOpen} isClose={closeModal} />

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
                                            <TableCell>Cantidad</TableCell>
                                            <TableCell>Empleado encargado</TableCell>
                                            <TableCell>Motivo devolucion</TableCell>
                                            <TableCell>acciones</TableCell>
                                        </tr>
                                    </TableHeader>
                                    <TableBody className="w-12">
                                        {dataTable.map((producto, i) => (
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
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">5</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.motivoDevolucion}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <Button layout="link" size="icon" aria-label="Edit" onClick={openModalEditarProducto} >
                                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} />
                                                        <Button layout="link" size="icon" aria-label="Delete" onClick={alertaEliminado} >
                                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
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
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={isClose} >
                                Cancelar
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={validacionFormulario}>Enviar</Button>
                        </div>

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
