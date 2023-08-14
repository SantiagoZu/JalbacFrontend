import React, { useState } from 'react'
import { Label } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValues, validateInputs } from './ClientesFormValidations/ClientesFormik';
import { useClientes } from '../../../../services/hooks/useClientes';

export const ModalCrearCliente = ({ isOpen, isClose }) => {

    const { postClientes, getClientes, validacionDocumento } = useClientes();
    const [documentoError, setDocumentoError] = useState('');
    return (
        <Formik
            initialValues={initialValues}
            validate={(values) => validateInputs(values)}
            onSubmit={(values, { resetForm }) => {

                const updatedValues = {
                    ...values,
                    estado: true,
                };  

                postClientes(updatedValues).then(response => {
                    resetForm();
                    showAlertCorrect('Empleado creado correctamente', 'success', isClose)
                    // window.location.reload();
                }).catch(response => {
                    showAlertIncorrect('No se pudo crear el empleado', 'error', isClose);
                });
                resetForm();
                getClientes();
            }}>
            {({ errors, handleSubmit, touched, setFieldError }) => (
                <form onSubmit={handleSubmit}>
                    <Modal isOpen={isOpen} onClose={isClose}>
                        <ModalHeader className='mb-3'>Crear cliente</ModalHeader>
                        <ModalBody>
                            <Label className="mt-4">
                                <span>Nombre</span>
                                <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                    <CustomInput
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Santiago"
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
                                        type="text"
                                        id="documento"
                                        name="documento"
                                        placeholder="1234567"
                                        onBlur={async (e) => {
                                            const result = await validacionDocumento(e.target.value.toString());
                                            if (result.isExistoso) {
                                                setDocumentoError('Ya existe un cliente con el mismo documento');
                                                setFieldError('documento', 'Ya existe un cliente con el mismo documento');
                                            } else {
                                                setDocumentoError('');
                                                setFieldError('documento', '');
                                            }

                                        }}
                                    />
                                    {touched.documento && errors.documento && <SpanError>{errors.documento}</SpanError>}
                                    {documentoError && <SpanError>{documentoError}</SpanError>}
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
};