import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { returnDate } from '../../helpers/parseDate'
import { Table, TableHeader, TableCell, TableBody, TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input
} from '@windmill/react-ui'
import { SearchIcon } from '../../icons';
import { useHisEstadoPedido } from '../../services/hooks/useHisEstadoPedido'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function HistorialEstadoPedidos() {
  const history = useHistory();
  const { hisEstadoPedido } = useHisEstadoPedido()
  const hisPedidos2 = hisEstadoPedido.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = hisPedidos2.length
  console.log(hisEstadoPedido)
 
  function onPageChangeTable2(p) {
    setPageTable2(p)
  }

  const searchFilter = (data, searchValue) => {
    if (!searchValue) {
      return data;
    }

    const searchTerm = searchValue.toLowerCase();

    return data.filter((hisEstadoPedido) => (
      hisEstadoPedido.idPedidoNavigation.fechaPedido.toLowerCase().includes(searchTerm) ||
      hisEstadoPedido.idPedidoNavigation.fechaEntrega.toLowerCase().includes(searchTerm) ||
      hisEstadoPedido.idPedidoNavigation.idClienteNavigation.nombre.toLowerCase().includes(searchTerm)
    ));
  };

  useEffect(() => {
    const filteredData = searchFilter(hisPedidos2, search);
    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [hisEstadoPedido, pageTable2, search]);

  const searcher = (e) => {
    setSearch(e.target.value)
  }


  const [modalIsOpen, setModalIsOpen] = useState(false)

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }




  return (
    <>
      <PageTitle>Historial de estados</PageTitle>
      <div className="flex ml-auto mb-6">
        <div className="flex justify-center flex-1 ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
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
            <tr >
              <TableCell>Fecha recibido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha cambio de estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.length === 0 ? (<TableRow>
              <TableCell colSpan={10} className='text-center'>No se encontraron datos</TableCell>
            </TableRow>) : (dataTable2.map((pedido, i) => (
              <TableRow key={i}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{returnDate(pedido.idPedidoNavigation.fechaPedido)}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idPedidoNavigation.idClienteNavigation.nombre}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{returnDate(pedido.idPedidoNavigation.fechaEntrega)}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idEstadoNavigation.nombre}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{returnDate(pedido.fecha)}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={() => history.push('/app/hisDetalles', { idPedidoHistorial: pedido.idPedido })}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
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

export default HistorialEstadoPedidos