import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle'
import { SpanError } from '../../../../components/styles/styles'
import {Label, Table, TableHeader, TableCell, TableBody,TableRow, TableFooter, TableContainer, Button, Pagination,} from '@windmill/react-ui'
import { EditIcon, TrashIcon, PlusCircle } from '../../../../icons';
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
import STYLE_INPUT from '../../../../helpers/styleInputDatalist';
function CrearPedido() {
  const history = useHistory()
  const [detalleAEditar, setDetalleAEditar] = useState();
  const [idDetalle, setIdDetalle] = useState()
  const [modalIsOpenCrearProducto, setModalIsOpenCrearProducto] = useState(false)
  const [modalIsOpenEditarProducto, setModalIsOpenEditarProducto] = useState(false)

  function openModalCrearProducto() {
    setModalIsOpenCrearProducto(true);
  }
  function closeModalCrearProducto() {
    setModalIsOpenCrearProducto(false);
  }

  function openModalEditarProducto(detalle, idDetalle) {
    setModalIsOpenEditarProducto(true);
    setDetalleAEditar(detalle)
    setIdDetalle(idDetalle)
  }
  function closeModalEditarProducto() {
    setModalIsOpenEditarProducto(false);
  }

  const { postPedidos } = usePedidos()
  const { clientes, validacionDocumento } = useClientes()
  const { empleados } = useEmpleados();
  const clientesDropdown = [
    ...clientes.map(cliente => cliente.estado ? (<option  value={cliente.documento}>{cliente.nombre} {cliente.apellido}</option>) : null)
  ]

  const [detalles, setDetalles] = useState([]);

  const detalles2 = detalles.concat([])
  const [pageTable2, setPageTable2] = useState(1)
  const [dataTable2, setDataTable2] = useState([])

  const resultsPerPage = 5
  const totalResults = detalles2.length

  function onPageChangeTable2(p) {
    setPageTable2(p)
  }
  useEffect(() => {
    setDataTable2(detalles2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
  }, [detalles, pageTable2]);

  function getDetalle(detalle) {
    setDetalles([...detalles, detalle])
  }
  function getUpdatedDetalle(detalle) {
    let updatedDetalles = detalles.map((detallePedido, index) => {
      if (detalle.idDetalle == index) return detalle     
      return detallePedido      
    })
    setDetalles(updatedDetalles)
  }

  function deteleDetalle(indexEditar) {
     showAlertDeleted('Estas seguro que deseas eliminar este producto?', 'warning').then(response => {
      if (response.isConfirmed) setDetalles(detalles.filter((detallePedido, index) => indexEditar !== index))      
    })
  }

  return (
    <>
      <PageTitle>Crear pedido</PageTitle>
      <Formik
        initialValues={initialValues}
        validate={(values) => validateInputs(values, validacionDocumento)}
        onSubmit={(values, { resetForm }) => {
          const valuesPedido = {
            ...values,
            idEstado: 1,
            detallesPedido: detalles
          };
          if (detalles.length <= 0) {
            showAlertIncorrect('Tienes que agregar almenos un producto', 'error', () => null);
          }
          else {
            postPedidos(valuesPedido).then((response) => {
              resetForm();
              showAlertCorrect('Pedido creado correctamente', 'success', () => null)
              setTimeout(() => {
                window.location.reload();
              }, 2600);
              return response
            }).catch(response => {
              showAlertIncorrect('No se pudo crear el pedido', 'error', () => null);

            });
          }

        }}
      >
        {({ errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-row'>              
              <Label className="m-5 flex-none  ">
                <span> Clientes </span>
                <Field 
                  list="dataListCliente" 
                  name='documentoCliente'                                
                  id="documentoCliente" 
                  className={STYLE_INPUT}
                  type="text"
                  as='input'                  
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
                {touched.fechaEntrega && errors.fechaEntrega && <SpanError>{errors.fechaEntrega}</SpanError>}
              </Label>
              <Button iconRight={PlusCircle} className='flex-none  mt-5 mb-6 self-end  ' onClick={() => {
                openModalCrearProducto()
              }}>
                Agregar producto
              </Button>
            </div>
            <TableContainer >
              <Table >
                <TableHeader>
                  <tr>
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
                  {dataTable2.length > 0 ?
                    dataTable2.map((detallePedido, index) => (
                      <TableRow key={index}>
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
                            return empleado.documento == detallePedido.documentoEmpleado ? <p className="text-xs text-gray-600 dark:text-gray-400">{empleado.nombre} {empleado.nombre}</p> : null
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-4">
                            <Button layout="link" size="icon" aria-label="Edit" >
                              <EditIcon className="w-5 h-5" aria-hidden="true" onClick={() => openModalEditarProducto(detallePedido, index)} />
                            </Button>

                            <Button layout="link" size="icon" aria-label="Delete" onClick={() => deteleDetalle(index)} >
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
              <Button iconRight={PlusCircle} onClick={handleSubmit}>
                Crear pedido
              </Button>
              <Button layout="outline" onClick={() => history.push('/app/pedidos')}>
                Regresar a pedidos
              </Button>
            </div>
          </form>
        )}

      </Formik>
      {modalIsOpenCrearProducto && (
        <ModalCrearProducto isOpen={modalIsOpenCrearProducto} isClose={closeModalCrearProducto} recargarTabla={(detalle) => getDetalle(detalle)} />
      )}
      {modalIsOpenEditarProducto && (
        <ModalEditarProducto isOpen={modalIsOpenEditarProducto} isClose={closeModalEditarProducto} detalleAEditar={detalleAEditar} recargarTabla={detalle => getUpdatedDetalle(detalle)} idDetalleAEditar={idDetalle} />
      )}


    </>
  )
}


export default CrearPedido