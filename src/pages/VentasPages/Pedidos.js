import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui';
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import CTA from '../../components/CTA'
import Swal from 'sweetalert2'
import button2 from '../../button';

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, SearchIcon } from '../../icons';
import { Input2 } from '../../components/Input';
import response from '../../utils/demo/dataPedidos'
import responseDetalles from '../../utils/demo/dataProductos'
import { hacker } from 'faker/lib/locales/en';
const response2 = response.concat([])
const responseDetallesProductos = responseDetalles.concat([])

function Pedidos() {

  const [pageTable2, setPageTable2] = useState(1)
  const [pageTable3, setPageTable3] = useState(1)

  const [dataTable2, setDataTable2] = useState([])
  const [dataTable3, setDataTable3] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  const totalResults2 = response.length

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  function onPageChangeTable3(p) {
    setPageTable3(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])
  useEffect(() => {
    setDataTable3(responseDetallesProductos.slice((pageTable3 - 1) * resultsPerPage, pageTable3 * resultsPerPage))
  }, [pageTable3])
  /* Despliegue modal editar */
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }
  /* Despliegue modal editar producto| */
  const [isModalOpenEditarProducto, setIsModalOpenEditarProducto] = useState(false)

  function openModalEditarProducto() {
    setIsModalOpenEditarProducto(true)
    cambiarMotivoDevolucion({ campo: '', valido: true, desactivado: true })
  }

  function closeModalEditarProducto() {
    setIsModalOpenEditarProducto(false)
  }


  /* Confirmación edición */

  const [isModalOpen2, setIsModalOpen2] = useState(false)

  function openModal2() {
    setIsModalOpen(false)
    setIsModalOpen2(true)
  }

  function closeModal2() {
    setIsModalOpen2(false)
  }
  /* Despliegue modal Crear pedido */
  const [isModalOpenCrearPedido, setIsModalOpenCrearPedido] = useState(false)

  function openModalCrearPedido() {
    setIsModalOpenCrearPedido(true)
  }

  function closeModalCrearPedido() {
    setIsModalOpenCrearPedido(false)
  }

  /* Despliegue modal crear producto| */
  const [isModalOpenProducto, setIsModalOpenProducto] = useState(false)

  function openModalProducto() {
    setIsModalOpenProducto(true)
  }

  function closeModalProducto() {
    setIsModalOpenProducto(false)
  }
  function closeModalProducto() {
    setIsModalOpenProducto(false)
  }

  /* Confirmación Creacion */

  const [isModalOpen2CrearPedido, setIsModalOpen2CrearPedido] = useState(false)

  function openModal2CrearPedido() {
    setIsModalOpenCrearPedido(false)
    setIsModalOpen2CrearPedido(true)
  }

  function closeModal2CrearPedido() {
    setIsModalOpen2CrearPedido(false)
  }

  /* Despliegue modal ver detalle */
  const [isModalOpenVerDetalle, setIsModalOpenVerDetalle] = useState(false)

  function openModalVerDetalle() {
    setIsModalOpenVerDetalle(true)
  }

  function closeModalVerDetalle() {
    setIsModalOpenVerDetalle(false)
  }

  /* Confirmación edición */



  /* Confimarcion eliminacion */

  const [isModalOpen3, setIsModalOpen3] = useState(false)

  function openModal3() {
    setIsModalOpen3(true)
  }

  function closeModal3() {
    setIsModalOpen3(false)
  }
  /* Validación formulario */
  const date = new Date()
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const [cliente, cambiarCliente] = useState({ campo: '', valido: null });
  const [fechaPedido, cambiarFechaPedido] = useState({ campo: `${year}-${month}-${day}`, valido: null });


  const [clienteEditarPedido, cambiarClienteEditarPedido] = useState({ campo: '', valido: null });
  const [motivoDevolucionEditarPedido, cambiarMotivoDevolucionEditarPedido] = useState({ campo: '', valido: true, desactivado: true });
  const [fechaPedidoEditar, cambiarFechaPedidoEditar] = useState({ campo: `${year}-${month}-${day}`, valido: null });
  // const [estadoPedido, cambiarEstadoPedido] = useState({ campo: '', valido: null, desactivado: true });

  const [formularioValido, cambiarFormularioValido] = useState(null);
  const [formularioValidoProducto, cambiarFormularioValidoProducto] = useState(null);
  const [formularioValidoEditarProducto, cambiarFormularioValidoEditarProducto] = useState(null);

  const expresiones = {
    cliente: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras, numeros, guion y guion_bajo
  }
  const expresionesEditarPedido = {
    clienteEditarPedido: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras, numeros, guion y guion_bajo
    motivoDevolucionEditarPedido: /^[A-Za-z0-9]{0,100}$/, // Letras, numeros, guion y guion_bajo
  }
  /*const comparaFechas = (fecha1) => {
    if(new Date(fecha1).toLocaleDateString() >= new Date().toLocaleDateString("es-CO")){
      cambiarFechaPedido({ campo: '', valido: true })
      return fecha1.valido
    }
    else {
      cambiarFechaPedido({ campo: '', valido: false })
      return fecha1.valido
    }
  }*/

  const alertEditadoCorrecto = (p) => {
    Swal.fire({
      title: p + " correctamente",
      icon: "success"
    })
      .then((value) => {
        closeModalEditarProducto();
      })
  }

  const alertEditadoIncorrecto = () => {
    Swal.fire({
      title: "Digíte correctamente el formulario",
      icon: "error"
    })

  }

  const alertEliminado = () => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El pedido se ha eliminado correctamente.',
          'success'
        )
      }
    })
  }


  const alertDevuelto = (p, formulario) => {
    Swal.fire({
      title: `¿Estás seguro que deseas cambiar el estado del ${p} a devuelto? una vez cambiado el ${p} se enviará a la vista de devoluciones`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Modificado!',
          'El estado se ha editado correctamente.',
          'success'
        )
        if (formulario == "editarPedido") {
          cambiarMotivoDevolucionEditarPedido({ campo: '', valido: false, desactivado: false });
        }
        else if (formulario == "editarProducto") {
          cambiarMotivoDevolucion({ campo: '', valido: false, desactivado: false })
        }
      }
    })
  }
  const alertEliminadoProducto = () => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El producto se ha eliminado correctamente.',
          'success'
        )
      }
    })
  }

  const validacionFormulario = (e) => {
    e.preventDefault();
    if (cliente.valido === 'true' && fechaPedido.valido === "true" && motivoDevolucion.valido === true) {

      cambiarFormularioValido(true);
      cambiarCliente({ campo: '', valido: null });
      cambiarFechaPedido({ campo: '', valido: null });

      if (motivoDevolucion.valido) {
        alertEditadoCorrecto("Pedido agregado");
      }
      alertEditadoCorrecto("Pedido editado");


    } else {
      cambiarFormularioValido(false);
      alertEditadoIncorrecto();
    }
  }

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


  const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
  const [peso, cambiarPeso] = useState({ campo: '', valido: null });
  const [tamanoAnillo, cambiarTamanoAnillo] = useState({ campo: '', valido: null });
  const [tamanoPiedra, cambiarTamanoPiedra] = useState({ campo: '', valido: null });
  const [detalle, cambiarDetalle] = useState({ campo: '', valido: null });
  const [motivoDevolucion, cambiarMotivoDevolucion] = useState({ campo: '', valido: true, desactivado: true });



  const expresionesProducto = {
    nombre: /^[A-Za-z0-9 ]+$/, // no caracteres especiales
    peso: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos decimal
    tamanoAnillo: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos
    tamanoPiedra: /^\d+(\.\d{1,12})?$/,     ///^.{4,12}$/ de 4 a 12 digitos
    detalle: /^[A-Za-z0-9]{0,100}$/,
    motivoDevolucion: /^[A-Za-z0-9]{0,100}$/,     // solo acepta de 0 a 200 caracteres

  }
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
      <PageTitle>Pedidos</PageTitle>
      <SectionTitle>Tabla pedidos</SectionTitle>

      <div className="flex ml-auto mb-6">
        <Button onClick={openModalCrearPedido}>
          Crear Pedido
          <span className="ml-1" aria-hidden="true">
            +
          </span>
        </Button>
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Buscar usuario"
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>ID</TableCell>
              <TableCell>Fecha Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Empleado encargado</TableCell>
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((pedido, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.FechaPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.Cliente}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.EmpleadosAsignado}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.FechaEntrega}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.Estado}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={openModalVerDetalle}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={openModal}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={alertEliminado}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
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
      <form action='' onSubmit={validacionFormulario}>
        <Modal isOpen={isModalOpenCrearPedido} onClose={closeModalCrearPedido}>
          <ModalHeader className='mb-3'>Agregar pedido</ModalHeader>
          <ModalBody>
            <Label className="mt-4">
              <Input2 placeholder={"ingrese un cliente"} className="mt-1" estado={cliente} type={"text"} cambiarEstado={cambiarCliente} expresionRegular={expresiones.cliente} mensajeError={"El nombre no puede tener numeros"} />
            </Label>

            <Label className="mt-4">
              <span>Fecha Entrega</span>

              <Input2
                placeholder="ingrese una fecha"
                estado={fechaPedido}
                type="date"
                cambiarEstado={cambiarFechaPedido}
                expresionRegular={false}
                mensajeError={"La fecha debe ser mayor que el dia de hoy"}

                id="fechaEditar"
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

            <Button onClick={openModalProducto} className="mb-4 mt-4">
              Agregar producto
              <span className="mb-1" aria-hidden="true">
                +
              </span>
            </Button>

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
                      <TableCell>Cantidad</TableCell>
                      <TableCell>Empleado encargado</TableCell>
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
                          <p className="text-xs text-gray-600 dark:text-gray-400">5</p>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
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
          </ModalBody>

          <ModalFooter>
            <div className="hidden sm:block">
              <Button layout="outline" onClick={closeModalCrearPedido}>
                Cancelar
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button onClick={validacionFormulario}>Enviar</Button>
            </div>

            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModalCrearPedido}>
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
      <Modal isOpen={isModalOpen2CrearPedido} onClose={closeModal2CrearPedido}>
        <ModalHeader>Crear Pedido</ModalHeader>
        <ModalBody>
          ¡Registro exitoso!
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block" onClick={closeModal2CrearPedido}>
            <Button>Aceptar</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={closeModal2CrearPedido}>
              Aceptar
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isModalOpenVerDetalle} onClose={closeModalVerDetalle}  >
        <ModalHeader className='mb-8'> Detalles producto</ModalHeader>
        <ModalBody>
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
                  <TableCell>Estado</TableCell>
                  <TableCell>Empleado encargado</TableCell>
                  <TableCell>Motivo devolucion</TableCell>
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.estado}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.motivoDevolucion}</p>
                    </TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
        </ModalBody>

        <ModalFooter>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModalVerDetalle}>
              Cerrar
            </Button>
          </div>

        </ModalFooter>
      </Modal>

      <Modal isOpen={isModalOpen3} onClose={closeModal3}>
        <ModalHeader>Eliminar Pedido</ModalHeader>
        <ModalBody>
          Pedido eliminado correctamente.
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button onClick={closeModal3}>Aceptar</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" onClick={closeModal3}>Aceptar</Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default Pedidos