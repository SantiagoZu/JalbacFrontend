import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalEditarProducto = ({ isOpen, isClose }) => {

    const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
    const [peso, cambiarPeso] = useState({ campo: '', valido: null });
    const [tamanoAnillo, cambiarTamanoAnillo] = useState({ campo: '', valido: null });
    const [tamanoPiedra, cambiarTamanoPiedra] = useState({ campo: '', valido: null });
    const [detalle, cambiarDetalle] = useState({ campo: '', valido: null });
    const [motivoDevolucion, cambiarMotivoDevolucion] = useState({ campo: '', valido: true, desactivado: true });

    const validacionFormularioEditarProducto = (e) => {
        e.preventDefault();
        if (nombre.valido && peso.valido && tamanoAnillo.valido && tamanoPiedra.valido && detalle.valido && motivoDevolucion.valido === 'true') {


            cambiarFormularioValidoEditarProducto(true);
            cambiarNombre({ campo: '', valido: null });
            cambiarPeso({ campo: '', valido: null });
            cambiarTamanoAnillo({ campo: '', valido: null });
            cambiarTamanoPiedra({ campo: '', valido: null });
            cambiarDetalle({ campo: '', valido: null });
            cambiarMotivoDevolucion({ campo: '', valido: true });



            alertEditadoCorrecto("Producto editado");

        } else {
            cambiarFormularioValidoEditarProducto(false);
            alertEditadoIncorrecto();
        }
    }

    return (
        <>
            <form action='' onSubmit={validacionFormularioEditarProducto}>
                <Modal isOpen={isModalOpenEditarProducto} onClose={closeModalEditarProducto}>
                    <ModalHeader className='mb-3'>Editar producto</ModalHeader>
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
                            <span>Peso</span>
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
                            <span>Detalles</span>
                            <Input2 placeholder={"ingrese detalles"} className="mt-1" estado={detalle} type={"text"} cambiarEstado={cambiarDetalle} expresionRegular={expresionesProducto.detalle} mensajeError={"el texto no puede  contener mas de 100 caracteres"} />
                        </Label>
                        <Label className="mt-4">
                            <span>Asignar empleado</span>
                            <Select>
                                <option>Josue</option>
                                <option>Barreto</option>
                                <option>Portela</option>
                            </Select>
                        </Label>
                        <Label className="mt-4">
                            <span >Estado</span>
                            <Select className="mt-1" onChange={(dato) => {
                                if (dato.target.value == "Devuelto") {
                                    alertDevuelto("producto", "editarProducto")

                                }
                                else {
                                    cambiarMotivoDevolucion({ campo: '', valido: "true", desactivado: true });
                                }
                            }}>
                                <option>En produccion</option>
                                <option >Devuelto</option>
                                <option>Entregado</option>
                            </Select>
                        </Label>
                        <label className="block text-sm text-gray-700 dark:text-gray-400" >
                            <span>Motivo devolucion</span>
                            <Input2 placeholder={"ingrese motivo"} className="mt-1" estado={motivoDevolucion} type={"text"} cambiarEstado={cambiarMotivoDevolucion} expresionRegular={expresionesProducto.motivoDevolucion} mensajeError={"el texto no puede  contener mas de 100 caracteres"} desactivado={motivoDevolucion.desactivado} />
                        </label>


                    </ModalBody>

                    <ModalFooter>
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={closeModalEditarProducto}>
                                Cancelar
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={validacionFormularioEditarProducto}>Editar producto</Button>
                        </div>

                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={closeModalEditarProducto}>
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

