import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import { parsearFecha } from '../../../../helpers/parseDate'
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
  Input,
} from '@windmill/react-ui'
import { SearchIcon } from '../../../../icons'
import { usePedidos } from '../../../../services/hooks/usePedidos';
import { ModalDetallePedido } from './ModalDetallePedido';
import STYLE_INPUT from '../../../../helpers/styleInputDatalist'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'

function PedidosEntregados() {

  const ENTREGADO = 3
  const { pedidos, pedidosEmpleado, idUsuario } = usePedidos()
  const [modalIsOpenDetallePedido, setModalIsOpenDetallePedido] = useState(false)
  const [idPedido, setIdPedido] = useState({})
  const [isPedidoActivo, setIsPedidoActivo] = useState(true)
  const { empleados } = useEmpleados()
  const empleadoLogged = empleados.find(empleado => empleado.idUsuario == idUsuario)
  const ES_ADMINISTRADOR = empleadoLogged !== undefined ? empleadoLogged.idUsuarioNavigation.idRolNavigation.nombre.toLowerCase() === 'administrador' : null

  const pedidos2 = ES_ADMINISTRADOR ? pedidos.concat([]) : pedidosEmpleado.concat([])
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])
  const [pageTable2, setPageTable2] = useState(1)
  const resultsPerPage = 5
  const [totalResults, setTotalResults] = useState(pedidos2.length)

  function openModalDetallePedido(pedido, activo) {
    setModalIsOpenDetallePedido(true);
    setIdPedido(pedido)
    setIsPedidoActivo(activo)
  }

  function closeModalDetallePedido() {
    setModalIsOpenDetallePedido(false);
  }

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  const searchFilter = (data, searchValue) => {
    if (!searchValue) {
      return data;
    }

    const searchTerm = searchValue.toLowerCase();

    return data.filter((pedidos) => (
      pedidos.idClienteNavigation.nombre.toLowerCase().includes(searchTerm) ||
      pedidos.fechaEntrega.toLowerCase().includes(searchTerm) ||
      pedidos.fechaPedido.toLowerCase().includes(searchTerm)
    ));
  };

  useEffect(() => {
    let filteredData = searchFilter(pedidos2, search)
    filteredData = filteredData.filter(pedido => pedido.idEstado === ENTREGADO)
    setTotalResults(filteredData.length)

    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)
    );

  }, [ES_ADMINISTRADOR ? pedidos : pedidosEmpleado, pageTable2, search])


  const searcher = (e) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <PageTitle>Pedidos entregados</PageTitle>

      <div className="flex ml-auto mb-6 w-full justify-end">

        <div className=''>
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4 dark:text-white" aria-hidden="true" />
            </div>
            <Input
              className={STYLE_INPUT.replace('pl-4', 'pl-8')}
              placeholder="Buscar pedido"
              value={search}
              onChange={searcher}

            />
          </div>
        </div>

      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell className="text-white">Fecha Recibido</TableCell>
              <TableCell className="text-white">Cliente</TableCell>
              <TableCell className="text-white">Fecha Entrega</TableCell>
              <TableCell className="text-white">Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className='text-center'>No se encontraron datos</TableCell>
              </TableRow>)
              : (dataTable2.map((pedido) => {
                return (
                  <TableRow key={pedido.idPedido}>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{parsearFecha(pedido.fechaPedido)}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idClienteNavigation.nombre} {pedido.idClienteNavigation.apellido}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{parsearFecha(pedido.fechaEntrega)}</p>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModalDetallePedido(pedido, pedido.isActivo)}>
                          <SearchIcon className="w-5 h-5 " aria-hidden="true" />
                        </Button>

                      </div>
                    </TableCell>
                  </TableRow>
                )
              }

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

      <ModalDetallePedido isOpen={modalIsOpenDetallePedido} isClose={closeModalDetallePedido} pedido={idPedido} isActivo={isPedidoActivo} />

    </>
  )
}

export default PedidosEntregados 
