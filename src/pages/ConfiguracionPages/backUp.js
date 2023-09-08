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
import { showAlertDeleted, showAlertIncorrect, showAlertCorrect} from '../../helpers/Alertas';
import PageTitle from '../../components/Typography/PageTitle'
import { SearchIcon, PlusCircle} from '../../icons';
import { useBackup } from '../../services/hooks/useBackup'
import moment from 'moment';


function Backup() {

  const { backup, getBackup, getBackupDownload, postBackup, idUsuario } = useBackup();
  const backup2 = backup.concat([])
  const objectPost = { idEmpleado: parseInt(idUsuario) }

  const resultsPerPage = 5
  const [totalResults, setTotalResults] = useState(backup2.length)
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])
  const [creadoExitoso, setCreadoExitoso] = useState(false)

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  useEffect(() => {
    setTotalResults(backup2.length)
    setDataTable2(backup2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2, backup])

  function openModalCreate(obj) {
    showAlertDeleted(
      '¿Estás seguro que deseas crear una copia de seguridad?',
      'question',
      '',
      '',
      '¡Sí, crear!',
    ).then((result) => {
      if (result.isConfirmed) {
        getBackupDownload()
        postBackup(obj)
          .then(response => {
            setCreadoExitoso(true)
            showAlertCorrect('Copia de seguridad creada correctamente', 'success');
          })
          .catch(response => {
            console.log(response)
              showAlertIncorrect('Error al crear la copia de seguridad', 'error');
          });
      }
    });
  }

  useEffect(() => {
    if (creadoExitoso) {
      getBackup()
      setCreadoExitoso(false)
    }
  }, [creadoExitoso])
  

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
  )}

export default Backup;
