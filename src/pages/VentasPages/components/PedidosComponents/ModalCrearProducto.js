import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresionesProducto } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues,  validateInputsAgregarProducto } from './PedidosFormValidations/ProductosFormik';

export const ModalCrearProducto = ({ isOpen, isClose }) => {

    return (
        <>
         <Formik
                initialValues={initialValues}
                validate={(values) => validateInputsAgregarProducto(values)}
                onSubmit={(valores, { resetForm }) => {
                    resetForm();
                    showAlertCorrect('Producto agregado correctamente', 'success', isClose)
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
                                <Select className="mt-1">
                                    <option>3D</option>
                                    <option>A mano</option>
                                    <option>Vaceado</option>
                                </Select>
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
