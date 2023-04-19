import React, { useState, useEffect } from 'react'

import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
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
import { ModalAgregarUsuario } from './components/UsuarioComponents/ModalAgregarUsuario';
import { ModalEditarUsuario } from './components/UsuarioComponents/ModalEditarUsuario';
import { showAlertDeleted } from "../../helpers/Alertas";

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

  const [isModalOpen2, setIsModalOpen2] = useState(false)

  function openModal2() {
    setIsModalOpen2(true)
  }

  function closeModal() {
    setIsModalOpen2(false)
    setIsModalOpen(false)
  }

  function alertaEliminado() {
    showAlertDeleted('¿Estás seguro que deseas eliminar el usuario?', 'warning', 'Usuario eliminado correctamente', 'success')
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
                    <ModalAgregarUsuario isOpen={isModalOpen} isClose={closeModal} />
                    <ModalEditarUsuario isOpen={isModalOpen2} isClose={closeModal} />
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={alertaEliminado} />
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
    </>
  )
}

export default Usuario