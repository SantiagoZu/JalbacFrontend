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

function Devoluciones() {

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
    setDataTable3(responseDetalles.slice((pageTable3 - 1) * resultsPerPage, pageTable3 * resultsPerPage))
  }, [pageTable3])

  //despliegue modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
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

  /* Despliegue modal editar producto| */
  const [isModalOpenEditarProducto, setIsModalOpenEditarProducto] = useState(false)

  function openModalEditarProducto() {
    setIsModalOpenEditarProducto(true)
    cambiarMotivoDevolucion({ campo: '', valido: null, desactivado: true })
  }

  function closeModalEditarProducto() {
    setIsModalOpenEditarProducto(false)
  }

  /* Despliegue modal Crear pedido */
  const [isModalOpenCrearPedido, setIsModalOpenCrearPedido] = useState(false)

  function openModalCrearPedido() {
    setIsModalOpenCrearPedido(true)
  }

  function closeModalCrearPedido() {
    setIsModalOpenCrearPedido(false)
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
  const [cliente, cambiarCliente] = useState({ campo: '', valido: null });
  const [formularioValidoProducto, cambiarFormularioValidoProducto] = useState(null);
  const [formularioValidoEditarProducto, cambiarFormularioValidoEditarProducto] = useState(null);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    cliente: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras, numeros, guion y guion_bajo
  }
  const comparaFechas = (fecha1) => {
    if (new Date(fecha1).toLocaleDateString() >= new Date().toLocaleDateString("es-CO")) {

      return true
    }
    else {

      return false
    }
  }

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


  const alertDevuelto = (p) => {
    Swal.fire({
      title: `¿Estás seguro que deseas cambiar el estado del ${p} a devuelto?`,
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
        cambiarMotivoDevolucion({ campo: '', valido: false, desactivado: false });
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
    if (cliente.valido === 'true' && comparaFechas(document.getElementById("fechaEditar").value) && motivoDevolucion.valido === true) {

      cambiarFormularioValido(true);
      cambiarCliente({ campo: '', valido: null });
      if (motivoDevolucion.valido) {
        alertEditadoCorrecto("Pedido agregado");
      }
      alertEditadoCorrecto("Pedido editado");


    } else {
      cambiarFormularioValido(false);
      alertEditadoCorrecto("Pedido editado");
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

  const validacionFormularioEditarProducto = (e) => {
    e.preventDefault();
    if (nombre.valido && peso.valido && tamanoAnillo.valido && tamanoPiedra.valido && detalle.valido && motivoDevolucion.valido === 'true') {

      cambiarFormularioValidoEditarProducto(true);
      cambiarNombre({ campo: '', valido: null });
      cambiarPeso({ campo: '', valido: null });
      cambiarTamanoAnillo({ campo: '', valido: null });
      cambiarTamanoPiedra({ campo: '', valido: null });
      cambiarDetalle({ campo: '', valido: null });
      cambiarMotivoDevolucion({ campo: '', valido: null });
      alertEditadoCorrecto("Producto editado");

    } else {
      cambiarFormularioValidoEditarProducto(false);
      alertEditadoCorrecto("Producto editado");
    }
  }

  return (
    <>
      <PageTitle>Devoluciones</PageTitle>



      <SectionTitle>Tabla Devoluciones</SectionTitle>
      <div className="flex ml-auto mb-6">
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Buscar devolución"
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
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((devolucion, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.FechaPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.Cliente}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.FechaEntrega}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.Estado}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={openModal}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
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
      <form action='' onSubmit={validacionFormulario}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader className='mb-3'>Editar devoluciones</ModalHeader>
          <ModalBody>





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
                      <span >Estado</span>
                      <Select className="mt-1" onChange={(dato) => {
                        if (dato.target.value == "Devuelto") {
                          alertDevuelto("producto")

                        }
                        else {
                          cambiarMotivoDevolucion({ campo: '', valido: "true", desactivado: true });
                        }
                      }}>
                        <option>En produccion</option>
                        <option>Entregado</option>
                      </Select>
                    </Label>


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
          <ModalHeader className='mb-3'>Crear pedido</ModalHeader>
          <ModalBody>
            <Label className="mt-4">
              <Input2 placeholder={"ingrese un cliente"} className="mt-1" estado={cliente} type={"text"} cambiarEstado={cambiarCliente} expresionRegular={expresiones.cliente} mensajeError={"El nombre no puede tener numeros"} />
            </Label>

            <Label className="mt-4">
              <span>fecha Entrega</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="block w-full  mt-1 mb-3 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder=""
                  type="date"
                  id="fechaEditar"
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>
            <Label className="mt-4">
              <span>Estado</span>

              <Select className="mt-1">
                <option>En produccion</option>
                <option>Devuelto</option>
                <option>Entregado</option>
              </Select>
            </Label>

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

      <Modal isOpen={isModalOpenVerDetalle} onClose={closeModalVerDetalle}>
        <ModalHeader className='mb-3'> Pedido</ModalHeader>
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
                  <TableCell>Modelo</TableCell>
                  <TableCell>Detalle</TableCell>
                  <TableCell>Informacion adicional</TableCell>
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.modelo}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.detalle}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.informacion}</p>
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


    </>
  )
}

export default Devoluciones
