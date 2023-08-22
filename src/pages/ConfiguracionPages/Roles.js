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
  Badge
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../icons';
import { SearchIcon, PlusCircle } from '../../icons';
import { showAlertCorrect, showAlertDeleted, showAlertIncorrect } from '../../helpers/Alertas';
import { useRoles } from '../../services/hooks/useRoles'

function Roles() {

  const {roles, eliminarRol} = useRoles();
  const roles2 = roles.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = roles2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  const searchFilter = (data, searchValue) => {
    if (!searchValue) {
      return data;
    }

    const searchTerm = searchValue.toLowerCase();

    return data.filter((roles) => (
      roles.nombre.toLowerCase().includes(searchTerm)
    ));
  };

  useEffect(() => {
    const filteredData = searchFilter(roles2, search);
    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [roles, pageTable2, search])
  
  const [modalIsOpenCreate, setModalIsOpenCreate] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState([]);

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  //Modal crear
  function openModalCreate() {
    setModalIsOpenCreate(true);
  }

  function closeModal() {
    setModalIsOpenCreate(false);
  }

  //Modal editar
  function openModalEdit(rol) {
    setModalIsOpenEdit(true);
    setRolSeleccionado(rol);
  }

  function closeModalEdit() {
    setModalIsOpenEdit(false);
  }

  //Eliminar
  function eliminarRoles(idRol) {
    showAlertDeleted(
      '¿Estás seguro que deseas eliminar el empleado?',
      'warning',
      'Eliminado correctamente',
      'success'
    ).then(result =>{
      if (result.isConfirmed) {
        eliminarRol(idRol).then(response=>{
          showAlertCorrect('Rol eliminado correctamente.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        }).catch(response =>{
          showAlertIncorrect('Error al eliminar el rol', 'error');
        })
      }
    })
  }


  return (
    <>
      <PageTitle>Roles</PageTitle>

      <div className="flex ml-auto mb-6">
      <ModalCrearRol isOpen={modalIsOpenCreate} isClose={closeModal} />
        <Button iconRight={PlusCircle} onClick={openModalCreate}>
          Crear rol
        </Button>
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4 dark:text-white" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Buscar rol"
              value={search}
              onChange={searcher}
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.length === 0 ? (<TableRow>
              <TableCell colSpan={10} className='text-center'>No se encontraron datos</TableCell>
            </TableRow>) : dataTable2.map((rol) => (
              <TableRow key={rol.idRol}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{rol.nombre}</p>
                </TableCell>
                <TableCell>
                  <Badge className="text-xs text-gray-600 dark:text-gray-400" type={rol.estado ? "success" : "danger"}>{rol.estado ? 'Activo' : 'Inactivo'}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModalEdit(rol)}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" onClick={() =>eliminarRoles(rol.idRol)}>
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {totalResults > 0 && (
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable2}
              label="Table navigation"
            />
          )}
        </TableFooter>
      </TableContainer>
      {modalIsOpenEdit && (
        <ModalEditarRol isOpen={modalIsOpenEdit} isClose={closeModalEdit} rol={rolSeleccionado} />
      )}

    </>
  )
}

export default Roles
