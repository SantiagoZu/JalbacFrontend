import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { usePedidos } from '../../services/hooks/usePedidos'
import { Input } from '@windmill/react-ui'
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination} from '@windmill/react-ui'
import { EditIcon, TrashIcon, SearchIcon, Arrow, AdvertenciaPedidoDevuelto, Inactivar } from '../../icons';
import { ModalDetallePedido } from './components/PedidosComponents/ModalDetallePedido';
import { ModalDetallePedidoDevuelto } from './components/PedidosComponents/ModalDetallePedidoDevuelto'
import { ModalEditarEstado } from './components/PedidosComponents/ModalEditarEstado'
import { parsearFecha } from '../../helpers/parseDate'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDetallePedidos } from '../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../services/hooks/useEmpleados'
import Swal from 'sweetalert2'
import { showAlertCorrect , showAlertInactivarOActivarPedido } from '../../helpers/Alertas'

function Pedidos() {
  const RECIBIDO = 1
  const EN_PRODUCCION = 2
  const ENTREGADO = 3
  const DEVUELTO = 4
  const { pedidos, getPedidos, pedidosEmpleado, idUsuario, toggleEstadoPedido } = usePedidos();
  const { empleados } = useEmpleados()
  const { getDetallePedidos } = useDetallePedidos()
  const empleadoLogged = empleados.find(empleado => empleado.idUsuario == idUsuario)
  const ES_ADMINISTRADOR = empleadoLogged != undefined ? empleadoLogged.idUsuarioNavigation.idRolNavigation.nombre.toLowerCase() == 'administrador' : null
  const history = useHistory();
  const [modalIsOpenDetallePedido, setModalIsOpenDetallePedido] = useState(false)
  const [modalIsOpenEditarEstado, setModalIsOpenEditarEstado] = useState(false)
  const [modalIsOpenDetallePedidoDevuelto, setModalIsOpenDetallePedidoDevuelto] = useState(false)

  const [idPedido, setIdPedido] = useState({})
  const [pedidoEditarEstado, setPedidoEditarEstado] = useState({})

  function openModalDetallePedido(pedido) {
    setModalIsOpenDetallePedido(true);
    setIdPedido(pedido)
  }

  function closeModalDetallePedido() {
    setModalIsOpenDetallePedido(false);
  }
  function openModalDetallePedidoDevuelto(pedido) {
    setModalIsOpenDetallePedidoDevuelto(true);
    setIdPedido(pedido)
  }

  function closeModalDetallePedidoDevuelto() {
    setModalIsOpenDetallePedidoDevuelto(false);
  }
  function openModalEditarEstado(pedido) {
    setModalIsOpenEditarEstado(true);
    setPedidoEditarEstado(pedido)
  }

  function closeModalEditarEstado() {
    setModalIsOpenEditarEstado(false);
  }

  
  const pedidos2 = ES_ADMINISTRADOR ? pedidos.concat([]) : pedidosEmpleado.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = pedidos2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  useEffect(() => {
    const filteredData = searchFilter(pedidos2, search);
    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [ES_ADMINISTRADOR ? pedidos : pedidosEmpleado, pageTable2, search]);

  const searchFilter = (data, searchValue) => {
    if (!searchValue) return data;
    const searchTerm = searchValue.toLowerCase();

    return data.filter((pedido) => (
      pedido.fechaPedido.toLowerCase().includes(searchTerm) ||
      pedido.idClienteNavigation.nombre.toLowerCase().includes(searchTerm) ||
      pedido.fechaEntrega.toLowerCase().includes(searchTerm) ||
      pedido.isActivo.toString().toLowerCase().includes(searchTerm) ||
      pedido.idEstadoNavigation.nombre.toLowerCase().includes(searchTerm)
    ));
  };
  const searcher = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    if (!modalIsOpenDetallePedido || !modalIsOpenEditarEstado || !modalIsOpenDetallePedidoDevuelto) {
      getDetallePedidos()
      getPedidos()
    }
  }, [modalIsOpenDetallePedido, modalIsOpenEditarEstado, modalIsOpenDetallePedidoDevuelto])
  async function inactivarOActivarPedido(pedido, inactivarOActivar) {
    try {
      const mensaje = inactivarOActivar ? '¿Estas seguro que deseas activar este pedido?' : '¿Estas seguro que deseas inactivar este pedido?' 
      const respuesta = await showAlertInactivarOActivarPedido(mensaje)            
      if(respuesta.isConfirmed) {
        await toggleEstadoPedido(pedido, inactivarOActivar)
        await getPedidos()        
      }      
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <PageTitle>Pedidos</PageTitle>

      <div className="flex mb-6 gap-3 ml-auto ">
        <Button onClick={() => history.push('/app/crearPedido')}>
          Crear pedido
          <span className="ml-1" aria-hidden="true">+</span>
        </Button>
        <div className="flex  ml-5">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4 text-white" aria-hidden="true" />
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
              <TableCell>Fase</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cambiar estado</TableCell>
              <TableCell>Acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.length === 0 ? (              
              <TableRow>
                <TableCell colSpan={10} className='text-center'>No se encontraron datos</TableCell>
              </TableRow>)
              : (dataTable2.map((pedido) => {
                const ES_RECIBIDO = pedido.idEstado == RECIBIDO;
                const ES_EN_PRODUCCION = pedido.idEstado == EN_PRODUCCION;
                const ES_ENTREGADO = pedido.idEstado == ENTREGADO;
                const ES_DEVUELTO = pedido.idEstado == DEVUELTO;
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
                      <p className="text-xs text-gray-600 dark:text-gray-400">{pedido.idEstadoNavigation.nombre}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-xs text-gray-600 dark:text-gray-400" type={pedido.isActivo ? "success" : "danger"}>{pedido.isActivo ? 'Activo' : 'Inactivo'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button disabled={ES_ENTREGADO || ES_DEVUELTO ? true : false} layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={() => openModalEditarEstado(pedido)}>
                        <Arrow className="w-5 h-5 ml-6" aria-hidden="true" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModalDetallePedido(pedido)}>
                          <SearchIcon className="w-5 h-5 " aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="icon" aria-label="Delete" onClick={() => openModalDetallePedidoDevuelto(pedido)} >
                          {ES_DEVUELTO ? (
                            <AdvertenciaPedidoDevuelto className='text-yellow-500 w-5 h-5' aria-hidden="true" />
                          ) : null}
                        </Button>
                        {ES_RECIBIDO ? (
                          <Button layout="link" size="icon" aria-label="Edit" onClick={() => history.push('/app/editarPedido', { idPedido: pedido.idPedido, pedido: pedido })} >
                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                        ) : null
                        }
                        {!ES_RECIBIDO ? (
                          <Button layout="link" size="icon" aria-label="Edit" onClick={() => inactivarOActivarPedido(pedido , pedido.isActivo ? false : true)} >
                            <Inactivar className="w-5 h-5 text-red-700" aria-hidden="true" />
                          </Button>
                        ) : null
                        }
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
      {modalIsOpenDetallePedido && (
        <ModalDetallePedido isOpen={modalIsOpenDetallePedido} isClose={closeModalDetallePedido} pedido={idPedido} />
      )}
      {modalIsOpenDetallePedidoDevuelto && (
        <ModalDetallePedidoDevuelto isOpen={modalIsOpenDetallePedidoDevuelto} isClose={closeModalDetallePedidoDevuelto} pedido={idPedido} />
      )}
      {modalIsOpenEditarEstado && (
        <ModalEditarEstado isOpen={modalIsOpenEditarEstado} isClose={closeModalEditarEstado} pedido={pedidoEditarEstado} />
      )}

    </>
  )
}

export default Pedidos