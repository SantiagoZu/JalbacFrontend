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
import { useClientes } from '../../../../services/hooks/useClientes'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import id from 'faker/lib/locales/id_ID';

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
    const { detallePedidos, deleteDetallePedidos, getDetallePedidos } = useDetallePedidos();

    function openModalCrearProducto() {
        setModalIsOpenCrearProducto(true);
    }

    function closeModalCrearProducto() {
        setModalIsOpenCrearProducto(false);
    }


    function openModalEditarProducto(obj) {
        setModalIsOpenEditarProducto(true);
        setData(obj)
    }

    function closeModalEditarProducto() {
        setModalIsOpenEditarProducto(false);
    }
    function setData(obj) {
        setDataDetallePedidos(obj);
    }
    function showEliminarDetallePedido(idDetallePedido) {
        showAlertDeleted(
            '¿Estás seguro que deseas eliminar este producto?',
            'warning',
            'Eliminado correctamente',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                deleteDetallePedidos(idDetallePedido)
                    .then(response => {
                        showAlertCorrect('Producto eliminado correctamente.', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch(response => {
                        showAlertIncorrect('Error al eliminar el producto.', 'error');
                        console.log(response)
                    });
            }
        });
    }

    const { postPedidos, getPedidos } = usePedidos();
    const { clientes } = useClientes()
    const clientesDropdown = [
        { value: '', label: 'Elija el cliente' }
    ]
    for (const id in clientes) {
        const cliente = {
            value: parseInt(clientes[id].idCliente),
            label: clientes[id].nombre
        }
        clientesDropdown.push(cliente)
    }
    const [idPedidoActual, setIdPedidoActual] = useState('')
    function changeIdPedidoActual(id) {
        setIdPedidoActual(id)
    }

    const [tableProducts, setTableProducts] = useState([])
    const [createPedidoOnce, setCreatePedidoOnce] = useState(null)
    useEffect(() => {
        setCreatePedidoOnce(true)
    }, [])   
    function getDataFromChild(product) {              
        setTableProducts([
            ...tableProducts,
            product
            ]
        )
    }
    
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
                    let responseCrearPedido = postPedidos(updatedValues).then((response) => {
                        resetForm();

                        changeIdPedidoActual(response.data.resultado.idPedido)

                        openModalCrearProducto()
                        return response

                    }).catch(response => {
                        showAlertIncorrect('No se pudo crear el pedido', 'error', isClose);
                        console.log(updatedValues)
                        console.log(response);
                    });
                    resetForm();
                    getPedidos();

                }}
            >
                {({ errors, handleSubmit, touched }) => (

                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Agregar pedido</ModalHeader>
                            <ModalBody>
                                <Label className="mt-4">
                                    <CustomInput
                                        type="select"
                                        id="idCliente"
                                        name="idCliente"
                                        placeholder="Cliente ejemplo"
                                        options={clientesDropdown}
                                    />

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
                                        id="idEstado"
                                        name="idEstado"
                                        disabled={true}
                                        placeholder={1}
                                        value={1}
                                        className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                                    />
                                </Label>

                                <Button className="mb-4 mt-4" onClick={() => {
                                    if (createPedidoOnce) {
                                        handleSubmit()
                                        setCreatePedidoOnce(false)
                                    } else {

                                        openModalCrearProducto()
                                        getPedidos()
                                    }

                                }}>
                                    Agregar producto
                                    <span className="mb-1" aria-hidden="true">+</span>
                                </Button>


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
                                                {tableProducts.length > 0 ?
                                                    tableProducts.map((detallePedido, i) => (
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
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.cantidad}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idEmpleado}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.motivoDevolucion}</p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex items-center space-x-4">
                                                                    <Button layout="link" size="icon" aria-label="Edit" >
                                                                        <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido)} />
                                                                    </Button>

                                                                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => showEliminarDetallePedido(parseInt(detallePedido.idDetallePedido))}>
                                                                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>


                                                        </TableRow>
                                                    )
                                                    ) : null}
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
                                    <Button onClick={() => showAlertCorrect('Pedido creado correctamente', 'success', isClose)}>Enviar</Button>
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
            {modalIsOpenCrearProducto && (
                <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedidoActual} updateTable={(product) => getDataFromChild(product)} />
            )}
            {modalIsOpenEditarProducto && (
                <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} object={dataDetallePedido} />
            )}

        </>
    );
}
