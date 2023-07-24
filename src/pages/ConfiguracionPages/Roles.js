import React, { useState, useEffect } from 'react'

import { Input } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'

import { ModalEditarRol } from './components/RolComponents/ModalEditarRol'
import { ModalCrearRol } from './components/RolComponents/ModalCrearRol'

import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons';
import { SearchIcon } from '../../icons';
import response from '../../utils/demo/dataRoles';
import { showAlertDeleted } from '../../helpers/Alertas';


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
  
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);

  function openModalCreate() {
    setModalIsOpenCreate(true);
  }

  function closeModal() {
    setModalIsOpenCreate(false);
  }

  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);

  function openModalEdit() {
    setModalIsOpenEdit(true);
  }

  function closeModalEdit() {
    setModalIsOpenEdit(false);
  }

  function alertaEliminado() {
    showAlertDeleted('¿Estás seguro que deseas eliminar el cliente?', 'warning', 'Eliminado correctamente', 'success')
  }

  return (
    <>
      <PageTitle>Roles</PageTitle>

      <div className="flex ml-auto mb-6">
      <ModalCrearRol isOpen={modalIsOpenCreate} isClose={closeModal} />
        <Button onClick={openModalCreate}>
          Registrar Rol
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
                  <ModalEditarRol isOpen={modalIsOpenEdit} isClose={closeModalEdit} />
                    <Button layout="link" size="icon" aria-label="Edit" onClick={openModalEdit}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={alertaEliminado}>
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
    </>
  )
}

export default Roles
