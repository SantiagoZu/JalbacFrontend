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
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './PedidosFormValidations/PedidosFormik';
import { usePedidos } from '../../../../services/hooks/usePedidos'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
const responseProducto = response.concat([])



export const ModalEditarPedido = ({ isOpen, isClose, object }) => {
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
    
    const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
    const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)

    function openModalCrearProducto() {
      setModalIsOpenCrearProducto(true);
    }
  
    function closeModalCrearProducto(){
      setModalIsOpenCrearProducto(false);
    }

    
    function openModalEditarProducto(obj) {
        setModalIsOpenEditarProducto(true);
        setData(obj)
      }
    
      function closeModalEditarProducto(){
        setModalIsOpenEditarProducto(false);
      }
    
      function alertaEliminado(idDetallePedido) {
        showAlertDeleted('¿Estás seguro que deseas eliminar el empleado?', 'warning', 'Eliminado correctamente', 'success' , () => deleteDetallePedidos(idDetallePedido) )
      }
    
      function setData(obj) {
        setDataDetallePedidos(obj);
      }
    const [dataDetallePedido, setDataDetallePedidos] = useState([])
    const {detallePedidos, deleteDetallePedidos} = useDetallePedidos()
    const { updatePedidos } = usePedidos();
    const updateValues = {
        idPedido : object.idPedido || '',
        nombreCliente : object.idClienteNavigation.nombre || '',
        idEstado : object.idEstadoNavigation.nombre || '',
        fechaPedido : object.fechaPedido || '',
        fechaEntrega : object.fechaEntrega || ''

    };
    console.log(object.idPedido)
    return (
        <>
            <Formik
                initialValues={updateValues}
                validate={(values) => validateInputs(values)}
                onSubmit={(values, { resetForm }) => {
                    const convertedValue = values.estado === 'true'; 
                    const updatedValues = {
                        ...values,
                        estado: convertedValue,
                    };

                    updatePedidos(object.idPedido, updatedValues).then(response => {
                        resetForm();
                        showAlertCorrect('Pedido editado correctamente', 'success', isClose)
                        console.log(response);
                    }).catch(response => {
                        showAlertIncorrect('No se pudo editar el pedido', 'error', isClose);
                        console.log(response);
                    })
                }}
            >
                {({ errors, handleSubmit, touched }) => (

                    <form  onSubmit={ handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Editar pedido</ModalHeader>
                            <ModalBody>
                                <Label className="mt-4">                                
                                    <CustomInput
                                        type="text"
                                        id="cliente"
                                        name="cliente"
                                        placeholder="Cliente ejemplo"
                                    />
                                    {touched.cliente && errors.cliente && <SpanError>{errors.cliente}</SpanError>}
                                </Label>

                                <Label className="mt-4">
                                    <span>Fecha Entrega</span>
                              
                                    <CustomInput
                                        type="date"
                                        id="fechaEntrega"
                                        name="fechaEntrega"
                                        placeholder=""
                                    />
                                    {touched.fechaEntrega && errors.fechaEntrega && <SpanError>{errors.fechaEntrega}</SpanError>}


                                </Label>                               
                                <Label className="mt-4">
                                    <span>Estado</span>
                                    <Select>
                                        <option>Recibido</option>
                                        <option>En produccion</option>
                                        <option>Devuelto</option>
                                        <option>Entregado</option>
                                    </Select>
                                </Label>

                                <Button className="mb-4 mt-4" onClick={openModalCrearProducto}>
                                    Agregar producto
                                    <span className="mb-1" aria-hidden="true">
                                        +
                                    </span>
                                </Button>
                                <ModalCrearProducto  isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} />

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
                                                {detallePedidos.map((detallePedido, i) => (
                                                    <TableRow key={i}>
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
                                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idEmpleadoNavigation.nombre}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.motivoDevolucion}</p>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center space-x-4">
                                                                <Button layout="link" size="icon" aria-label="Edit" >
                                                                    <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido)}/>
                                                                </Button>
                                                                
                                                                <Button layout="link" size="icon" aria-label="Delete" onClick={() => alertaEliminado(detallePedido.id)}>
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
                                    <Button onClick={handleSubmit}>Enviar</Button>
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
                )}
            </Formik>
            {modalIsOpenEditarProducto && (
                <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} object={dataDetallePedido} />
            )}
            
        </>
    );
}
