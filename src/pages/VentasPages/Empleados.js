import React, { useState, useEffect } from 'react'

import { Input } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'

import { ModalEditarEmpleado } from './components/EmpleadosComponents/ModalEditarEmpleado'

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
import response from '../../utils/demo/dataEmpleados';
import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../helpers/Alertas';
import { useEmpleados } from '../../services/hooks/UseEmpleados';

const response2 = response.concat([])


function Empleados() {

  const { empleados, eliminarEmpleado } = useEmpleados()
  const empleados2 = empleados.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])
  // pagination setup
  const resultsPerPage = 5
  const totalResults = empleados2.length

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  const searchFilter = (data, searchValue) => {
    if (!searchValue) {
      return data;
    }

    const searchTerm = searchValue.toLowerCase();

    return data.filter((empleado) => (
      empleado.nombre.toLowerCase().includes(searchTerm) ||
      empleado.apellido.toLowerCase().includes(searchTerm) ||
      empleado.documento.toLowerCase().includes(searchTerm) ||
      empleado.cargo.toLowerCase().includes(searchTerm) ||
      empleado.idUsuarioNavigation.correo.toLowerCase().includes(searchTerm)
    ));
  };

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    const filteredData = searchFilter(empleados2, search);
    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [empleados, pageTable2, search]);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({});

  /* Despliegue modal editar */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //funcion para buscar
  const searcher = (e) => {
    setSearch(e.target.value)
  }




  function openModal(empleado) {
    setEmpleadoSeleccionado(empleado);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function eliminarEmpleados(idEmpleado) {
    showAlertDeleted(
      '¿Estás seguro que deseas eliminar el empleado?',
      'warning',
      'Eliminado correctamente',
      'success'
    ).then((result) => {
      if (result.isConfirmed) {
        eliminarEmpleado(idEmpleado)
          .then(response => {
            showAlertCorrect('Empleado eliminado correctamente.', 'success');
            setTimeout(() => {
              window.location.reload();
          }, 1000);
          })
          .catch(response => {
            if (response.response.data.errorMessages[0] !== null) {
              showAlertIncorrect(response.response.data.errorMessages[0], 'error');
            } else {
              showAlertIncorrect('Error al eliminar el empleado', 'error');
            }

          });
      }
    });
  }


  return (
    <>
      <PageTitle>Empleados</PageTitle>



      <SectionTitle>Tabla empleados</SectionTitle>

      <div className="flex ml-auto mb-6">
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Buscar empleado"
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
              <TableCell>Cargo</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((empleado) => (
              <TableRow key={empleado.idEmpleado}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.cargo}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400" id="nombre" name="nombre">{empleado.nombre}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.apellido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.documento}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.idUsuarioNavigation.correo}</p>
                </TableCell>

                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400" type={empleado.status}>{empleado.estado ? 'Activo' : 'Inactivo'}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModal(empleado)}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>

                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => eliminarEmpleados(empleado.idEmpleado)}>
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
      {modalIsOpen && (
        <ModalEditarEmpleado isOpen={modalIsOpen} isClose={closeModal} empleado={empleadoSeleccionado} />
      )}
    </>
  )
}

export default Empleados
