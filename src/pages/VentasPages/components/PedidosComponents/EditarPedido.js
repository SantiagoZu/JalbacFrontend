import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import { SpanError } from '../../../../components/styles/styles';
import { Label, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Button, Pagination } from '@windmill/react-ui'
import { EditIcon, TrashIcon } from '../../../../icons';
import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import moment from 'moment'
import { Formik, Field } from 'formik'
import { CustomInput } from '../../../../components/CustomInput'
import { useClientes } from '../../../../services/hooks/useClientes'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos'
import { ModalCrearProducto } from './ModalCrearProducto'
import { ModalEditarProducto } from './ModalEditarProducto'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { validateInputs } from './PedidosFormValidations/PedidosFormik'
import STYLE_INPUT from '../../../../helpers/styleInputDatalist';
function EditarPedido() {
  const history = useHistory()
  const location = useLocation()
  const idPedido = location.state.idPedido
  const pedido = location.state.pedido
  const [detallePedidoAEditar, setdetallePedidoAEditar] = useState();
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)

  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }
  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }
  function openModalEditarProducto(detalleAEditar) {
    setModalIsOpenEditarProducto(true);
    setdetallePedidoAEditar(detalleAEditar)
  }

  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }
  const { detallePedidos, getDetallePedidos, deleteDetallePedidos } = useDetallePedidos()
  const detallesPedidoCorrespondiente = detallePedidos.filter(detallePedido => idPedido == detallePedido.idPedido)

  const detallePedidos2 = detallesPedidoCorrespondiente.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = detallePedidos2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  useEffect(() => {
    setDataTable2(detallePedidos2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [detallePedidos, pageTable2]);

  const { updatePedidos } = usePedidos()
  const { clientes, validacionDocumento } = useClientes()  
  const clientesDropdown = [
    ...clientes.map(cliente => cliente.estado ? <option value={cliente.documento}>{cliente.nombre} {cliente.apellido} </option> : null)
  ]
  const initialValuesPedido = {
    documentoCliente: pedido.idCliente || '',
    fechaEntrega: moment(pedido.fechaEntrega).format('YYYY-MM-DD') || '',
    isActivo: pedido.isActivo || ''
  }

  async function deleteDetalle(idDetalle) {
    try {
      const respuesta = await showAlertDeleted('Estas seguro que deseas eliminar este producto?', 'warning')
      if (respuesta.isConfirmed) {
        await deleteDetallePedidos(idDetalle)
        await getDetallePedidos()
        showAlertCorrect('El detalle a sido eliminado', 'success')
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (!modalIsOpenCrearProducto || !modalIsOpenEditarProducto) {
      getDetallePedidos()
    }
  }, [modalIsOpenCrearProducto, modalIsOpenEditarProducto])
  return (
    <>
      <PageTitle>Editar pedido</PageTitle>
      <Formik
        initialValues={initialValuesPedido}
        validate={values => validateInputs(values, validacionDocumento)}
        onSubmit={values => {
          const valuesPedido = {
            ...values,
            idPedido: idPedido,
            idEstado: pedido.idEstado,
            fechaPedido: pedido.fechaPedido,
            isActivo: pedido.isActivo
          };
          const clientePedidoCorrespondiente = clientes.find(cliente => cliente.documento == values.documentoCliente)
          valuesPedido.idCliente = clientePedidoCorrespondiente.idCliente
          updatePedidos(idPedido, valuesPedido).then((response) => {            
            showAlertCorrect('pedido editado correctamente', 'success', () => null)
            setTimeout(() => {
              history.push('/app/pedidos')
            }, 2600);            
          }).catch(response => {
            showAlertIncorrect('No se pudo editar el pedido', 'error');
          });          
        }}
      >
        {({ errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex '>
              <Label className="m-5 flex-none  ">
                <span> Clientes </span>
                <Field
                  list="dataListCliente"
                  name='documentoCliente'
                  id="documentoCliente"
                  className={STYLE_INPUT}
                  type="text"
                  as='input'
                  required={true}
                />
                <datalist id="dataListCliente" >
                  {clientesDropdown}
                </datalist>
                {touched.documentoCliente && errors.documentoCliente && <SpanError>{errors.documentoCliente}</SpanError>}
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
                  <tr >
                    <TableCell>Nombre anillo</TableCell>
                    <TableCell>Servicio</TableCell>
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
                  {dataTable2.map(detallePedido => (
                    <TableRow key={detallePedido.idDetallePedido}>
                      <TableCell>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.nombreAnillido}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.servicio}</p>
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
                        <p className="text-xs text-gray-600 dark:text-gray-400">{detallePedido.idEmpleadoNavigation.nombre} {detallePedido.idEmpleadoNavigation.apellido}</p>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Button layout="link" size="icon" aria-label="Edit" >
                            <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido)} />
                          </Button>

                          <Button layout="link" size="icon" aria-label="Delete" onClick={() => deleteDetalle(detallePedido.idDetallePedido)} >
                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
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
            <div className="flex ml-auto mt-5 mb-6 space-x-5">
              <Button onClick={handleSubmit}>
                Editar pedido
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
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedido} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} detalleAEditar={detallePedidoAEditar} />
      )}

    </>
  )
}

export default EditarPedido