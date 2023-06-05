import React, { useState, useEffect } from 'react'
import { Label, Select } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateInputs } from './ClientesFormValidations/ClientesFormik';
import { useClientes } from '../../../../services/hooks/UseClientes';

export const ModalEditarCliente = ({ isOpen, isClose, object }) => {

    const { updateClientes } = useClientes();
    const updateValues = {
        idCliente: object.idCliente,
        nombre: object.nombre || '',
        apellido: object.apellido || '',
        documento: object.documento || '',
        telefono: object.telefono || '',
        estado: object.estado || ''
    };

    console.log(object.idCliente)
    return (
        <Formik
            initialValues={updateValues}
            validate={(values) => validateInputs(values)}
            onSubmit={(values, { resetForm }) => {
                const convertedValue = values.estado === 'true'; // Cambiar a booleano

                const updatedValues = {
                    ...values,
                    estado: convertedValue,
                };

                updateClientes(object.idCliente, updatedValues).then(response => {
                    resetForm();
                    showAlertCorrect('Empleado editado correctamente', 'success', isClose)
                    console.log(response);
                }).catch(response => {
                    showAlertIncorrect('No se pudo editar el empleado', 'error', isClose);
                    console.log(response);
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
                                <Select className="mt-1">
                                    <option value={true}>Activo</option>
                                    <option value={false}>Inactivo</option>
                                </Select>
                            </Label>
                        </ModalBody>
                        <ModalFooter>
                            <div className="hidden sm:block">
                                <Button layout="outline" onClick={isClose}>
                                    Cancelar
                                </Button>
                            </div>
                            <div className="hidden sm:block">
                                <Button type="button" onClick={() => handleSubmit()}>Guardar cambios</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </form>
            )}
        </Formik>
    )
};