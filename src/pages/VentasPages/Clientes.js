import React, { useState, useEffect } from 'react'
import { useClientes } from '../../services/hooks/UseClientes'

import { Input } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'

import { ModalEditarCliente } from './components/ClientesComponents/ModalEditarCliente'
import { ModalCrearCliente } from './components/ClientesComponents/ModalCrearCliente'

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
import response from '../../utils/demo/dataClientes';
import { showAlertDeleted } from '../../helpers/Alertas';

const response2 = response.concat([])

function Clientes() {

  const { clientes, deleteClientes } = useClientes();
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [dataCliente, setDataCliente] = useState([]);
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

  useEffect(() => {
    setData();
  }, []);

  function openModalCreate() {
    setModalIsOpenCreate(true);
  }

  function closeModal() {
    setModalIsOpenCreate(false);
  }

  function openModalEdit(obj) {
    setModalIsOpenEdit(true);
    setData(obj);
  }

  function closeModalEdit() {
    setModalIsOpenEdit(false);
  }


  function setData(obj) {
    setDataCliente(obj);
  }

  function alertaEliminado(idCliente) {
    showAlertDeleted('¿Estás seguro que deseas eliminar el empleado?', 'warning', 'Eliminado correctamente', 'success', () => deleteClientes(idCliente))
  }

  return (

    <>
      <PageTitle>Clientes</PageTitle>

      <SectionTitle>Tabla clientes</SectionTitle>
      <div className="flex ml-auto mb-6">
        <ModalCrearCliente isOpen={modalIsOpenCreate} isClose={closeModal} />
        <Button onClick={openModalCreate}>
          Registrar Cliente
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
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente, i) => {

              return (
                <TableRow key={i}>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.idCliente}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.documento}</p>
                  </TableCell>

                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.nombre}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.apellido}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.telefono}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{cliente.estado ? 'Activo' : 'Inactivo'}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModalEdit(cliente)}>
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button layout="link" size="icon" aria-label="Delete" onClick={() => alertaEliminado(cliente.idCliente)}>
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>);
            }
            )
            }
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
      {modalIsOpenEdit && (
        <ModalEditarCliente isOpen={modalIsOpenEdit} isClose={closeModalEdit} object={dataCliente} />
      )}
    </>
  )
}

export default Clientes
