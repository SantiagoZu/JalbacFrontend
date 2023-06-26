import React, { useState, useEffect } from 'react'
import { ModalCrearProducto } from './ModalCrearProducto';
import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
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
import { Field, Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './PedidosFormValidations/PedidosFormik';

import { usePedidos } from '../../../../services/hooks/usePedidos'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
const responseProducto = response.concat([])



export const ModalCrearPedido = ({ isOpen, isClose }) => {
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

    const [dataDetallePedido, setDataDetallePedidos] = useState([]);
    const {detallePedidos, deleteDetallePedidos } = useDetallePedidos();
 
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
        showAlertDeleted('¿Estás seguro que deseas eliminar el empleado?', 'warning', 'Eliminado correctamente', 'success', () => deleteDetallePedidos(idDetallePedido))
    }
    function setData(obj) {
        setDataDetallePedidos(obj);
    }
  
    const { postPedidos, getPedidos } = usePedidos();
    const empleados = [
        { value: '1', label: 'Seleccione un empleado' },
        { value: '2',label: 'Josue' },
        { value: '3', label: 'Santiago' }
      ];

    return (
        <>
            <Formik
                initialValues={initialValues}
                validate={(values) => validateInputs(values)}
                onSubmit={(values, { resetForm }) => {
                    
                    const updatedValues = {
                    ...values,                 
                    };

                    console.log(updatedValues);
                    postPedidos(updatedValues).then(response => {
                        resetForm();
                        showAlertCorrect('Pedido creado correctamente', 'success', isClose)
                        console.log(response);
                    }).catch(response => {
                        showAlertIncorrect('No se pudo crear el pedido', 'error', isClose);
                        console.log(response);
                    });
                    resetForm();
                    getPedidos();
                    
                    showAlertCorrect('Pedido agregado correctamente', 'success', isClose)
                }}
            >
                {({ errors, handleSubmit, touched }) => (

                    <form  onSubmit={ handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Agregar pedido</ModalHeader>
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
                                    <Field
                                        type="Text"
                                        id="estadoPedido"
                                        disabled={true}
                                        placeholder="Recibido"
                                        value = "Recibido"
                                        className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                    />
                                </Label>

                                <Button className="mb-4 mt-4" onClick={openModalCrearProducto}>
                                    Agregar producto
                                    <span className="mb-1" aria-hidden="true">+</span>
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
                                                                
                                                                <Button layout="link" size="icon" aria-label="Delete" onClick={() => alertaEliminado(detallePedido.idDetallePedido)}>
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
                <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} object={dataDetallePedido}/>
            )}                                        
            
        </>
    );
}
