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
import { EditIcon, TrashIcon, SearchIcon } from '../../icons';
import response from '../../utils/demo/dataPedidos'
import {  showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../helpers/Alertas';
import {ModalCrearPedido} from './components/PedidosComponents/ModalCrearPedido';
import {ModalDetallePedido} from './components/PedidosComponents/ModalDetallePedido';
import {ModalEditarPedido} from './components/PedidosComponents/ModalEditarPedido';
const responsePedido = response.concat([])


function Pedidos() {

  const [dataPedido, setDataPedidos] = useState([]);
  const {pedidos, deletePedidos } = usePedidos();
 

  const [PageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState([])
 
 

  const resultsPerPage = 10
  const totalResults = pedidos.length
 

  function onPageChangeTable2(p) {
    setPageTable(p)
  }
  
  useEffect(() => {
    setDataTable(pedidos.slice((PageTable - 1) * resultsPerPage, PageTable * resultsPerPage))
  }, [PageTable])
 
  
  const [modalIsOpenAgregarPedido, setModalIsOpenAgregarPedido] = useState(false)
  const [modalIsOpenDetallePedido, setModalIsOpenDetallePedido] = useState(false)
  const [modalIsOpenEditarPedido, setModalIsOpenEditarPedido] = useState(false)

  const [idPedidoForDetalle, setIdPedidoForDetalle] = useState()
  function openModalCrearPedido() {
    setModalIsOpenAgregarPedido(true);
  }

  function closeModalAgregarPedido(){
    setModalIsOpenAgregarPedido(false);
  }
  function openModalDetallePedido(idPedido) {
    setModalIsOpenDetallePedido(true);
    setIdPedido(idPedido)
  }
  function setIdPedido(idPedido) {
    setIdPedidoForDetalle(idPedido)
  }
  function closeModalDetallePedido(){
    setModalIsOpenDetallePedido(false);
  }
  function openModalEditarPedido(obj) {
    setModalIsOpenEditarPedido(true);
    setData(obj)
  }
  function closeModalEditarPedido(){
    setModalIsOpenEditarPedido(false);
  }
  
  function setData(obj) {
    setDataPedidos(obj);
  }

  
  function eliminarPedido(idPedido) {
    showAlertDeleted(
      '¿Estás seguro que deseas eliminar el pedido?',
      'warning',
      'Eliminado correctamente',
      'success'
    ).then((result) => {
      if (result.isConfirmed) {
        deletePedidos(idPedido)
          .then(response => {
            showAlertCorrect('Pedido eliminado correctamente.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(response => {
            showAlertIncorrect('Error al eliminar el pedido.', 'error');
            console.log(response)
          });
      }
    });
  }
  return (
    <>
      <PageTitle>Pedidos</PageTitle>
      <SectionTitle>Tabla pedidos</SectionTitle>

      <div className="flex ml-auto mb-6">
        <Button onClick={openModalCrearPedido}>
          Crear pedido
          <span className="ml-1" aria-hidden="true">+</span>
        </Button>
        {modalIsOpenAgregarPedido && 
          (<ModalCrearPedido isOpen={modalIsOpenAgregarPedido} isClose={closeModalAgregarPedido}/>)
        }

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
              <TableCell>Fecha Recibido</TableCell>
              <TableCell>Cliente</TableCell>          
              <TableCell>Fecha Entrega</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Detalles Producto</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.fechaPedido}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idClienteNavigation.nombre}</p>
                </TableCell>           
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.fechaEntrega}</p>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idEstadoNavigation.nombre}</p>
                </TableCell>
                <TableCell >
                  <Button layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={() => openModalDetallePedido(pedido.idPedido)}>
                    <SearchIcon className="w-5 h-5 ml-6" aria-hidden="true" />
                  </Button>
                  
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModalEditarPedido(pedido)}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    
                    <Button layout="link" size="icon" aria-label="Delete" onClick={() => eliminarPedido(parseInt(pedido.idPedido))}>
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
      {modalIsOpenDetallePedido && (
        <ModalDetallePedido isOpen={modalIsOpenDetallePedido} isClose={closeModalDetallePedido} idPedido={idPedidoForDetalle}/>
      )}
      {modalIsOpenEditarPedido && (
        <ModalEditarPedido isOpen={modalIsOpenEditarPedido} isClose={closeModalEditarPedido} object={dataPedido}/>
      )}
      
    </>
  )
}

export default Pedidos