import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { usePedidos } from '../../services/hooks/usePedidos'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { SpanError } from '../../components/styles/styles'
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
import { Field, Formik } from 'formik'
import { CustomInput } from '../../components/CustomInput'
import { useClientes } from '../../services/hooks/useClientes'
import { useDetallePedidos } from '../../services/hooks/useDetallePedidos'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ModalCrearProducto } from './components/PedidosComponents/ModalCrearProducto'
import { ModalEditarProducto } from './components/PedidosComponents/ModalEditarProducto'
import { initialValues, validateInputs } from './components/PedidosComponents/PedidosFormValidations/PedidosFormik'
import { useEmpleados } from '../../services/hooks/useEmpleados'


function EditarPedido() {

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




  
  const [detallePedidoAEditar, setdetallePedidoAEditar] = useState();
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)
  const [idProducto, setIdProducto] = useState()
  const [isClose, setIsClose] = useState(false)


  function closeModalIncorrect() {
    setIsClose(true)
  }
  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }

  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }
  function openModalEditarProducto(obj , id) {
    setModalIsOpenEditarProducto(true);
    setData(obj)
    setIdProducto(id)
  }

  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }
  const [idPedidoActual, setIdPedidoActual] = useState('')
  function changeIdPedidoActual(id) {
    setIdPedidoActual(id)
  }

  function setData(obj) {
    setdetallePedidoAEditar(obj);
  }
  const { detallePedidos } = useDetallePedidos()
  const { postPedidos } = usePedidos()
  const { clientes } = useClientes()
  const {empleados} = useEmpleados();
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
  const [productos, setProductos] = useState([]);
  function getProduct(product) {
    setProductos([
      ...productos,
      product
    ])
  }
  function updateTable(product) {
    let updatedProducts = productos.map((detallePedido, index) => {
      if(product.id == index) {
        return product
      }
      else {
        return detallePedido
      }
    })
    setProductos(updatedProducts)
   
  }
  async function deleteProduct(id)  {
    await showAlertDeleted('Estas seguro que deseas eliminar este producto?' , 'warning').then(response => {
      if(response.isConfirmed) {
        setProductos(
          productos.filter((detallePedido, index) => {
            return index !== id
          })
        )
      }
    })
  }
  return (
    <>
      <PageTitle>Crear pedido</PageTitle>

      <Formik
        initialValues={initialValues}
        validate={() => ({})}
        onSubmit={(values, { resetForm }) => {

          const updatedValues = {
            ...values,
            idEstado: 1,
            detallesPedido: productos
          };

          console.log(updatedValues);
          let responseCrearPedido = postPedidos(updatedValues).then((response) => {
            resetForm();
            changeIdPedidoActual(response.data.resultado.idPedido)
            console.log('creacion de pedido')
            showAlertCorrect('Producto creado correctamente', 'success', isClose)
            setTimeout(() => {
              window.location.reload();
            }, 2600);
           
            return response

          }).catch(response => {
            showAlertIncorrect('No se pudo crear el pedido', 'error', isClose);
            console.log(updatedValues)
            console.log(response);
          });
          resetForm();
        }}
      >
        {({ errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex '>
              <Label className="m-5 flex-none  ">
                <span>Cliente</span>s
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
                {touched.fechaEntrega && errors.fechaEntrega && <SpanError>{errors.fechaEntrega}</SpanError>}
              </Label>
              <Field type='text' as='input' className='hidden' name='detallesPedido' id="detallesPedido" value={productos} />
            </div>

            <div className="flex ml-auto mb-6 justify-end">

              <Button className='flex-3' onClick={() => {
                openModalCrearProducto()
              }}>
                Agregar producto
                <span className="mb-1" aria-hidden="true">+</span>
              </Button>


              <div className="flex justify-center flex-none ml-5">
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
            <TableContainer >
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
                    <TableCell>Acciones</TableCell>
                  </tr>
                </TableHeader>
                <TableBody className="w-12">
                  {productos.length > 0 ?
                    productos.map((detallePedido, i) => (
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
                          {empleados.map((empleado) => {
                            return empleado.idEmpleado == detallePedido.idEmpleado ? <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.nombre}</p> : null  
                          })}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit" >
                              <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido , i)} />
                            </Button>

                            <Button layout="link" size="icon" aria-label="Delete" onClick={() => deleteProduct(i)} >
                              <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                          </div>
                        </TableCell>


                      </TableRow>
                    )
                    ) : null}
                </TableBody>
              </Table>


            </TableContainer>
            <div className="flex ml-auto mt-5 mb-6">
              <Button onClick={handleSubmit}>
                Crear pedido
                <span className="mb-1" aria-hidden="true">+</span>
              </Button>
            </div>

          </form>
        )}

      </Formik>
      {modalIsOpenCrearProducto && (
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedidoActual} updateTable={(product) => getProduct(product)} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} product={detallePedidoAEditar} updateTable={product => updateTable(product)} idProducto={idProducto}/>
      )}

    </>
  )
}

export default EditarPedido