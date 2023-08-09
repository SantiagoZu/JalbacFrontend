import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import {Label, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Button, Pagination} from '@windmill/react-ui'
import { EditIcon, TrashIcon} from '../../../../icons';
import { showAlertDeleted, showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import moment from 'moment'
import {Formik} from 'formik'
import { CustomInput } from '../../../../components/CustomInput'
import { useClientes } from '../../../../services/hooks/useClientes'
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos'
import { ModalCrearProducto } from './ModalCrearProducto'
import { ModalEditarProducto } from './ModalEditarProducto'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { validateInputs } from './PedidosFormValidations/PedidosFormik'

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
  function openModalEditarProducto(obj) {
    setModalIsOpenEditarProducto(true);
    setdetallePedidoAEditar(obj)
  }

  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }
  const { detallePedidos, getDetallePedidos, deleteDetallePedidos } = useDetallePedidos()
  const detallePedidosFiltered = detallePedidos.filter(detallePedido => idPedido == detallePedido.idPedido)
  const detallePedidos2 = detallePedidosFiltered.concat([])
  
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
  const { clientes } = useClientes()
  const { empleados } = useEmpleados();
  const clientesDropdown = []
  clientes.forEach(cliente => cliente.estado ? clientesDropdown.push({value : cliente.idCliente, label : cliente.nombre}) : null)
  const initialValuesPedido = {
    idCliente: pedido.idCliente || clientes[0].idCliente,
    fechaEntrega: moment(pedido.fechaEntrega).format('YYYY-MM-DD') || '',
    isActivo : pedido.isActivo || ''
  }

  useEffect(() => {
    if(!modalIsOpenCrearProducto || !modalIsOpenEditarProducto) {
      getDetallePedidos()
    }
  }, [modalIsOpenCrearProducto, modalIsOpenEditarProducto])
  async function deleteProduct(id) {
    await showAlertDeleted('Estas seguro que deseas eliminar este producto?', 'warning').then(async (response) => {
      if (response.isConfirmed) {
        await deleteDetallePedidos(id)
        
        showAlertCorrect('Detalle eliminado correctamente', 'success', () => null)
      }
    })
  }
  return (
    <>
      <PageTitle>Editar pedido</PageTitle>
      <Formik
        initialValues={initialValuesPedido}
        validate={values => validateInputs(values)}
        onSubmit={(values, { resetForm }) => {
          const updatedValues = {
            ...values,
            idPedido: idPedido,
            idEstado: pedido.idEstado,
            fechaPedido: pedido.fechaPedido
          };
   
          updatePedidos(idPedido, updatedValues).then((response) => {
            resetForm();    
            showAlertCorrect('pedido editado correctamente', 'success', () => null)
            setTimeout(() => {
              history.push('/app/pedidos')
            }, 2600);
            return response
          }).catch(response => {
            showAlertIncorrect('No se pudo editar el pedido', 'error');
    
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
                    {dataTable2.map(detallePedido =>  (
                      <TableRow key={detallePedido.idDetallePedido}>
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
                            return empleado.idEmpleado == detallePedido.idEmpleado ? <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.nombre}{' '}{empleado.apellido}</p> : null
                          })}
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit" >
                              <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido)} />
                            </Button>

                            <Button layout="link" size="icon" aria-label="Delete" onClick={() => deleteProduct(detallePedido.idDetallePedido)} >
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
              <Button layout="outline"  onClick={() => history.push('/app/pedidos')}>
                Regresar a pedidos
              </Button>
            </div>
          </form>
        )}
      </Formik>
      {modalIsOpenCrearProducto && (
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedido}  />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} product={detallePedidoAEditar}  />
      )}

    </>
  )
}

export default EditarPedido