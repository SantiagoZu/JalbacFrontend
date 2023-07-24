import React, { useState, useEffect } from 'react'
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
  Button,
  Pagination,
  Input
} from '@windmill/react-ui'
import {  SearchIcon } from '../../icons';
import response from '../../utils/demo/dataPedidos'
import responseDetalles from '../../utils/demo/dataHistorialEstadoPedido'
import {ModalDetallesProducto} from './components/HistorialPedidosComponents/ModalDetallesProducto';
import { useHisEstadoPedido } from '../../services/hooks/useHisEstadoPedido'
const response2 = response.concat([])
const responseDetallesProductos = responseDetalles.concat([])

function HistorialEstadoPedidos() {

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
  /* Despliegue modal editar */


  /* Despliegue modal ver detalle */
  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }

  const {hisEstadoPedido} = useHisEstadoPedido()



  return (
    <>
      <PageTitle>Historial Estado Pedidos</PageTitle>
      <SectionTitle>Tabla Historial Estado Pedidos</SectionTitle>

      <div className="flex ml-auto mb-6">

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
              <TableCell>Fecha pedido recibido</TableCell>
              <TableCell>Cliente</TableCell>              
              <TableCell>Fecha entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {hisEstadoPedido.map((pedido, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idHisEstadoPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idPedidoNavigation.fechaPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idPedidoNavigation.idCliente}</p>
                </TableCell>               
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idPedidoNavigation.fechaEntrega}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idEstadoNavigation.nombre}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={openModal}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
                  <ModalDetallesProducto isOpen={modalIsOpen} isClose={closeModal}/>
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

export default HistorialEstadoPedidos