import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import { SpanError } from '../../../../components/styles/styles';
import { Label, Table, TableHeader, TableCell, TableBody, TableRow, TableFooter, TableContainer, Button, Pagination } from '@windmill/react-ui'
import { EditIcon, TrashIcon, PlusCircle } from '../../../../icons';
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
import { useEmpleados } from '../../../../services/hooks/useEmpleados';

import {handleInput }  from "../../../../helpers/validacionesInput";

function EditarPedido() {
  const history = useHistory()
  const location = useLocation()
  const idPedido = location.state.idPedido
  const pedido = location.state.pedido
  const clientePedido = location.state.clientePedido
  const [detallePedidoAEditar, setdetallePedidoAEditar] = useState();
  const [empleadoEncargado, setEmpleadoEncargado] = useState();
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)
  const { empleados } = useEmpleados()

  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }
  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }
  function openModalEditarProducto(detalleAEditar, empleado) {
    setModalIsOpenEditarProducto(true);
    setdetallePedidoAEditar(detalleAEditar)
    setEmpleadoEncargado(empleado)
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

  console.log(clientePedido)
  const { updatePedidos } = usePedidos()
  const { clientes } = useClientes()
  const clientesDropdown = [
    ...clientes.map(cliente => cliente.estado ? (<option value={`${cliente.nombre} ${cliente.apellido}`} data-documento={cliente.documento}>D.I {cliente.documento}</option>) : null)

  ]
  const initialValuesPedido = {
    documentoCliente: clientePedido.documento,
    fechaEntrega: moment(pedido.fechaEntrega).format('YYYY-MM-DD') || '',
    isActivo: pedido.isActivo || ''
  }

   
  async function deleteDetalle(idDetalle) {
    try {
      const respuesta = await showAlertDeleted('¿Estás seguro que deseas eliminar este producto?', 'warning')
      if (respuesta.isConfirmed) {
        await deleteDetallePedidos(idDetalle)
        await getDetallePedidos()
        showAlertCorrect('El producto ha sido eliminado', 'success')
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

  const [valueInputCliente, setValueInputCliente] = useState(`${clientePedido.nombre} ${clientePedido.apellido}`);


  

  return (
    <>
      <PageTitle>Editar pedido</PageTitle>
      <Formik
        initialValues={initialValuesPedido}
        validate={values => validateInputs(values)}
        onSubmit={values => {
          const valuesPedido = {
            ...values,
            idPedido: idPedido,
            idEstado: pedido.idEstado,
            fechaPedido: pedido.fechaPedido,
            isActivo: pedido.isActivo
          };

          const valueDatalist = document.getElementById( "documentoClienteVisible").value
          let optionSelected = document.querySelector(`#dataListCliente option[value='${valueDatalist}']`)
          if(optionSelected) {
            const valueOptionSelected = optionSelected.getAttribute('data-documento')

            const clienteSeleccionado = clientes.find(cliente => cliente.documento == valueOptionSelected)
            valuesPedido.idCliente = clienteSeleccionado.idCliente
            updatePedidos(idPedido, valuesPedido).then((response) => {
              showAlertCorrect('Pedido editado correctamente', 'success', () => null)
              setTimeout(() => {
                history.push('/app/pedidos')
              }, 2600);
            }).catch(response => {
                showAlertIncorrect('No se pudo editar el pedido', 'error');
              });
          } else {

          }

        }
          
        }
      >
        {({ setFieldTouched , setFieldValue, errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-wrap'>
              <Label className="my-5 mr-5 flex-none ">
                <span> Clientes </span>
                
                <input
                  list="dataListCliente"
                  name='documentoCliente'
                  id="documentoClienteVisible"
                  className={STYLE_INPUT}
                  type="text"
                  as='input'
                  onChange={(event) => {
                    handleInput(setValueInputCliente, setFieldValue, setFieldTouched , "documentoClienteVisible", "dataListCliente", "documentoClienteHidden")
                    setValueInputCliente(event.target.value)
                  }}
 
                  value={valueInputCliente}
                  placeholder='Josue Barreto'
                />

                <Field
                  list="dataListCliente"
                  id="documentoClienteHidden"
                  name="documentoClienteHidden"
                  className="hidden"
                  type="text"
                  placeholder='Josue Barreto'
                />

                <datalist id="dataListCliente" >
                  {clientesDropdown}
                </datalist>
                {touched.documentoClienteHidden && errors.documentoClienteHidden && <SpanError>{errors.documentoClienteHidden}</SpanError>}
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
              <Button iconRight={PlusCircle} className='flex-none  mt-5 mb-6 self-end  ' onClick={() => {
                openModalCrearProducto()
              }}>
                Agregar producto
              </Button>
            </div>

            <div className="flex ml-auto mt-5 mb-6 space-x-5">
              <Button onClick={handleSubmit}>
                Editar pedido
              </Button>
              <Button layout="outline" onClick={() => history.push('/app/pedidos')}>
                Regresar a pedidos
              </Button>
            </div>
          </form>
        )}
      </Formik>
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
            {dataTable2.map(detallePedido => {
              const empleadoEncargado = empleados.find(empleado => empleado.idEmpleado == detallePedido.idEmpleado)

              return (
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
                        <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido, empleadoEncargado)} />
                      </Button>

                      <Button layout="link" size="icon" aria-label="Delete" onClick={() => deleteDetalle(detallePedido.idDetallePedido)} >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            }
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
      {modalIsOpenCrearProducto && (
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} idPedido={idPedido} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} detalleAEditar={detallePedidoAEditar} empleadoEncargado={empleadoEncargado} />
      )}

    </>
  )
}

export default EditarPedido
