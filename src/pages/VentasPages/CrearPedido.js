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
import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../helpers/Alertas';
import { ModalCrearPedido } from './components/PedidosComponents/ModalCrearPedido';
import { ModalDetallePedido } from './components/PedidosComponents/ModalDetallePedido';
import { ModalEditarPedido } from './components/PedidosComponents/ModalEditarPedido';
import { returnDate, today } from '../../helpers/parseDate'
import { Formik } from 'formik'
import { CustomInput } from '../../components/CustomInput'
import { useClientes } from '../../services/hooks/useClientes'
import { useDetallePedidos } from '../../services/hooks/useDetallePedidos'
import { ModalCrearProducto } from './components/PedidosComponents/ModalCrearProducto'
import { ModalEditarProducto } from './components/PedidosComponents/ModalEditarProducto'
const responsePedido = response.concat([])


function CrearPedido() {

  const [dataPedido, setDataPedidos] = useState([]);
  const { pedidos, deletePedidos } = usePedidos();


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





  const [dataDetallePedido, setDataDetallePedidos] = useState([]);
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)


  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }

  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }
  function openModalEditarProducto(obj) {
    setModalIsOpenEditarProducto(true);
    setData(obj)
  }

  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }
  const [idPedidoActual, setIdPedidoActual] = useState('')
  function changeIdPedidoActual(id) {
    setIdPedidoActual(id)
  }

  function setData(obj) {
    setDataPedidos(obj);
  }
  const { detallePedidos } = useDetallePedidos()
  const { clientes } = useClientes()
  const clientesDropdown = [
    { value: null, label: 'Elija el cliente' }
  ]
  for (const id in clientes) {
    const cliente = {
      value: parseInt(clientes[id].idCliente),
      label: clientes[id].nombre
    }
    clientesDropdown.push(cliente)
  }


  return (
    <>
      <PageTitle>Crear pedido</PageTitle>

      <Formik
        initialValues={{
          idCliente: '',
          fechaEntrega: today.toString()
        }
        }
      >
        <form>
          <div className='flex '>
            <Label className="m-5 flex-none  ">
              <span>Cliente</span>
              <CustomInput
                type="select"
                id="idCliente"
                name="idCliente"
                placeholder="Cliente ejemplo"
                options={clientesDropdown}
              />

            </Label>
            <Label className=" m-5 flex-none ">
              <span>Fecha Entrega</span>
              <CustomInput
                type="date"
                id="fechaEntrega"
                name="fechaEntrega"
                placeholder=""

              />

            </Label>
          </div>

        </form>
      </Formik>
      <div className="flex ml-auto mb-6">

        <Button onClick={() => {
          openModalCrearProducto()
        }}>
          Agregar producto
          <span className="mb-1" aria-hidden="true">+</span>
        </Button>


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
      <TableContainer className={'w-100'} >
        <Table >
          <TableHeader>
            <tr >
             
              <TableCell>Nombre anillo</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Tamaño anillo</TableCell>
              <TableCell>Tamaño piedra</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Detalle</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Empleado encargado</TableCell>
              <TableCell>Motivo devolucion</TableCell>
              <TableCell>acciones</TableCell>
            </tr>
          </TableHeader>
          <TableBody className="w-12">
            {
              detallePedidos.map((detallePedido, i) => (
                <TableRow key={i}>
                
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.nombreAnillido}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.tipo}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.peso}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.tamanoAnillo}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.tamanoPiedra}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.material}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.detalle}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.cantidad}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idEmpleado}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.motivoDevolucion}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button layout="link" size="icon" aria-label="Edit" >
                        <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido)} />
                      </Button>

                      <Button layout="link" size="icon" aria-label="Delete" >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>


                </TableRow>
              )
              )}
          </TableBody>
        </Table>


      </TableContainer>
      <div className="flex ml-auto mt-5 mb-6">
        <Button >
          Crear pedido
          <span className="mb-1" aria-hidden="true">+</span>
        </Button>
      </div>
      {modalIsOpenCrearProducto && (
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedidoActual} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} object={dataDetallePedido} />
      )}

    </>
  )
}

export default CrearPedido