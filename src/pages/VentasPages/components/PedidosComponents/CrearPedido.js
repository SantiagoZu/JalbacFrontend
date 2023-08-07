import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import { SpanError } from '../../../../components/styles/styles'
import moment from "moment";
import {
  Label,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../../../icons';
import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Field, Formik } from 'formik'
import { CustomInput } from '../../../../components/CustomInput'
import { useClientes } from '../../../../services/hooks/useClientes'
import { ModalCrearProducto } from './ModalCrearProducto'
import { ModalEditarProducto } from './ModalEditarProducto'
import { initialValues, validateInputs } from './PedidosFormValidations/PedidosFormik'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
import { usePedidos } from '../../../../services/hooks/usePedidos'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
function CrearPedido() {
  const history = useHistory()
  const [productoAEditar, setProductoAEditar] = useState();
  const [idProducto, setIdProducto] = useState()
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)

  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }
  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }

  function openModalEditarProducto(obj, id) {
    setModalIsOpenEditarProducto(true);
    setProductoAEditar(obj)
    setIdProducto(id)
  }
  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }

  const { postPedidos } = usePedidos()
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
  const [productos, setProductos] = useState([]);

  const productos2 = productos.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = productos2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  useEffect(() => {
    setDataTable2(productos2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [productos, pageTable2]);

  function getProduct(product) {
    setProductos([...productos, product])
  }
  function updateTable(product) {
    let updatedProducts = productos.map((detallePedido, index) => {
      if (product.id == index) {
        return product
      }
      else {
        return detallePedido
      }
    })
    setProductos(updatedProducts)
  }

  async function deleteProduct(id) {
    await showAlertDeleted('Estas seguro que deseas eliminar este producto?', 'warning').then(response => {
      if (response.isConfirmed) {
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
        validate={(values) => validateInputs(values)}
        onSubmit={(values, { resetForm }) => {
          const updatedValues = {
            ...values,
            idEstado: 1,
            detallesPedido: productos
          };
          if (productos.length <= 0) {
            showAlertIncorrect('Tienes que agregar almenos un producto', 'error', () => null);
          }
          else {
            let responseCrearPedido = postPedidos(updatedValues).then((response) => {
              resetForm();
              console.log('creacion de pedido')
              showAlertCorrect('Pedido creado correctamente', 'success', () => null)
              setTimeout(() => {
                window.location.reload();
              }, 2600);
              return response
            }).catch(response => {
              showAlertIncorrect('No se pudo crear el pedido', 'error', () => null);
              console.log(updatedValues)
              console.log(response);
            });
          }

        }}
      >
        {({ errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-row'>
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
                {touched.fechaEntrega && errors.fechaEntrega && <SpanError>{errors.fechaEntrega}</SpanError>}
              </Label>
              <Button className='flex-none  mt-5 mb-6 self-end  ' onClick={() => {
                openModalCrearProducto()
              }}>
                Agregar producto
                <span className="mb-1 ml-2" aria-hidden="true">+</span>
              </Button>
            </div>
            <TableContainer >
              <Table >
                <TableHeader>
                  <tr>
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
                  {dataTable2.length > 0 ?
                    dataTable2.map((detallePedido, i) => (
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
                            return empleado.idEmpleado == detallePedido.idEmpleado ? <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.nombre} {' '} {empleado.nombre}</p> : null
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit" >
                              <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido, i)} />
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

            <div className="flex ml-auto mt-5 mb-6 space-x-5">
              <Button onClick={handleSubmit}>
                Crear pedido
                <span className="mb-1 ml-2" aria-hidden="true">+</span>
              </Button>
              <Button layout="outline" onClick={() => history.push('/app/pedidos')}>
                Regresar a pedidos
              </Button>
            </div>
          </form>
        )}

      </Formik>
      {modalIsOpenCrearProducto && (
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} updateTable={(product) => getProduct(product)} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} product={productoAEditar} updateTable={product => updateTable(product)} idProducto={idProducto} />
      )}
   

    </>
  )
}


export default CrearPedido