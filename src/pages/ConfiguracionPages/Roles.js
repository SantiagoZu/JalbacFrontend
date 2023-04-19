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
import response from '../../utils/demo/dataRoles'
import Swal from 'sweetalert2'


const response2 = response.concat([])

function Roles() {

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
  const [rol, cambiarRol] = useState({ campo: '', valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras y espacios, pueden llevar acentos.
    documento: /^\d{1,10}$/, // 7 a 14 numeros.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{6,14}$/, // 7 a 14 numeros.
    rol: /^[a-zA-ZÀ-ÿ\s]{1,25}$/, // Letras
  }

  // CREAR 

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)

  function openModalCreate() {
    setIsModalCreateOpen(true)
  }

  function closeModalCreate() {
    setIsModalCreateOpen(false)
  }

  const ValidacionFormCreate = (e) => {
    e.preventDefault();
    if (rol.valido === 'true') {

      cambiarFormularioValido(true);

      Swal.fire({
        title: "Rol registrado correctamente",
        icon: "success"
      })
        .then((value) => {
          closeModalCreate();
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
    if (rol.valido === 'true') {

      cambiarFormularioValido(true);
      cambiarRol({ campo: '', valido: null });

      Swal.fire({
        title: "Rol editado correctamente",
        icon: "success"
      })
        .then((value) => {
          closeModalEdit();
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


  function EliminarRol() {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este rol?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7e3af2',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El rol se ha eliminado correctamente.',
          'success'
        )
      }
    })
  }



  return (
    <>
      <PageTitle>Roles</PageTitle>

      <SectionTitle>Tabla Roles</SectionTitle>
      <div className="flex ml-auto mb-6">
        <Button onClick={openModalCreate}>
          Crear Roles
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
              placeholder="Buscar rol"
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>ID</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Permisos</TableCell>
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
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rol.Permisos}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rol.Estado}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={openModalEdit}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={EliminarRol}>
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



      {/* CREAR */}



      <form action='' onSubmit={ValidacionFormCreate}>
        <Modal isOpen={isModalCreateOpen} onClose={closeModalCreate}>
          <ModalHeader>Crear Rol</ModalHeader>
          <ModalBody>
            <Label>
              <span>Rol</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese el rol..." type="text" estado={rol} cambiarEstado={cambiarRol} expresionRegular={expresiones.rol} mensajeError={"El rol no puede tener números"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label className="mt-4">
              <span>Permisos</span> <br />
              <Input type="checkbox" className='ml-3' /> Dashboard <br />
              <Input type="checkbox" className='ml-3' /> Backup <br />
              <Input type="checkbox" className='ml-3' /> Roles <br />
              <Input type="checkbox" className='ml-3' /> Usuarios <br />
              <Input type="checkbox" className='ml-3' /> Empleados <br />
              <Input type="checkbox" className='ml-3' /> Clientes <br />
              <Input type="checkbox" className='ml-3' /> Pedidos <br />
              <Input type="checkbox" className='ml-3' /> Devoluciones <br />
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
              <Button layout="outline" onClick={closeModalCreate}>
                Cancelar
              </Button>
            </div>
            <div className="hidden sm:block">
              <Button type="submit" onClick={ValidacionFormCreate}>Aceptar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </form>



      {/* EDITAR */}



      <form action='' onSubmit={ValidacionFormEdit}>
        <Modal isOpen={isModalEditOpen} onClose={closeModalEdit}>
          <ModalHeader>Editar Rol</ModalHeader>
          <ModalBody>
            <Label>
              <span>Rol</span>
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <Input2 placeholder="Ingrese el rol..." type="text" estado={rol} cambiarEstado={cambiarRol} expresionRegular={expresiones.rol} mensajeError={"El rol no puede tener números"} />
                <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
                </div>
              </div>
            </Label>

            <Label className="mt-4">
              <span>Permisos</span> <br />
              <Input type="checkbox" className='ml-3' /> Dashboard <br />
              <Input type="checkbox" className='ml-3' /> Backup <br />
              <Input type="checkbox" className='ml-3' /> Roles <br />
              <Input type="checkbox" className='ml-3' /> Usuarios <br />
              <Input type="checkbox" className='ml-3' /> Empleados <br />
              <Input type="checkbox" className='ml-3' /> Clientes <br />
              <Input type="checkbox" className='ml-3' /> Pedidos <br />
              <Input type="checkbox" className='ml-3' /> Devoluciones <br />
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

export default Roles
