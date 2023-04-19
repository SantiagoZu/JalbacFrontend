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
import response from '../../utils/demo/dataBackup'
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

  const alertEliminado = () => {
    Swal.fire({
      title: '¿Estás seguro que desea crear el BackUp?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, crear'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Creado!',
          'El BackUp se ha creado correctamente.',
          'success'
        )
      }
    })

  }

  return (
    <>
      <PageTitle>Copias de seguridad</PageTitle>

      <div className="flex ml-auto mb-6">
        <Button onClick={alertEliminado}>
          Crear BackUp
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
              placeholder="Buscar BackUp"
            />
          </div>
        </div>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>Id</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Fecha BackUp</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((NoConfioEnNingunaEsNormalQueTodasFallen, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{NoConfioEnNingunaEsNormalQueTodasFallen.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{NoConfioEnNingunaEsNormalQueTodasFallen.Usuario}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{NoConfioEnNingunaEsNormalQueTodasFallen.fecha}</p>
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
