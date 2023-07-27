import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { usePedidos } from '../../services/hooks/usePedidos'
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
import { EditIcon, TrashIcon, SearchIcon, Arrow, AdvertenciaPedidoDevuelto } from '../../icons';
import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../helpers/Alertas';
import { ModalDetallePedido } from './components/PedidosComponents/ModalDetallePedido';
import { returnDate } from '../../helpers/parseDate'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'



function Pedidos() {

  const {pedidos, deletePedidos } = usePedidos();
  const history = useHistory();  
  const [modalIsOpenDetallePedido, setModalIsOpenDetallePedido] = useState(false)
  const [idPedidoForDetalle, setIdPedidoForDetalle] = useState()
  

  function openModalDetallePedido(idPedido) {
    setModalIsOpenDetallePedido(true);
    setIdPedidoForDetalle(idPedido)
  }
  
  function closeModalDetallePedido(){
    setModalIsOpenDetallePedido(false);
  }
  const pedidos2 = pedidos.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])
  // pagination setup
  const resultsPerPage = 5
  const totalResults = pedidos2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  useEffect(() => {
    const filteredData = searchFilter(pedidos2, search);
    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [pedidos, pageTable2, search]);

  const searchFilter = (data, searchValue) => {
    if (!searchValue) {
      return data;
    }

    const searchTerm = searchValue.toLowerCase();

    return data.filter((pedido) => (
      pedido.fechaRecibido.toLowerCase().includes(searchTerm) ||
      pedido.cliente.toLowerCase().includes(searchTerm) ||
      pedido.fechaEntrega.toLowerCase().includes(searchTerm) ||
      pedido.estado.toLowerCase().includes(searchTerm) 
    ));
  };
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  
  return (
    <>
      <PageTitle>Pedidos</PageTitle>
      

      <div className="flex ml-auto mb-6">
        <Button onClick={() => history.push('/app/crearPedido') }>
          Crear pedido
          <span className="ml-1" aria-hidden="true">+</span>
        </Button>
       

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
              
              <TableCell>Fecha Recibido</TableCell>
              <TableCell>Cliente</TableCell>          
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
              <TableCell>Cambiar estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((pedido) => (
              <TableRow key={pedido.idPedido}>               
                <TableCell> 
                  <p className="text-xs text-gray-600 dark:text-gray-400">{returnDate(pedido.fechaPedido)}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idClienteNavigation.nombre}</p>
                </TableCell>           
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{returnDate(pedido.fechaEntrega)}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idEstadoNavigation.nombre}</p>
                </TableCell>
                
                <TableCell>
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={() => openModalDetallePedido(pedido.idPedido)}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>

                </TableCell>
                <TableCell>
                <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" >
                    <Arrow className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={() => history.push('/app/editarPedido', {idPedido: pedido.idPedido, pedido : pedido})} >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    
                    <Button layout="link" size="icon" aria-label="Delete" >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete" >
                      {pedido.idEstadoNavigation.nombre == 'Devuelto' ?  (
                        <AdvertenciaPedidoDevuelto className='text-red-500 w-5 h-5' aria-hidden="true" />
                      ) : null}  
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
      {modalIsOpenDetallePedido && (
        <ModalDetallePedido isOpen={modalIsOpenDetallePedido} isClose={closeModalDetallePedido} idPedido={idPedidoForDetalle}/>
      )}
     
      
    </>
  )
}

export default Pedidos