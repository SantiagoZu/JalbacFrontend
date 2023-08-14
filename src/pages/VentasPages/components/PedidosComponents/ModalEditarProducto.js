import React, { useState, useEffect } from 'react'
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

export const ModalEditarProducto = ({ isOpen, isClose, detalleAEditar, recargarTabla = undefined, idDetalleAEditar = undefined }) => {
    let initialValuesDetalle    
    const { updateDetallePedidos } = useDetallePedidos();
    const { empleados, validacionDocumento } = useEmpleados()
    const empleadosDropdown = [
        ...empleados.map(empleado => empleado.estado ? <option value={empleado.documento}>{empleado.nombre} {empleado.apellido} </option> : null)
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
            documentoEmpleado: detalleAEditar.idEmpleado || '',
            nombreAnillido: detalleAEditar.nombreAnillido || '',
            servicio: detalleAEditar.servicio || '',
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
    return (
        <>
            <Formik
                initialValues={initialValuesDetalle}
                validate={values => validateInputsEditarProducto(values, validacionDocumento)}
                onSubmit={(values, { resetForm }) => {
                    const valuesDetalle = {
                        ...values,
                        idDetallePedido: detalleAEditar.idDetallePedido,
                        idPedido: detalleAEditar.idPedido,
                        idEstado: detalleAEditar.idEstado,
                        motivoDevolucion: ''
                    };
                    if (detalleAEditar.idDetallePedido === undefined) { // uso este modal desde la vista Crear pedido
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
                            documentoEmpleado: values.documentoEmpleado || '',
                            idEstado: 1,
                            motivoDevolucion: '',
                        }
                        showAlertCorrect('El producto ha sido editado', 'success', isClose)
                        recargarTabla(valuesDetalleTabla)
                        isClose()
                    }
                    else { //uso la vista desde Editar pedido
                        const empleadoDetalle = empleados.find(empleado => empleado.documento == values.documentoEmpleado)
                        valuesDetalle.idEmpleado = empleadoDetalle.idEmpleado
                        console.log(valuesDetalle)
                        updateDetallePedidos(detalleAEditar.idDetallePedido, valuesDetalle).then(response => {
                            resetForm();
                            showAlertCorrect('Producto editado correctamente', 'success', isClose)
                            isClose()
                        }).catch(response => {
                            showAlertIncorrect('No se pudo editar el producto', 'error', isClose);

                        })
                    }

                }}
            >
                {({ errors, handleSubmit, touched }) => (
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
                                                id='tipo'
                                                name='tipo'
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
                                        <Label className="mt-4">
                                            <span>Tamaño piedra(mm)</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoPiedra"
                                                name="tamanoPiedra"
                                               
                                            />
                                            {touched.tamanoPiedra && errors.tamanoPiedra && <SpanError>{errors.tamanoPiedra}</SpanError>}
                                        </Label>
                                        <Label className="mt-5">
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
                                    </div>
                                    <div className='flex-auto'>
                                        <Label className="mt-5">
                                            <span>Detalles</span>
                                            <CustomInput
                                                type="text"
                                                id="detalle"
                                                name="detalle"                                              
                                            />
                                            {touched.detalle && errors.detalle && <SpanError>{errors.detalle}</SpanError>}
                                        </Label>
                                        <Label className="mt-5">
                                            <span>Cantidad</span>
                                            <CustomInput
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"                                             
                                            />
                                            {touched.cantidad && errors.cantidad && <SpanError>{errors.cantidad}</SpanError>}
                                        </Label>
                                        <Label className="mt-5">
                                            <span> Empleado </span>
                                            <Field
                                                list="dataListEmpleado"
                                                name='documentoEmpleado'
                                                id="documentoEmpleado"
                                                className={STYLE_INPUT}
                                                type="text"
                                                as='input'
                                                required={true}
                                            />
                                            <datalist id="dataListEmpleado" >
                                                {empleadosDropdown}
                                            </datalist>
                                            {touched.documentoEmpleado && errors.documentoEmpleado && <SpanError>{errors.documentoEmpleado}</SpanError>}
                                        </Label>
                                    </div>
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

