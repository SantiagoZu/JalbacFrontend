import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import { usePedidos } from '../../services/hooks/usePedidos'
import { Input } from '@windmill/react-ui'
import { Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Badge, Button, Pagination } from '@windmill/react-ui'
import {Exclamation, EditIcon, SearchIcon, Arrow, AdvertenciaPedidoDevuelto, Inactivar, PlusCircle, } from '../../icons';
import { ModalDetallePedido } from './components/PedidosComponents/ModalDetallePedido';
import { ModalDetallePedidoDevuelto } from './components/PedidosComponents/ModalDetallePedidoDevuelto'
import { parsearFecha } from '../../helpers/parseDate'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDetallePedidos } from '../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../services/hooks/useEmpleados'
import { alertEscribirMotivoInactivacion, showAlertCorrect, alertInactivar } from '../../helpers/Alertas'
import { useClientes } from '../../services/hooks/useClientes'
import STYLE_INPUT from '../../helpers/styleInputDatalist'

function Pedidos() {
  const RECIBIDO = 1
  const EN_PRODUCCION = 2
  const ENTREGADO = 3
  const DEVUELTO = 4
  const { pedidos, getPedidos, pedidosEmpleado, idUsuario, updateFase, disablePedido} = usePedidos();
  const { empleados } = useEmpleados()
  const { detallePedidos, getDetallePedidos } = useDetallePedidos()
  const empleadoLogged = empleados.find(empleado => empleado.idUsuario == idUsuario)
  const { clientes } = useClientes()
  const ES_ADMINISTRADOR = empleadoLogged != undefined ? empleadoLogged.idUsuarioNavigation.idRolNavigation.nombre.toLowerCase() == 'administrador' : null
  const history = useHistory();
  const [modalIsOpenDetallePedido, setModalIsOpenDetallePedido] = useState(false)
  const [modalIsOpenDetallePedidoDevuelto, setModalIsOpenDetallePedidoDevuelto] = useState(false)
  const [idPedido, setIdPedido] = useState({})
  const [isPedidoActivo, setIsPedidoActivo] = useState(true)


  function openModalDetallePedido(pedido, activo) {
    setModalIsOpenDetallePedido(true);
    setIdPedido(pedido)
    setIsPedidoActivo(activo)
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

  let pedidos2 = ES_ADMINISTRADOR ? pedidos.concat([]) : pedidosEmpleado.concat([])

  const [pageTable2, setPageTable2] = useState(1)
  const [search, setSearch] = useState("")
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const [totalResults, setTotalResults] = useState(pedidos2.length)


  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  
  const [inactivar, setInactivar] = useState(false)
  function toggleDatatableIsActivo() {
    setInactivar(inactivar => !inactivar)
  }
  
  const [filtrar, setFiltrar] = useState('')
  useEffect(() => {
    let filteredData = searchFilter(pedidos, search)
    filteredData = filteredData.filter(pedido => pedido.isActivo == !inactivar && pedido.idEstadoNavigation.nombre.toLowerCase().includes(filtrar.toLowerCase()) && pedido.idEstado != ENTREGADO)
    setTotalResults(filteredData.length)

    setDataTable2(filteredData.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage)
    );

  }, [ES_ADMINISTRADOR ? pedidos : pedidosEmpleado, pageTable2, search, filtrar, inactivar])
  const searchFilter = (data, searchValue) => {
    if (!searchValue) {
      return data
    }
    const searchTerm = searchValue.toLowerCase();

    return data.filter((pedido) => {

      return (
        pedido.fechaPedido.toLowerCase().includes(searchTerm) ||
        pedido.idClienteNavigation.nombre.toLowerCase().includes(searchTerm) ||
        pedido.fechaEntrega.toLowerCase().includes(searchTerm) ||
        pedido.idEstadoNavigation.nombre.toLowerCase().includes(searchTerm)
      )
    });
  };

  const searcher = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    if (!modalIsOpenDetallePedido || !modalIsOpenDetallePedidoDevuelto) {
      getDetallePedidos()
      getPedidos()
    }
  }, [modalIsOpenDetallePedido,  modalIsOpenDetallePedidoDevuelto])
  
  async function inactivarPedido(pedido ) {
    try {
      const mensaje = '¿Estás seguro que deseas inactivar este pedido?' 
      const respuesta = await alertInactivar(mensaje)
      if (respuesta.isConfirmed) {
        const responseMotivo = await alertEscribirMotivoInactivacion() 
        if(responseMotivo.isConfirmed) {

          await disablePedido(pedido, responseMotivo.value)
          await getPedidos()
          showAlertCorrect('El pedido se inactivó correctamente' , "success", () => null)
        } 
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function cambiarFase(pedido, detallesAEditar, fase) {
    try {
      const faseMensaje = fase == EN_PRODUCCION ? 'producción' : 'entregado'
      const mensaje = `¿Deseas pasar este pedido a ${faseMensaje}?`
      const respuesta = await alertInactivar(mensaje)
      if (respuesta.isConfirmed) {
        await updateFase(pedido, detallesAEditar, fase)
        await getPedidos()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <PageTitle>Pedidos</PageTitle>

      <div className="flex mb-6 gap-5 ml-auto  w-full">
        <div className="flex gap-3 flex-1">
          <p className='text-white self-center'> Filtrar pedidos por:</p>
          <Button className="bg-cyan-500" onClick={toggleDatatableIsActivo}  >
            {inactivar ? 'Activos' : 'Inactivos'}
          </Button>
          <div className=' flex justify-start gap-3'>
            <p className='text-white self-center'>Fase </p>
            <select className={STYLE_INPUT.replace('form-input', 'form-select') } onChange={(value) => setFiltrar(value.target.value)}>
              <option value="">Todos</option>
              <option value="recibido">Recibido</option>
              <option value="en producción">En producción</option>
              <option value="devuelto">Devuelto</option>
            </select>
          </div>
          
        </div>
        <Button iconRight={PlusCircle} onClick={() => history.push('/app/crearPedido')}>
          Crear pedido
        </Button>
        <div >
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center content-center pl-2">
              <SearchIcon className="w-4 h-4 dark:text-white" aria-hidden="true" />
            </div>
            <Input
              className={STYLE_INPUT.replace('pl-4','pl-8')}
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
              <TableCell className="text-white">Fecha Recibido</TableCell>
              <TableCell className="text-white">Cliente</TableCell>
              <TableCell className="text-white">Fecha Entrega</TableCell>
              <TableCell className="text-white">Fase</TableCell>
              <TableCell className="text-white">Estado</TableCell>
              <TableCell className="text-white">Cambiar fase</TableCell>
              <TableCell className="text-white">Acciones</TableCell>
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
                const ES_ACTIVO = pedido.isActivo
                const clientePedido = clientes.find(cliente => cliente.idCliente == pedido.idCliente)
                const detallesAEditar = detallePedidos.filter(detalle => detalle.idPedido == pedido.idPedido)
                const FASE = ES_RECIBIDO ? EN_PRODUCCION : ENTREGADO
                return  (
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
                    <TableCell title={!ES_ACTIVO ? "No puedes cambiar la fase de un pedido que esta inactivo" : ES_RECIBIDO ? "Pasar el pedido a producción" : ES_EN_PRODUCCION ? "Pasar el pedido a entregado" : ES_ENTREGADO ? "El pedido esta entregado" : ES_DEVUELTO ? "No puedes cambiar la fase de un pedido que esta devuelto" : null}>
                      <Button disabled={ES_ENTREGADO || ES_DEVUELTO || !ES_ACTIVO ? true : false} layout="link" className='ml-6 mr-6 pr-5' size="icon" aria-label="Edit" onClick={() => cambiarFase(pedido, detallesAEditar, FASE)}>
                        <Arrow className="w-5 h-5 ml-6" aria-hidden="true" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button layout="link" size="icon" aria-label="Edit" onClick={() => openModalDetallePedido(pedido, pedido.isActivo)}>
                          <SearchIcon className="w-5 h-5 " aria-hidden="true" />
                        </Button>

                        {ES_RECIBIDO ? (
                          <Button layout="link" size="icon" aria-label="Edit" onClick={() => history.push('/app/editarPedido', { idPedido: pedido.idPedido, pedido: pedido, clientePedido: clientePedido })} >
                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                        ) : null
                        }
                        {!ES_RECIBIDO && ES_ACTIVO ? (
                          <Button layout="link" size="icon" aria-label="Edit" onClick={() => inactivarPedido(pedido, pedido.isActivo ? false : true)} >
                            
                            <Inactivar className="w-5 h-5 text-red-700" aria-hidden="true" />
                          </Button>
                        ) : null
                        }

                        {ES_DEVUELTO && ES_ACTIVO ? (
                          <Button layout="link" size="icon" aria-label="Delete" onClick={() => openModalDetallePedidoDevuelto(pedido)} >
                            <AdvertenciaPedidoDevuelto className='text-yellow-500 w-5 h-5' aria-hidden="true" />
                          </Button>
                        ) : null}

                        {!ES_ACTIVO ? (
                          <Button title={pedido.motivoInactivacion} layout="link" size="icon" aria-label="Delete"  >
                            <Exclamation className='text-yellow-500 w-5 h-5' aria-hidden="true" />
                          </Button>
                        ) : null}
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
              key={totalResults}
            />
          )}
        </TableFooter>
      </TableContainer>
      
      {modalIsOpenDetallePedido && (
        <ModalDetallePedido isOpen={modalIsOpenDetallePedido} isClose={closeModalDetallePedido} pedido={idPedido} isActivo={isPedidoActivo} />
      )}
      
      {modalIsOpenDetallePedidoDevuelto && (
        <ModalDetallePedidoDevuelto isOpen={modalIsOpenDetallePedidoDevuelto} isClose={closeModalDetallePedidoDevuelto} pedido={idPedido} />
      )}

    </>
  )
}

export default Pedidos