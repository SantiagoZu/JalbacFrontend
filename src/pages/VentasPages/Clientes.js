import React, { useState, useEffect } from 'react'

import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Input2 } from '../../components/Input';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Select
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, SearchIcon } from '../../icons';
import Swal from 'sweetalert2'

import response from '../../utils/demo/dataClientes'

const response2 = response.concat([])

function Clientes() {

  const [pageTable2, setPageTable2] = useState(1)

  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 10
  const totalResults = response.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])



  const [nombre, cambiarNombre] = useState({ campo: '', valido: null });
  const [apellido, cambiarApellido] = useState({ campo: '', valido: null });
  const [documento, cambiarDocumento] = useState({ campo: '', valido: null });
  const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: '', valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{6,14}$/, // 7 a 14 numeros.
    documento: /^[a-zA-Z0-9\_\-\.]{4,16}$/
  }

  // CREAR 

  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const ValidacionFormulario = (e) => {
    e.preventDefault();
    if (correo.valido === 'true' && documento.valido == 'true' && nombre.valido == 'true' && apellido.valido == 'true' && telefono.valido == 'true') {

      cambiarFormularioValido(true);
      cambiarCorreo({ campo: '', valido: null });

      Swal.fire({
        title: "Cliente registrado correctamente",
        icon: "success"
      })
        .then((value) => {
          closeModal();
        })
    } else {
      cambiarFormularioValido(false);
      Swal.fire({
        title: "Digíte correctamente el formulario",
        icon: "error"
      })
    }
  }

  // EDITAR

  const [isModalEditOpen, setIsModalEditOpen] = useState(false)

  function openModalEdit() {
    setIsModalEditOpen(true)
  }

  function closeModalEdit() {
    setIsModalEditOpen(false)
  }

  const ValidacionFormEdit = (e) => {
    e.preventDefault();
    if (correo.valido === 'true' && documento.valido == 'true' && nombre.valido == 'true' && apellido.valido == 'true' && telefono.valido == 'true') {

      cambiarFormularioValido(true);
      cambiarCorreo({ campo: '', valido: null });

      Swal.fire({
        title: "Cliente editado correctamente",
        icon: "success"
      })
        .then((value) => {
          closeModal();
        })
    } else {
      cambiarFormularioValido(false);
      Swal.fire({
        title: "Digíte correctamente el formulario",
        icon: "error"
      })
    }
  }

  // ELIMINAR


  function EliminarCliente() {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El cliente se ha eliminado correctamente.',
          'success'
        )
      }
    })
  }

  return (

    <>
      <PageTitle>Clientes</PageTitle>

      <SectionTitle>Tabla clientes</SectionTitle>
      <div className="flex ml-auto mb-6">
        <Button onClick={openModal}>
          Crear Cliente
          <span className="ml-2" aria-hidden="true">
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
              placeholder="Buscar cliente"
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>ID</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((cliente, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.Documento}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.Correo}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.Nombre}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.Apellidos}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.Telefono}</p>
                </TableCell>

                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.Estado}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={openModalEdit}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={EliminarCliente}>
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

      <form action='' onSubmit={ValidacionFormulario}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Crear Cliente</ModalHeader>
          <ModalBody>
            <Label>
              <span>Documento</span>
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese su documento..." type="text" estado={documento} cambiarEstado={cambiarDocumento} expresionRegular={expresiones.documento} mensajeError={"Digíte el documento correctamente"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Correo</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2
                  className="block w-full pl-10 mt-1 mb-3 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Ingrese su correo..." estado={correo} cambiarEstado={cambiarCorreo} expresionRegular={expresiones.correo} mensajeError={"Debe incluir simbolo @ y el dominio. Ejemplo: example@gmail.com"}
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Nombres</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese su nombre..." type="text" estado={nombre} cambiarEstado={cambiarNombre} expresionRegular={expresiones.nombre} mensajeError={"El nombre no puede incluir números"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Apellidos</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese sus apellidos..." type="text" estado={apellido} cambiarEstado={cambiarApellido} expresionRegular={expresiones.nombre} mensajeError={"El apellido no puede incluir números"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Telefono</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese su teléfono..." type="number" estado={telefono} cambiarEstado={cambiarTelefono} expresionRegular={expresiones.telefono} mensajeError={"Digíte el telefono correctamente"} />
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
              <Button layout="outline" onClick={closeModal}>
                Cancelar
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit" onClick={ValidacionFormulario}>Aceptar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </form>


      {/* EDITAR */}

      <form action='' onSubmit={ValidacionFormEdit}>
        <Modal isOpen={isModalEditOpen} onClose={closeModalEdit}>
          <ModalHeader>Editar Cliente</ModalHeader>
          <ModalBody>
            <Label>
              <span>Documento</span>
              {/* <!-- focus-within sets the color for the icon when input is focused --> */}
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese su documento..." type="number" estado={documento} cambiarEstado={cambiarDocumento} expresionRegular={expresiones.documento} mensajeError={"Digíte el documento correctamente"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Correo</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2
                  className="block w-full pl-10 mt-1 mb-3 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  placeholder="Ingrese su correo..." estado={correo} cambiarEstado={cambiarCorreo} expresionRegular={expresiones.correo} mensajeError={"Debe incluir simbolo @ y el dominio. Ejemplo: example@gmail.com"}
                />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Nombres</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese su nombre..." type="text" estado={nombre} cambiarEstado={cambiarNombre} expresionRegular={expresiones.nombre} mensajeError={"El nombre no puede incluir números"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Apellidos</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese sus apellidos..." type="text" estado={apellido} cambiarEstado={cambiarApellido} expresionRegular={expresiones.nombre} mensajeError={"El apellido no puede incluir números"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label>
              <span>Telefono</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese su teléfono..." type="number" estado={telefono} cambiarEstado={cambiarTelefono} expresionRegular={expresiones.telefono} mensajeError={"Digíte el telefono correctamente"} />
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
              <Button layout="outline" onClick={closeModalEdit}>
                Cancelar
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit" onClick={ValidacionFormEdit}>Aceptar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </form>
    </>
  )
}

export default Clientes
