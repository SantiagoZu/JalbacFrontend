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

import { expresionesProducto } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import response from '../../../../utils/demo/dataProductos'
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputsEditarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../../../services/hooks/useEmpleados';
import { useEstados } from '../../../../services/hooks/useEstados'
const responseProducto = response.concat([])


export const ModalEditarProducto = ({ isOpen, isClose, product, updateTable = undefined, idProducto = undefined }) => {
    let updateValues
    console.log(product)
    console.log(idProducto)
    if (product.idDetallePedido === undefined) {
        updateValues = {
            nombreAnillido: product.nombreAnillido || '',
            tipo: product.tipo || '',
            peso: product.peso || '',
            tamanoAnillo: product.tamanoAnillo || '',
            tamanoPiedra: product.tamanoPiedra || '',
            material: product.material || '',
            detalle: product.detalle || '',
            cantidad: product.cantidad || '',
            idEmpleado: product.idEmpleado || '',
        };
    }
    else {
        updateValues = {
            idDetallePedido: product.idDetallePedido || '',
            idPedido: product.idPedido || '',
            nombreAnillido: product.nombreAnillido || '',
            tipo: product.tipo || '',
            peso: product.peso || '',
            tamanoAnillo: product.tamanoAnillo || '',
            tamanoPiedra: product.tamanoPiedra || '',
            material: product.material || '',
            detalle: product.detalle || '',
            cantidad: product.cantidad || '',
            idEmpleado: product.idEmpleado || '',
            idEstado: product.idEstado || '',
            motivoDevolucion: product.motivoDevolucion || '',
        };
    }
    const { updateDetallePedidos } = useDetallePedidos();

    const { empleados } = useEmpleados()
    const empleadosDropdown = [
        { value: '', label: 'Elija el empleado' }
        { value: '', label: 'Elija el empleado' }
    ]
    for (const id in empleados) {
    for (const id in empleados) {
        const empleado = {
            value: parseInt(empleados[id].idEmpleado),
            label: empleados[id].nombre
        }
            value: parseInt(empleados[id].idEmpleado),
            label: empleados[id].nombre
        }
        empleadosDropdown.push(empleado)
    }
    const tiposDropDown = [
        { value: '', label: 'Seleccione un tipo de anillo' },
        { value: '3D', label: '3D' },
        { value: '3D', label: '3D' },
        { value: 'A mano', label: 'A mano' },
        { value: 'Vaceado', label: 'Vaceado' },
    ];
    const materialDropDown = [
        { value: '', label: 'Seleccione un material' },
        { value: 'oroRosado', label: 'Oro rosado' },
        { value: 'oroRosado', label: 'Oro rosado' },
        { value: 'oro', label: 'Oro' },
        { value: 'plata', label: 'Plata' },
    ];
    const { estados } = useEstados()
    const { estados } = useEstados()
    const estadosDropdown = [
        { value: '', label: 'Elija el estado' }
        { value: '', label: 'Elija el estado' }
    ]
    for (const id in estados) {
    for (const id in estados) {
        const estado = {
            value: parseInt(estados[id].idEstado),
            label: estados[id].nombre
        }
            value: parseInt(estados[id].idEstado),
            label: estados[id].nombre
        }
        estadosDropdown.push(estado)
    }


    return (
        <>
            <Formik
            <Formik
                initialValues={updateValues}
                validate={() => ({})}
                onSubmit={(values, { resetForm }) => {


                    const updatedValues = {
                        ...values,
                       
                    };

                    if (product.idDetallePedido === undefined) {
                        const updatedValuesTable = {
                            id : idProducto,
                            nombreAnillido: values.nombreAnillido || '',
                            tipo: values.tipo || '',
                            peso: values.peso || '',
                            tamanoAnillo: values.tamanoAnillo || '',
                            tamanoPiedra: values.tamanoPiedra || '',
                            material: values.material || '',
                            detalle: values.detalle || '',
                            cantidad: values.cantidad || '',
                            idEmpleado: values.idEmpleado || '',
                            idEmpleado : values.idEmpleado,
                            idEstado : 1,                       
                            motivoDevolucion: '',
                    
                        }
                        updateTable(updatedValuesTable)
                        console.log(updatedValuesTable)
                    }
                    else {
                        updateDetallePedidos(product.idDetallePedido, updatedValues).then(response => {
                            resetForm();
                            showAlertCorrect('Producto editado correctamente', 'success', isClose)
                            console.log(response);
                        }).catch(response => {
                            showAlertIncorrect('No se pudo editar el producto', 'error', isClose);
                            console.log(response);
                        })
                    }

                    console.log(updatedValues)
                }}
            >
                {({ errors, handleSubmit, touched }) => (
                {({ errors, handleSubmit, touched }) => (

                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Editar producto</ModalHeader>
                            <ModalBody>
                                <div className='flex gap-5'>
                                    <div className='flex-auto'>
                                        <Label className="mt-4">
                                            <span>Nombre</span>
                                            <CustomInput
                                                type="text"
                                                id="nombreAnillido"
                                                name="nombreAnillido"
                                                placeholder="nombre ejemplo"
                                            />
                                            {touched.nombreAnillido && errors.nombreAnillido && <SpanError>{errors.nombreAnillido}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tipo</span>
                                            <CustomInput
                                                type="select"
                                                id="tipo"
                                                name="tipo"
                                                options={tiposDropDown}
                                            />
                                        </Label>
                                        <Label className="mt-4">
                                            <span>peso</span>
                                            <CustomInput
                                                type="text"
                                                id="peso"
                                                name="peso"
                                                placeholder="12gr"
                                            />
                                            {touched.peso && errors.peso && <SpanError>{errors.peso}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño anillo</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoAnillo"
                                                name="tamanoAnillo"
                                                placeholder="12 1/2"
                                            />
                                            {touched.tamanoAnillo && errors.tamanoAnillo && <SpanError>{errors.tamanoAnillo}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño piedra</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoPiedra"
                                                name="tamanoPiedra"
                                                placeholder="12 1/2"
                                            />
                                            {touched.tamanoPiedra && errors.tamanoPiedra && <SpanError>{errors.tamanoPiedra}</SpanError>}
                                        </Label>
                                        <Label className="mt-5">
                                            <span>Material</span>
                                            <CustomInput
                                                type="select"
                                                id="material"
                                                name="material"
                                                options={materialDropDown}
                                            />
                                        </Label>
                                    </div>
                                    <div className='flex-auto'>

                                        <Label className="mt-5">
                                            <span>Detalle</span>
                                            <CustomInput
                                                type="text"
                                                id="detalle"
                                                name="detalle"
                                                placeholder="12 1/2"
                                            />
                                            {touched.detalle && errors.detalle && <SpanError>{errors.detalle}</SpanError>}
                                        </Label>
                                        <Label className="mt-5">
                                            <span>Cantidad</span>
                                            <CustomInput
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"
                                                placeholder="2"
                                            />
                                            {touched.cantidad && errors.cantidad && <SpanError>{errors.cantidad}</SpanError>}
                                        </Label>
                                        <Label className="mt-5">
                                            <span>Asignar empleado</span>
                                            <CustomInput
                                                type="select"
                                                id="idEmpleado"
                                                name="idEmpleado"
                                                options={empleadosDropdown}
                                            />
                                        </Label>
                                       
                                        
                                    </div>
                                </div>



                            </ModalBody>
                            </ModalBody>

                            <ModalFooter>
                                <div className="hidden sm:block">
                                    <Button layout="outline" onClick={isClose}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className="hidden sm:block">
                                    <Button onClick={handleSubmit}>Editar producto</Button>
                                </div>
                            <ModalFooter>
                                <div className="hidden sm:block">
                                    <Button layout="outline" onClick={isClose}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className="hidden sm:block">
                                    <Button onClick={handleSubmit}>Editar producto</Button>
                                </div>

                                <div className="block w-full sm:hidden">
                                    <Button block size="large" layout="outline" onClick={isClose}>
                                        Cancel
                                    </Button>
                                </div>
                                <div className="block w-full sm:hidden">
                                    <Button block size="large" layout="outline" onClick={isClose}>
                                        Cancel
                                    </Button>
                                </div>

                            </ModalFooter>
                        </Modal>
                    </form>
                )}
                            </ModalFooter>
                        </Modal>
                    </form>
                )}
            </Formik>
        </>
    );
}

