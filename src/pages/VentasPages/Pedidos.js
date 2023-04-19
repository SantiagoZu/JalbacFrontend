import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

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
import response from '../../utils/demo/dataPedidos'
import responseDetalles from '../../utils/demo/dataProductos'
import {ModalCrearPedido} from './components/PedidosComponents/ModalCrearPedido';

const response2 = response.concat([])
const responseDetallesProductos = responseDetalles.concat([])

function Pedidos() {

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
    setDataTable3(responseDetallesProductos.slice((pageTable3 - 1) * resultsPerPage, pageTable3 * resultsPerPage))
  }, [pageTable3])
  
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal(){
    setModalIsOpen(false);
  }

  return (
    <>
      <PageTitle>Pedidos</PageTitle>
      <SectionTitle>Tabla pedidos</SectionTitle>

      <div className="flex ml-auto mb-6">
        <Button onClick={openModal}>
          Crear pedido
          <span className="ml-1" aria-hidden="true">
            +
          </span>
        </Button>
        <ModalCrearPedido isOpen={modalIsOpen} isClose={closeModal}/>

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
              <TableCell>ID</TableCell>
              <TableCell>Fecha Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Empleado encargado</TableCell>
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((pedido, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.ID}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.FechaPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.Cliente}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.EmpleadosAsignado}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.FechaEntrega}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.Estado}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit">
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={openModal}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
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

export default Pedidos