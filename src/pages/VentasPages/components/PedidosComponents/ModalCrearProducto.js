import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalCrearProducto = ({ isOpen, isClose }) => {

    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [peso, cambiarPeso] = useState({ campo: '', valido: null });
    const [tamanoAnillo, cambiarTamanoAnillo] = useState({ campo: '', valido: null });
    const [tamanoPiedra, cambiarTamanoPiedra] = useState({ campo: '', valido: null });
    const [detalle, cambiarDetalle] = useState({ campo: '', valido: null });
    const [motivoDevolucion, cambiarMotivoDevolucion] = useState({ campo: '', valido: true, desactivado: true });

    const validacionFormularioProducto = (e) => {
        e.preventDefault();
        if (nombre.valido === 'true' && peso.valido === 'true' && tamanoAnillo.valido === 'true' && tamanoPiedra.valido === 'true' && detalle.valido === 'true') {

            cambiarFormularioValidoProducto(true);
            cambiarNombre({ campo: '', valido: null });
            cambiarPeso({ campo: '', valido: null });
            cambiarTamanoAnillo({ campo: '', valido: null });
            cambiarTamanoPiedra({ campo: '', valido: null });
            cambiarDetalle({ campo: '', valido: null });
            cambiarMotivoDevolucion({ campo: '', valido: true, desactivado: true });
            alertEditadoCorrecto("Producto agregado");

        } else {
            cambiarFormularioValidoProducto(false);
            alertEditadoIncorrecto();
        }
    }
    return (
        <>
            <form action='' onSubmit={validacionFormularioProducto}>
                <Modal isOpen={isModalOpenProducto} onClose={closeModalProducto}>
                    <ModalHeader className='mb-3'>Agregar producto</ModalHeader>
                    <ModalBody>
                        <Label className="mt-4">
                            <span>Nombre</span>
                            <Input2 placeholder={"ingrese un nombre"} className="mt-1" estado={nombre} type={"text"} cambiarEstado={cambiarNombre} expresionRegular={expresionesProducto.nombre} mensajeError={"El nombre no puede tener caracteres especiales"} />
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
                            <Input2 placeholder={"ingrese un peso en gramos"} className="mt-1" estado={peso} type={"number"} cambiarEstado={cambiarPeso} expresionRegular={expresionesProducto.peso} mensajeError={"No puede ingresar letras"} />
                        </Label>
                        <Label className="mt-4">
                            <span>Tamaño anillo</span>
                            <Input2 placeholder={"ingrese un numero"} className="mt-1" estado={tamanoAnillo} type={"number"} cambiarEstado={cambiarTamanoAnillo} expresionRegular={expresionesProducto.tamanoAnillo} mensajeError={"La medida no puede tener letras"} />
                        </Label>
                        <Label className="mt-4">
                            <span>Tamaño piedra</span>
                            <Input2 placeholder={"ingrese un numero en mm"} className="mt-1" estado={tamanoPiedra} type={"number"} cambiarEstado={cambiarTamanoPiedra} expresionRegular={expresionesProducto.tamanoPiedra} mensajeError={"el numero no puede tener letras"} />
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
                            <Input2 placeholder={"ingrese detalles"} className="mt-1" estado={detalle} type={"text"} cambiarEstado={cambiarDetalle} expresionRegular={expresionesProducto.detalle} mensajeError={"el texto no puede ser contener mas de 100 caracteres"} />
                        </Label>

                    </ModalBody>

                    <ModalFooter>
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={closeModalProducto}>
                                Cancelar
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={validacionFormularioProducto}>Agregar producto</Button>
                        </div>

                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={closeModalProducto}>
                                Cancel
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large">
                                Accept
                            </Button>
                        </div>
                    </ModalFooter>
                </Modal>
            </form>
        </>
    );
}
