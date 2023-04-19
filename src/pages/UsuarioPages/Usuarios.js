import React, { useState, useEffect } from 'react'

import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui';
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'

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
import { EditIcon, TrashIcon, MailIcon, OutlinePersonIcon } from '../../icons';
import { SearchIcon } from '../../icons';
import response from '../../utils/demo/dataUsuarios'
import { Input2 } from '../../components/Input';
import Swal from 'sweetalert2'

const response2 = response.concat([])

function Usuario() {

  const [pageTable2, setPageTable2] = useState(1)

  const [dataTable2, setDataTable2] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const [isModalOpen2, setIsModalOpen2] = useState(false)

  function openModal2() {
    setIsModalOpen2(true)
  }

  function closeModal2() {
    setIsModalOpen2(false)
  }

  //VALIDACIÓN USUARIO

  const [correo, cambiarCorreo] = useState({ campo: '', valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    documento: /^\d{1,10}$/ // 7 a 14 numeros.
  }

  const alertUsuarioCreado = () => {
    Swal.fire({
      title: "¡El usuario ha sido creado correctamente!",
      icon: "success"
    })
      .then((value) => {
        closeModal();
      })
  }

  const alertUsuarioEditado = () => {
    Swal.fire({
      title: "¡El usuario ha sido editado correctamente!",
      icon: "success"
    })
      .then((value) => {
        closeModal();
      })
  }

  const alertUsuarioIncorrecto = () => {
    Swal.fire({
      title: "Digite el formulario correctamente",
      icon: "error"
    })

  }

  const alertEliminado = () => {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El usuario se ha eliminado correctamente.',
          'success'
        )
      }
    })

  }

  const validacionUsuario = (e) => {
    e.preventDefault();
    if (correo.valido === 'true') {
      cambiarFormularioValido(true);
      cambiarCorreo({ campo: '', valido: null });
      alertUsuarioCreado();

    } else {
      cambiarFormularioValido(false);
      alertUsuarioIncorrecto();
    }
  }

  const validacionUsuarioEditar = (e) => {
    e.preventDefault();
    if (correo.valido === 'true') {
      cambiarFormularioValido(true);
      cambiarCorreo({ campo: '', valido: null });
      alertUsuarioEditado();

    } else {
      cambiarFormularioValido(false);
      alertUsuarioIncorrecto();
    }
  }

  return (
    <>
      <PageTitle>Usuarios</PageTitle>



      <SectionTitle>Tabla usuarios</SectionTitle>
      <div className="flex ml-auto mb-6">
        <Button onClick={openModal}>
          Crear Usuario
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
              placeholder="Buscar usuario"
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>IdUsuario</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((rol, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rol.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rol.Rol}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rol.Correo}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400" type={rol.status}>{rol.Estado}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={openModal2}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={alertEliminado} />
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

      <form action='' onSubmit={validacionUsuario}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader className='mb-3'>Registrar usuario</ModalHeader>
          <ModalBody>
            <Label className="mt-4">
              <span>Rol</span>
              <Select className="mt-1">
                <option>Administrador</option>
                <option>Empleado</option>
              </Select>
            </Label>

            <Label className="mt-4">
              <span>Correo</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese el correo" type="text" estado={correo} cambiarEstado={cambiarCorreo} expresionRegular={expresiones.correo} mensajeError={"Debe incluir simbolo @ y el dominio. Ejemplo: example@gmail.com"} />
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
              <Button onClick={validacionUsuario}>Enviar</Button>
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

      <form action='' onSubmit={validacionUsuarioEditar}>
        <Modal isOpen={isModalOpen2} onClose={closeModal2}>
          <ModalHeader className='mb-3'>Editar usuario</ModalHeader>
          <ModalBody>
            <Label className="mt-4">
              <span>Rol</span>
              <Select className="mt-1">
                <option>Administrador</option>
                <option>Empleado</option>
              </Select>
            </Label>

            <Label className="mt-4">
              <span>Correo</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese el correo" type="text" estado={correo} cambiarEstado={cambiarCorreo} expresionRegular={expresiones.correo} mensajeError={"Debe incluir simbolo @ y el dominio. Ejemplo: example@gmail.com"} />
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
              <Button layout="outline" onClick={closeModal2}>
                Cancelar
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button onClick={validacionUsuarioEditar}>Enviar</Button>
            </div>

            <div className="block w-full sm:hidden">
              <Button block size="large" layout="outline" onClick={closeModal2}>
                Cancelar
              </Button>
            </div>
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Aceptar
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      </form>
    </>
  )
}

export default Usuario
