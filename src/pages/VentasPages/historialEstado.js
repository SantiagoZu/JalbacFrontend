import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server';
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Modal, ModalHeader, ModalBody, ModalFooter, } from '@windmill/react-ui';
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
import { Input2 } from '../../components/Input';
import response from '../../utils/demo/dataHistorialEstadoPedido'
import responseDetalles from '../../utils/demo/dataHistorialEstadoProducto'
import { hacker } from 'faker/lib/locales/en';
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
  const [isModalOpenVerDetalle, setIsModalOpenVerDetalle] = useState(false)

  function openModalVerDetalle() {
    setIsModalOpenVerDetalle(true)
  }

  function closeModalVerDetalle() {
    setIsModalOpenVerDetalle(false)
  }

  /* Confirmación edición */



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
              <TableCell>Fecha Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Empleado encargado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
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
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.Fecha}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.Estado}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={openModalVerDetalle}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
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

      <Modal isOpen={isModalOpenVerDetalle} onClose={closeModalVerDetalle}  >
        <ModalHeader className='mb-8'>Detalles producto</ModalHeader>
        <ModalBody>
          <TableContainer >
            <Table >
              <TableHeader>
                <tr >
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre anillo</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Peso</TableCell>
                  <TableCell>Tamaño anillo</TableCell>
                  <TableCell>Tamaño piedra</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>Detalle</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Empleado encargado</TableCell>
                  <TableCell>Motivo devolucion</TableCell>
                </tr>
              </TableHeader>
              <TableBody className="w-12">
                {dataTable3.map((producto, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.ID}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.nombre}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tipo}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.peso}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tamanoAnillo}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.tamanoPiedra}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.material}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.detalle}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.estado}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.fecha}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.empleadoAsignado}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{producto.motivoDevolucion}</p>
                    </TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
        </ModalBody>

        <ModalFooter>

          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModalVerDetalle}>
              Cerrar
            </Button>
          </div>

        </ModalFooter>
      </Modal>


    </>
  )
}

export default HistorialEstadoPedidos