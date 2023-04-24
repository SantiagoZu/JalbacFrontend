import React, { useState, useEffect } from 'react'
import { Label, Select} from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect} from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './EmpleadosFormValidations/EmpleadosFormik';

export const ModalEditarEmpleado = ({ isOpen, isClose }) => {

    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => validateInputs(values)}
            onSubmit={(valores, { resetForm }) => {
                resetForm();
                showAlertCorrect('Empleado editado correctamente', 'success', isClose)
            }}
        >
            {({ errors, handleSubmit, touched }) => (
                <form onSubmit={handleSubmit}>
                    <Modal isOpen={isOpen} onClose={isClose}>
                        <ModalHeader className='mb-3'>Editar empleado</ModalHeader>
                        <ModalBody>
                            <Label className="mt-4">
                                <span>Rol</span>
                                <Select className="mt-1">
                                    <option hidden>Seleccionar...</option>
                                    <option>Administrador</option>
                                    <option>Empleado</option>
                                </Select>
                            </Label>
                            <Label className="mt-4">
                                <span>Nombre</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Santiago Zuluaga"
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
                                <span>Correo</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="email"
                                        id="correo"
                                        name="correo"
                                        placeholder="email@email.com"
                                    />
                                    {touched.correo && errors.correo && <SpanError>{errors.correo}</SpanError>}
                                </div>
                            </Label>
                            <Label className="mt-4">
                                <span>Cargo</span>
                                <Select className="mt-1">
                                    <option hidden>Seleccionar...</option>
                                    <option>Vaceador</option>
                                    <option>Impresor 3D</option>
                                </Select>
                            </Label>
                            <Label className="mt-4">
                                <span>Estado</span>
                                <Select className="mt-1">
                                    <option>Activo</option>
                                    <option>Inactivo</option>
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
                                <Button type="button" onClick={handleSubmit}>Enviar</Button>
                            </div>
                        </ModalFooter>
                    </Modal>
                </form>
            )}
        </Formik>
    )
}
