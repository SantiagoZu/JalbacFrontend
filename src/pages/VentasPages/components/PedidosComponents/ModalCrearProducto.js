import React from 'react'
import { Label } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from '@windmill/react-ui';
import { showAlertIncorrect } from '../../../../helpers/Alertas';
import { Field, Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValuesAgregarProducto, validateInputsAgregarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
import STYLE_INPUT from '../../../../helpers/styleInputDatalist';

import {handleInput }  from "../../../../helpers/validacionesInput";

export const ModalCrearProducto = ({ isOpen, isClose, idPedido = undefined, recargarTabla = undefined }) => {
    const { postDetallePedidos } = useDetallePedidos();
    const { empleados, validacionDocumento } = useEmpleados()
    const empleadosDropdown = [
    ...empleados.map(( empleado , index  )=> empleado.estado ? (<option key={index} value={`${empleado.nombre} ${empleado.apellido}`} data-documento={empleado.documento}>D.I {empleado.documento}</option>) : null)

    ]

    let postDetallePedidoArray = []

  
  const [valueInputEmpleado, setValueInputEmpleado] = React.useState('');
    return (
        <>
            <Formik
                initialValues={initialValuesAgregarProducto}
                validate={(values) => validateInputsAgregarProducto(values, validacionDocumento)}
                onSubmit={(values, { resetForm }) => {

                    const valuesDetalle = {
                        ...values,
                        idPedido: idPedido,
                        idEstado: 1,
                    };
                    if (idPedido === undefined) {
                        valuesDetalle.documentoEmpleado = valueInputEmpleado
                        recargarTabla(valuesDetalle)
                        isClose()
                    } else {
                        const empleadoProducto = empleados.find(empleado => empleado.documento == valueInputEmpleado)
                        valuesDetalle.idEmpleado = empleadoProducto.idEmpleado
                        valuesDetalle.documentoEmpleado = empleadoProducto.documento
                        postDetallePedidoArray.push(valuesDetalle)
                        console.log(valuesDetalle)
                        postDetallePedidos(postDetallePedidoArray).then(response => {
                            resetForm();
                            isClose()
                            console.log(response)
                        }).catch(error => {
                            showAlertIncorrect('No se pudo crear el producto', 'error', isClose);
                            console.log(error);
                        });
                    }
                    resetForm();
                }}
            >
                {({ errors, handleSubmit, touched , setFieldValue, setFieldTouched}) => (

                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Agregar producto</ModalHeader>
                            <ModalBody>
                                <div className='flex gap-5'>
                                    <div className='flex-auto'>
                                        <Label className="mt-4">
                                            <span>Nombre (opcional)</span>
                                            <CustomInput
                                                type="text"
                                                id="nombreAnillido"
                                                name="nombreAnillido"
                                                placeholder='Emmanuel'
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
                                            {touched.tipo && errors.tipo && <SpanError>{errors.tipo}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Peso(gr)</span>
                                            <CustomInput
                                                type="text"
                                                id="peso"
                                                name="peso"
                                                placeholder='7'
                                            />
                                            {touched.peso && errors.peso && <SpanError>{errors.peso}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño anillo</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoAnillo"
                                                name="tamanoAnillo"
                                                placeholder='6'

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
                                            <span> Empleado </span>
                                            <input

                                                list="dataListEmpleado"
                                                name='documentoEmpleadoVisible'
                                                id="documentoEmpleadoVisible"
                                                className={STYLE_INPUT}
                                                type="text"
                                                placeholder='Santiago'
                                                onChange={() => {
                                                  handleInput(setValueInputEmpleado, setFieldValue, setFieldTouched , "documentoEmpleadoVisible", "dataListEmpleado", "documentoEmpleadoHidden")
                                                }}
                                            />

                                            <Field
                                                list="dataListEmpleado"
                                                name='documentoEmpleadoHidden'
                                                id="documentoEmpleadoHidden"
                                                className="hidden"
                        
                                                value="1"
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
                                            <span>Cantidad</span>
                                            <CustomInput
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"
                                                placeholder='1'
                                            />
                                            {touched.cantidad && errors.cantidad && <SpanError>{errors.cantidad}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño piedra(mm)</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoPiedra"
                                                name="tamanoPiedra"
                                                placeholder='1.5'
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
                                    <Button onClick={handleSubmit}>Agregar</Button>
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
