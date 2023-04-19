import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalCrearCliente = ({ isOpen, isClose }) => {

    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [apellido, cambiarApellido] = useState({ campo: '', valido: null });
    const [documento, cambiarDocumento] = useState({ campo: '', valido: null });
    const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const ValidacionFormulario = (e) => {
        e.preventDefault();
        if (nombre.valido === 'true' && apellido.valido === 'true' && documento.valido === 'true' && correo.valido === 'true') {

            cambiarFormularioValido(true);
            cambiarNombre({ campo: '', valido: null });
            cambiarApellido({ campo: '', valido: null });
            cambiarDocumento({ campo: '', valido: null });
            cambiarCorreo({ campo: '', valido: null });

            showAlertCorrect('Editado correctamente', 'success', isClose);
        } else {
            cambiarFormularioValido(false);
            showAlertIncorrect('Digíte el fomulario correctamente', 'error');
        }
    }

    return (
        <>
            <form action="" onSubmit={ValidacionFormulario}>
                <Modal isOpen={isOpen} onClose={isClose}>
                    <ModalHeader className="mb-3">Registrar cliente</ModalHeader>
                    <ModalBody>
                        

                        <Label className="mt-4">
                            <span>Nombre</span>
                            <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <Input2 placeholder="Nombre" type="text" estado={nombre} cambiarEstado={cambiarNombre} expresionRegular={expresiones.nombre} mensajeError={"El nombre no puede incluir números"} />
                            </div>
                        </Label>
                        <Label className="mt-4">
                            <span>Apellido</span>
                            <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <Input2 placeholder="Apellido" type="text" estado={apellido} cambiarEstado={cambiarApellido} expresionRegular={expresiones.nombre} mensajeError={"El apellido no puede incluir números"} />
                            </div>
                        </Label>
                        <Label className="mt-4">
                            <span>Documento</span>
                            <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <Input2 placeholder="Documento" type="number" estado={documento} cambiarEstado={cambiarDocumento} expresionRegular={expresiones.documento} mensajeError={"Digíte el documento correctamente"} />
                                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                </div>
                            </div>
                        </Label>
                        <Label className="mt-4">
                            <span>Correo</span>
                            <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                                <Input2 placeholder="Correo" type="email" estado={correo} cambiarEstado={cambiarCorreo} expresionRegular={expresiones.correo} mensajeError={"Debe incluir simbolo @ y el dominio. Ejemplo: example@gmail.com"} />
                                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                                </div>
                            </div>
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
                            <Button onClick={ValidacionFormulario}>Enviar</Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </form>
        </>
    );
}
