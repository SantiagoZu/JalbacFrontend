import React, { useState, useEffect } from 'react'
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
  Input
} from '@windmill/react-ui'
import moment from 'moment';
import { showAlertDeleted, showAlertIncorrect, showAlertCorrect } from '../../helpers/Alertas';
import PageTitle from '../../components/Typography/PageTitle'
import { SearchIcon, PlusCircle } from '../../icons';
import { useBackup } from '../../services/hooks/useBackup'
import { useUsuarios } from '../../services/hooks/useUsuarios'
import { useEmpleados } from '../../services/hooks/useEmpleados'



function Backup() {

  const { backup, getBackup, getBackupDownload, postBackup, idUsuario } = useBackup();
  const { usuarios } = useUsuarios();
  const { empleados } = useEmpleados();
  const backup2 = backup ? backup.concat([]) : [];
  const objectPost = { idEmpleado: parseInt("") }

  const resultsPerPage = 5
  const [totalResults, setTotalResults] = useState(backup2.length)
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  useEffect(() => {
    if (backup) {
      setTotalResults(backup.length)
      setDataTable2(backup.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
    }
  }, [pageTable2, backup])
  function openModalCreate(obj) {
    const idEmpleadoInt = parseInt(obj.idEmpleado);;

    const newObj = {
      ...obj,
      idEmpleado: idEmpleadoInt,
    };

    console.log(newObj)

    showAlertDeleted(
      '¿Estás seguro que deseas crear una copia de seguridad?',
      'question',
      '',
      '',
      '¡Sí, crear!',
    ).then((result) => {
      if (result.isConfirmed) {
        postBackup(newObj)
          .then(response => {
            getBackupDownload()
            showAlertCorrect('Copia de seguridad creada correctamente', 'success');
          })
          .catch(response => {
            console.log(response)
            showAlertIncorrect('Error al crear la copia de seguridad', 'error');
          });
      }
    });
  }

  const usuarioActual = usuarios.find(usuario => usuario.idUsuario == idUsuario);
  if (usuarioActual) {
    const correoUsuario = usuarioActual.correo;
    const empleadoConMismoCorreo = empleados.filter(empleado => empleado.idUsuarioNavigation.correo === correoUsuario);
    if (empleadoConMismoCorreo.length > 0) {
      objectPost.idEmpleado = empleadoConMismoCorreo.map(empleado => empleado.idEmpleado);
    }
  }
  return (
    <>
      <PageTitle>Copias de seguridad</PageTitle>

      <div className="flex ml-auto mb-6">
        <Button iconRight={PlusCircle} onClick={() => openModalCreate(objectPost)}>
          Crear BackUp
        </Button>
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Buscar BackUp"
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Usuario</TableCell>
              <TableCell>Fecha BackUp</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.length === 0 ? (<TableRow>
              <TableCell colSpan={10} className='text-center'>No se encontraron datos</TableCell>
            </TableRow>) : (dataTable2.map((backup) => (
              <TableRow key={backup.idBackup}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{backup.idEmpleadoNavigation.nombre} {backup.idEmpleadoNavigation.apellido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{moment(backup.fechaBackup).format('YYYY-MM-DD')}</p>
                </TableCell>
              </TableRow>
            )))}
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
    </>
  )
}

export default Backup;
