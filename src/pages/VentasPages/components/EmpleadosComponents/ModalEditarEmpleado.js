import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik, Field } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import {SpanError} from '../../../../components/styles/styles';
import {initialValues, validationSchemes, validateInputs} from './EmpleadosFormValidations/EmpleadosFormik';


export const ModalEditarEmpleado = ({ isOpen, isClose }) => {



    return (
        <Formik
            initialValues={initialValues}

            validate={(values) => validateInputs(values, validationSchemes)}

            onSubmit={(valores) => {

            }}
        >
            {({errors, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                <Modal isOpen={isOpen} onClose={isClose}>
                    <ModalHeader className='mb-3'>Editar empleado</ModalHeader>
                    <ModalBody>
                        <Label className="mt-4">
                            <span>Rol</span>
                            <Select className="mt-1">
                                <option>Seleccionar...</option>
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
                                {errors.nombre && <SpanError>El campo Nombre es obligatorio</SpanError>}
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
                            <Button type="submit">Enviar</Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large" type='submit'>
                                Accept
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </form>
            )}
            
        </Formik>
    )
}
