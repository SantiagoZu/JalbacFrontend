import React, { useState, useEffect } from 'react'
import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputsEditarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../../../services/hooks/useEmpleados';
import { useEstados } from '../../../../services/hooks/useEstados'

export const ModalEditarProducto = ({ isOpen, isClose, product, updateTable = undefined, idProducto = undefined }) => {
    let updateValues
  
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
        { value: null, label: 'Elija el empleado' }
        
    ]
   
    for (const id in empleados) {
        const empleado = {
            value: parseInt(empleados[id].idEmpleado),
            label: empleados[id].nombre
        }
           
        empleadosDropdown.push(empleado)
    }
    const tiposDropDown = [
        { value: null, label: 'Seleccione un tipo de anillo' },
        { value: '3D', label: '3D' },
        { value: '3D', label: '3D' },
        { value: 'A mano', label: 'A mano' },
        { value: 'Vaceado', label: 'Vaceado' },
    ];
    const materialDropDown = [
        { value: null, label: 'Seleccione un material' },
        { value: 'oroRosado', label: 'Oro rosado' },
        { value: 'oroRosado', label: 'Oro rosado' },
        { value: 'oro', label: 'Oro' },
        { value: 'plata', label: 'Plata' },
    ];
    const { estados } = useEstados()
    
    const estadosDropdown = [
        { value: '', label: 'Elija el estado' }
        
    ]
    for (const id in estados) {
        const estado = {
            value: parseInt(estados[id].idEstado),
            label: estados[id].nombre
        }      
        estadosDropdown.push(estado)
    }
    return (
        <>
            <Formik
                initialValues={updateValues}
                validate={values => validateInputsEditarProducto(values)}
                onSubmit={(values, { resetForm }) => {
                    const updatedValues = {
                        ...values,
                        idDetallePedido : product.idDetallePedido,
                        idPedido : product.idPedido,
                        idEstado : product.idEstado,
                        motivoDevolucion : ''
                    };
                    if (product.idDetallePedido === undefined) { // uso este modal desde la vista Crear pedido
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
                            idEmpleado : values.idEmpleado || '',
                            idEstado : 1,                       
                            motivoDevolucion: '',                    
                        }
                        showAlertCorrect('El producto ha sido editado' , 'success', isClose)
                        updateTable(updatedValuesTable)
                      
                    }
                    else { //uso la vista desde Editar pedido
                        updateDetallePedidos(product.idDetallePedido, updatedValues).then(response => {
                            resetForm();                            
                            showAlertCorrect('Producto editado correctamente', 'success', isClose)
                           
                        }).catch(response => {
                            showAlertIncorrect('No se pudo editar el producto', 'error', isClose);
                           
                        })
                    }

                    console.log(updatedValues)
                }}
            >
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
                 
            </Formik>
        </>
    );
}

