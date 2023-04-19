import React, { useState, useEffect } from 'react'

import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { Input2 } from '../../../../components/Input';
import Swal from 'sweetalert2'

import { expresiones } from '../../../../helpers/validacionesRegex';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';

export const ModalEditarPedido = ({ isOpen, isClose }) => {

    const [cliente, cambiarCliente] = useState({ campo: '', valido: null });
    const [fechaPedido, cambiarFechaPedido] = useState({ campo: `${year}-${month}-${day}`, valido: null });

    const [clienteEditarPedido, cambiarClienteEditarPedido] = useState({ campo: '', valido: null });
    const [motivoDevolucionEditarPedido, cambiarMotivoDevolucionEditarPedido] = useState({ campo: '', valido: true, desactivado: true });
    const [fechaPedidoEditar, cambiarFechaPedidoEditar] = useState({ campo: `${year}-${month}-${day}`, valido: null });

    const [formularioValido, cambiarFormularioValido] = useState(null);
    const [formularioValidoProducto, cambiarFormularioValidoProducto] = useState(null);
    const [formularioValidoEditarProducto, cambiarFormularioValidoEditarProducto] = useState(null);

    const validacionFormularioEditarPedido = (e) => {
        e.preventDefault();
        if (clienteEditarPedido.valido === 'true' && fechaPedidoEditar.valido === "true" && motivoDevolucionEditarPedido.valido === "true") {

            cambiarFormularioValido(true);
            cambiarCliente({ campo: '', valido: null });


            alertEditadoCorrecto("Pedido agregado");

        } else {
            cambiarFormularioValido(false);
            alertEditadoIncorrecto();
        }
    }

    return (
        <>
            <form action='' onSubmit={validacionFormularioEditarPedido}>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalHeader className='mb-3'>Editar pedido</ModalHeader>
                    <ModalBody>
                        <Label className="mt-4">
                            <span>Cliente</span>
                            <Input2 placeholder={"ingrese un cliente"} className="mt-1" estado={clienteEditarPedido} type={"text"} cambiarEstado={cambiarClienteEditarPedido} expresionRegular={expresionesEditarPedido.clienteEditarPedido} mensajeError={"El nombre no puede tener numeros"} />
                        </Label>
                        <Label className="mt-4">
                            <span>Fecha Entrega</span>

                            <Input2
                                placeholder="ingrese una fecha"
                                estado={fechaPedidoEditar}
                                type="date"
                                cambiarEstado={cambiarFechaPedidoEditar}
                                expresionRegular={false}
                                mensajeError={"La fecha debe ser mayor que el dia de hoy"}

                                id="fechaEditarPedido"
                            />
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
                            <Select onChange={(dato) => {
                                if (dato.target.value == "Devuelto") {
                                    alertDevuelto("pedido", "editarPedido")

                                }
                                else {
                                    cambiarMotivoDevolucionEditarPedido({ campo: '', valido: "true", desactivado: true });
                                }
                            }}>
                                <option>En produccion</option>
                                <option >Devuelto</option>
                                <option>Entregado</option>
                            </Select>
                        </Label>
                        <Label className='mt-4' >
                            <span>Motivo devolucion</span>
                            <Input2 placeholder={"ingrese motivo"} className="mt-1" estado={motivoDevolucionEditarPedido} type={"text"} cambiarEstado={cambiarMotivoDevolucionEditarPedido} expresionRegular={expresionesEditarPedido.motivoDevolucionEditarPedido} mensajeError={"el texto no puede  contener mas de 100 caracteres"} desactivado={motivoDevolucionEditarPedido.desactivado} />
                        </Label>


                        <div >
                            <TableContainer >
                                <Table >
                                    <TableHeader>
                                        <tr >
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nombre anillo</TableCell>
                                            <TableCell>Tipo</TableCell>
                                            <TableCell>Peso</TableCell>
                                            <TableCell>Tamaño anillo</TableCell>
                                            <TableCell>Tamaño piedra</TableCell>
                                            <TableCell>Material</TableCell>
                                            <TableCell>Detalle</TableCell>
                                            <TableCell>Empleado encargado</TableCell>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Motivo devolucion</TableCell>
                                            <TableCell>acciones</TableCell>
                                        </tr>
                                    </TableHeader>
                                    <TableBody className="w-12">
                                        {dataTable3.map((producto, i) => (
                                            <TableRow key={i}>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.ID}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.nombre}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tipo}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.peso}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tamanoAnillo}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tamanoPiedra}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.material}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.detalle}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.estado}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">{producto.motivoDevolucion}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <Button layout="link" size="icon" aria-label="Edit" onClick={openModalEditarProducto}>
                                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                        <Button layout="link" size="icon" aria-label="Delete" onClick={alertEliminadoProducto}>
                                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                </TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
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
                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={closeModal}>
                                Cancelar
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={validacionFormularioEditarPedido}>Enviar</Button>
                        </div>

                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={closeModal}>
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
