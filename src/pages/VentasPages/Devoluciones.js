import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui';
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import CTA from '../../components/CTA'
import Swal from 'sweetalert2'
import button2 from '../../button';

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
import { EditIcon, TrashIcon, SearchIcon } from '../../icons';
import { Input2 } from '../../components/Input';
import response from '../../utils/demo/dataPedidos'
import responseDetalles from '../../utils/demo/dataProductos';
import {ModalDetalleProducto} from './components/DevolucionesComponents/ModalDetalleProducto';
import { hacker } from 'faker/lib/locales/en';

const response2 = response.concat([])

function Devoluciones() {

  const [pageTable2, setPageTable2] = useState(1)
  const [pageTable3, setPageTable3] = useState(1)

  const [dataTable2, setDataTable2] = useState([])
  const [dataTable3, setDataTable3] = useState([])

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length
  const totalResults2 = response.length

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  function onPageChangeTable3(p) {
    setPageTable3(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setDataTable2(response2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])
  useEffect(() => {
    setDataTable3(responseDetalles.slice((pageTable3 - 1) * resultsPerPage, pageTable3 * resultsPerPage))
  }, [pageTable3])

  //despliegue modal
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }
  return (
    <>
    
      <PageTitle>Devoluciones</PageTitle>

      <SectionTitle>Tabla Devoluciones</SectionTitle>
      <div className="flex ml-auto mb-6">
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Buscar devolución"
            />
          </div>
        </div>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr >
              <TableCell>ID</TableCell>
              <TableCell>Fecha Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((devolucion, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.FechaPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.Cliente}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.FechaEntrega}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{devolucion.Estado}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={openModal}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
                  <ModalDetalleProducto isClose={closeModal} isOpen={modalIsOpen}/>
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

export default Devoluciones
