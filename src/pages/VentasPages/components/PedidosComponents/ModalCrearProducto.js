import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresionesProducto } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput, CustomInputDropDown } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues,  validateInputsAgregarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
export const ModalCrearProducto = ({ isOpen, isClose }) => {
    const { postDetallePedidos, getDetallePedidos } = useDetallePedidos();
    const tipos = [
        { value: '', label: 'Seleccione un tipo de anillo' },
        { value: '3D',label: '3D' },
        { value: 'A mano', label: 'A mano' },
        { value: 'Vaceado', label: 'Vaceado' },
    ];
    
    return (
        <>
         <Formik
                initialValues={initialValues}
                validate={(values) => validateInputsAgregarProducto(values)}
                onSubmit={(values, { resetForm }) => {
                    const convertedValue = values.estado === 'true'; // Cambiar a booleano  
                    const updatedValues = {
                    ...values,
                    estado: convertedValue,
                    };

                    console.log(updatedValues);
                    postDetallePedidos(updatedValues).then(response => {
                        resetForm();
                        showAlertCorrect('Producto creado correctamente', 'success', isClose)
                        console.log(response);
                    }).catch(response => {
                        showAlertIncorrect('No se pudo crear el producto', 'error', isClose);
                        console.log(response);
                    });
                    resetForm();
                    getDetallePedidos();
                }}
        >
            {({ errors, handleSubmit, touched }) => (

                <form  onSubmit={handleSubmit}>
                    <Modal isOpen={isOpen} onClose={isClose}>
                        <ModalHeader className='mb-3'>Agregar producto</ModalHeader>
                        <ModalBody>
                            <Label className="mt-4">
                                <span>Nombre</span>               
                                <CustomInput
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre ejemplo"
                                />
                                {touched.nombre && errors.nombre && <SpanError>{errors.nombre}</SpanError>}
                            </Label>
                            <Label className="mt-4">
                                <span>Tipo</span>
                                <CustomInputDropDown
                                    type="select"
                                    id="estado"
                                    name="estado"
                                    options={tipos}
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
                            <Label className="mt-4">
                                <span>Material</span>
                                <Select className="mt-1">
                                    <option>Oro</option>
                                    <option>Oro rosado</option>
                                    <option>Plata</option>
                                </Select>
                            </Label>
                            <Label className="mt-4">
                                <span>Detalle</span>        
                                <CustomInput
                                    type="text"
                                    id="detalle"
                                    name="detalle"
                                    placeholder="12 1/2"
                                />
                                {touched.detalle && errors.detalle && <SpanError>{errors.detalle}</SpanError>}
                            </Label>

                        </ModalBody>

                        <ModalFooter>
                            <div className="hidden sm:block">
                                <Button layout="outline" onClick={isClose}>
                                    Cancelar
                                </Button>
                            </div>
                            <div className="hidden sm:block">
                                <Button onClick={handleSubmit}>Agregar producto</Button>
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
