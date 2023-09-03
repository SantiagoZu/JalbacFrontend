import React  from 'react'
import { Label } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik, Field } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { validateInputsEditarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../../../services/hooks/useEmpleados';
import STYLE_INPUT from '../../../../helpers/styleInputDatalist';

import {handleInput }  from "../../../../helpers/validacionesInput";

export const ModalEditarProducto = ({ isOpen, isClose, detalleAEditar, recargarTabla = undefined, idDetalleAEditar = undefined, empleadoEncargado = undefined }) => {
    let initialValuesDetalle
    const { updateDetallePedidos } = useDetallePedidos();
    const { empleados} = useEmpleados()

    const empleadosDropdown = [
      ...empleados.map(empleado => empleado.estado ? (<option value={`${empleado.nombre} ${empleado.apellido}`} data-documento={empleado.documento}>D.I {empleado.documento}</option>) : null)
    ]
    if (detalleAEditar.idDetallePedido === undefined) {
        initialValuesDetalle = {
            nombreAnillido: detalleAEditar.nombreAnillido || '',
            tipo: detalleAEditar.tipo || '',
            peso: detalleAEditar.peso || '',
            tamanoAnillo: detalleAEditar.tamanoAnillo || '',
            tamanoPiedra: detalleAEditar.tamanoPiedra || '',
            material: detalleAEditar.material || '',
            detalle: detalleAEditar.detalle || '',
            cantidad: detalleAEditar.cantidad || '',
            documentoEmpleado: detalleAEditar.documentoEmpleado || '',
        };
    }
    
    else {

        initialValuesDetalle = {
            idDetallePedido: detalleAEditar.idDetallePedido || '',
            idPedido: detalleAEditar.idPedido || '',
            documentoEmpleado: empleadoEncargado.documento || '',
            nombreAnillido: detalleAEditar.nombreAnillido || '',
            servicio: detalleAEditar.servicio,
            peso: detalleAEditar.peso || '',
            tamanoAnillo: detalleAEditar.tamanoAnillo || '',
            tamanoPiedra: detalleAEditar.tamanoPiedra || '',
            material: detalleAEditar.material || '',
            detalle: detalleAEditar.detalle || '',
            cantidad: detalleAEditar.cantidad || '',
            idEstado: detalleAEditar.idEstado || '',
            motivoDevolucion: detalleAEditar.motivoDevolucion || '',
        };
    
    }

    const [valueInputEmpleado, setValueInputEmpleado] = React.useState(`${empleadoEncargado.nombre} ${empleadoEncargado.apellido}`);
    return (
        <>
            <Formik
                initialValues={initialValuesDetalle}
                validate={values => validateInputsEditarProducto(values)}
                onSubmit={(values, { resetForm }) => {
                    const valuesDetalle = {
                        ...values,
                        idDetallePedido: detalleAEditar.idDetallePedido,
                        idPedido: detalleAEditar.idPedido,
                        idEstado: detalleAEditar.idEstado,
                        motivoDevolucion: ''
                    };
                    if (detalleAEditar.idDetallePedido === undefined) { // uso este modal desde la vista Crear pedido

                        const valueDatalist = document.getElementById( "documentoEmpleadoVisible").value
                        let optionSelected = document.querySelector(`#dataListEmpleado option[value='${valueDatalist}']`)
                        if (optionSelected) {

                          const valueOptionSelected = optionSelected.getAttribute('data-documento')
                          const valuesDetalleTabla = {
                              idDetalle: idDetalleAEditar,
                              nombreAnillido: values.nombreAnillido || '',
                              tipo: values.tipo || '',
                              peso: values.peso || '',
                              tamanoAnillo: values.tamanoAnillo || '',
                              tamanoPiedra: values.tamanoPiedra || '',
                              material: values.material || '',
                              detalle: values.detalle || '',
                              cantidad: values.cantidad || '',
                              documentoEmpleado: valueOptionSelected || '',
                              idEstado: 1,
                              motivoDevolucion: '',
                          }
                          showAlertCorrect('El producto ha sido editado', 'success', isClose)
                          recargarTabla(valuesDetalleTabla)
                          isClose()  
                        }
                        
                    }
                    else { //uso la vista desde Editar pedido

                        const valueDatalist = document.getElementById( "documentoEmpleadoVisible").value
                        let optionSelected = document.querySelector(`#dataListEmpleado option[value='${valueDatalist}']`)
                        if (optionSelected) {
                          
                          const valueOptionSelected = optionSelected.getAttribute('data-documento')
                          const empleadoDetalle = empleados.find(empleado => empleado.documento == valueOptionSelected)
                          valuesDetalle.idEmpleado = empleadoDetalle.idEmpleado

                          updateDetallePedidos(detalleAEditar.idDetallePedido, valuesDetalle).then(response => {
                            resetForm();
                            showAlertCorrect('Producto editado correctamente', 'success', isClose)
                            isClose()
                          }).catch(response => {
                              showAlertIncorrect('No se pudo editar el producto', 'error', isClose);

                            })
                        }
                    }

                }}
            >
                {({ errors, handleSubmit, touched , setFieldTouched, setFieldValue}) => (

                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Editar producto</ModalHeader>
                            <ModalBody>
                                <div className='flex gap-5'>
                                    <div className='flex-auto'>
                                        <Label className="mt-4">
                                            <span>Nombre</span>
                                            <CustomInput
                                                type="text"
                                                id="nombreAnillido"
                                                name="nombreAnillido"

                                            />
                                            {touched.nombreAnillido && errors.nombreAnillido && <SpanError>{errors.nombreAnillido}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Servicio</span>
                                            <Field
                                                as="select"
                                                id='servicio'
                                                name='servicio'
                                                className={STYLE_INPUT.replace('form-input', 'form-select')}
                                            >
                                                <option hidden>Seleccionar...</option>
                                                <option>3D</option>
                                                <option>A mano</option>
                                            </Field>
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Peso(gr)</span>
                                            <CustomInput
                                                type="text"
                                                id="peso"
                                                name="peso"

                                            />
                                            {touched.peso && errors.peso && <SpanError>{errors.peso}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño anillo</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoAnillo"
                                                name="tamanoAnillo"

                                            />
                                            {touched.tamanoAnillo && errors.tamanoAnillo && <SpanError>{errors.tamanoAnillo}</SpanError>}
                                        </Label>
                                    </div>
                                    <div className='flex-auto'>
                                        <Label className="mt-4">
                                            <span>Material del anillo</span>
                                            <Field
                                                as="select"
                                                id='material'
                                                name='material'
                                                className={STYLE_INPUT.replace('form-input', 'form-select')}
                                            >
                                                <option hidden>Seleccionar...</option>
                                                <option>Oro</option>
                                                <option>Plata</option>
                                                <option>Oro rosado</option>
                                            </Field>
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Cantidad</span>
                                            <CustomInput
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"
                                            />
                                            {touched.cantidad && errors.cantidad && <SpanError>{errors.cantidad}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span> Empleado </span>
                                            <input

                                                list="dataListEmpleado"
                                                name='documentoEmpleadoVisible'
                                                id="documentoEmpleadoVisible"
                                                className={STYLE_INPUT}
                                                type="text"
                                                placeholder='Santiago'
                                                onChange={(event) => {
                                                  handleInput(setValueInputEmpleado, setFieldValue, setFieldTouched , "documentoEmpleadoVisible", "dataListEmpleado", "documentoEmpleadoHidden")
                                                  setValueInputEmpleado(event.target.value)
                                                }}

                                                value={valueInputEmpleado}
                                            />

                                            <Field
                                                list="dataListEmpleado"
                                                name='documentoEmpleadoHidden'
                                                id="documentoEmpleadoHidden"
                                                className="hidden"
                                                type="text"
                                                as='input'
                                                placeholder='Santiago'
                                            />
                      
                                            <datalist id="dataListEmpleado" >
                                                {empleadosDropdown}
                                            </datalist>
                                            {touched.documentoEmpleadoHidden && errors.documentoEmpleadoHidden && <SpanError>{errors.documentoEmpleadoHidden}</SpanError>}


                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño piedra(mm)</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoPiedra"
                                                name="tamanoPiedra"
                                            />
                                            {touched.tamanoPiedra && errors.tamanoPiedra && <SpanError>{errors.tamanoPiedra}</SpanError>}
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <Label className="mt-4">
                                        <span>Detalle</span>
                                        <Field
                                            type="text"
                                            id="detalle"
                                            name="detalle"
                                            placeholder='Las piedras son de color azul'
                                            as='textarea'
                                            className={STYLE_INPUT}
                                        />
                                        {touched.detalle && errors.detalle && <SpanError>{errors.detalle}</SpanError>}
                                    </Label>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <div className="hidden sm:block">
                                    <Button layout="outline" onClick={isClose}>
                                        Cancelar
                                    </Button>
                                </div>
                                <div className="hidden sm:block">
                                    <Button onClick={handleSubmit}>Editar producto</Button>
                                </div>

                                <div className="block w-full sm:hidden">
                                    <Button block size="large" layout="outline" onClick={isClose}>
                                        Cancel
                                    </Button>
                                </div>
                                <div className="block w-full sm:hidden">
                                    <Button block size="large" layout="outline" onClick={isClose}>
                                        Cancel
                                    </Button>
                                </div>

                            </ModalFooter>
                        </Modal>
                    </form>
                )}

            </Formik>
        </>
    );
}

