import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { ValidateInputs } from './ClientesFormValidations/ClientesFormik';
import { useClientes } from '../../../../services/hooks/useClientes';

export const ModalEditarCliente = ({ isOpen, isClose, object }) => {

    const { updateClientes } = useClientes();
    const initialValues = {
        idCliente: object.idCliente,
        nombre: object.nombre || '',
        apellido: object.apellido || '',
        documento: object.documento || '',
        telefono: object.telefono || '',
        estado: object.estado ? true : false
    };

    const estados = [
        { value: '', label: 'Seleccione un estado' },
        { value: true, label: 'Activo' },
        { value: false, label: 'Inactivo' }
    ];

    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => ValidateInputs(values)}
            onSubmit={(values, { resetForm }) => {
                const convertedValue = values.estado === 'true';

                const updatedValues = {
                    ...values,
                    documento: values.documento.toString(),
                    estado: convertedValue,
                };
                updateClientes(object.idCliente, updatedValues).then(response => {
                    resetForm();
                    showAlertCorrect('Cliente editado correctamente', 'success', isClose)
                    // setTimeout(() => {
                    //     window.location.reload();
                    // }, 1000);
                }).catch(response => {
                    showAlertIncorrect('No se pudo editar el cliente', 'error', isClose);
                })
            }}>
            {({ errors, handleSubmit, touched }) => (
                <form onSubmit={handleSubmit}>
                    <Modal isOpen={isOpen} onClose={isClose}>
                        <ModalHeader className='mb-3'>Editar cliente</ModalHeader>
                        <ModalBody>
                            <Label className="mt-4">
                                <span>Nombre</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        placeholder=""
                                    />
                                    {touched.nombre && errors.nombre && <SpanError>{errors.nombre}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Apellidos</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="apellido"
                                        name="apellido"
                                        placeholder="Zuluaga Muñoz"
                                    />
                                    {touched.apellido && errors.apellido && <SpanError>{errors.apellido}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Documento</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="number"
                                        id="documento"
                                        name="documento"
                                        placeholder="1234567"
                                    />
                                    {touched.documento && errors.documento && <SpanError>{errors.documento}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Teléfono</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        placeholder="3004838916"
                                    />
                                    {touched.telefono && errors.telefono && <SpanError>{errors.telefono}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Estado</span>
                                <CustomInput
                                    type="select"
                                    id="estado"
                                    name="estado"
                                    options={estados}
                                />
                            </Label>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hidden sm:block">
                                <Button layout="outline" onClick={isClose}>
                                    Cancelar
                                </Button>
                            </div>
                            <div className="hidden sm:block">
                                <Button type="button" onClick={() => handleSubmit()}>Enviar</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </form>
            )}
        </Formik>
    )
};