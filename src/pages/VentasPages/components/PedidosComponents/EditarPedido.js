import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { SpanError } from '../../../../components/styles/styles'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, SearchIcon } from '../../../../icons';

import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import moment from 'moment'

import { returnDate, today } from '../../../../helpers/parseDate'
import { Field, Formik } from 'formik'
import { CustomInput } from '../../../../components/CustomInput'
import { useClientes } from '../../../../services/hooks/useClientes'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos'
import { ModalCrearProducto } from './ModalCrearProducto'
import { ModalEditarProducto } from './ModalEditarProducto'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

function EditarPedido() {
  const location = useLocation()
  const idPedido = location.state.idPedido
  const pedido = location.state.pedido
 
  const [detallePedidoAEditar, setdetallePedidoAEditar] = useState();
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)
  const [isClose] = useState(false)

  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }

  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }
  function openModalEditarProducto(obj, id = null ) {
    setModalIsOpenEditarProducto(true);
    setdetallePedidoAEditar(obj)    
  }

  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }

  const { detallePedidos ,setDetallePedidos ,postDetallePedidos, deleteDetallePedidos } = useDetallePedidos()
  const detallesPedido2 = detallePedidos.concat([])
  const [pageTable2, setPageTable2] = useState(1)  
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = detallesPedido2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  useEffect(() => {    
    setDataTable2(detallesPedido2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [detallePedidos, pageTable2]);

  const { updatePedidos } = usePedidos()
  const { clientes } = useClientes()
  const { empleados } = useEmpleados();
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
  const initialValuesPedido = {
    idCliente : pedido.idCliente || '',        
    fechaEntrega :  moment(pedido.fechaEntrega).format('YYYY-MM-DD') || ''
  }
  
  function getProduct(product) {
    setDetallePedidos([
      ...detallePedidos,
      product
    ])
  }
  function updateTable(product) {
    let updatedProducts = detallePedidos.map((detallePedido, index) => {
      if (product.idDetallePedido == index) {
        return product
      }
      else {
        return detallePedido
      }
    })
    setDetallePedidos(updatedProducts)

  }
  async function deleteProduct(id) {
    await showAlertDeleted('Estas seguro que deseas eliminar este producto?', 'warning').then(response => {
      if (response.isConfirmed) {
        setDetallePedidos(
          detallePedidos.filter((detallePedido, index) => {
            return index !== id
          })
        )
      }
    })
  }
  return (
    <>
      <PageTitle>Editar pedido</PageTitle>

      <Formik
        initialValues={initialValuesPedido}
        validate={() => ({})}
        onSubmit={(values, { resetForm }) => {

          const updatedValues = {
            ...values,            
          };

          console.log(updatedValues);
          let responseCrearPedido = updatePedidos(updatedValues).then((response) => {
            resetForm();
            
            console.log('update de pedido')
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
               {touched.idCliente && errors.idCliente && <SpanError>{errors.idCliente}</SpanError>} 
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
                  {
                    dataTable2.map((detallePedido, i) => idPedido == detallePedido.idPedido ? (
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
                              <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido)} />
                            </Button>

                            <Button layout="link" size="icon" aria-label="Delete" onClick={() => deleteProduct(i)} >
                              <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            </Button>
                          </div>
                        </TableCell>


                      </TableRow>
                    ) : null
                    )}
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
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedido} updateTable={(product) => getProduct(product)} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} product={detallePedidoAEditar} updateTable={product => updateTable(product)}  />
      )}

    </>
  )
}

export default EditarPedido