import React from 'react'
import { Label } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertIncorrect } from '../../../../helpers/Alertas';
import { Field, Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValuesAgregarProducto, validateInputsAgregarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
import STYLE_INPUT from '../../../../helpers/styleInputDatalist';
export const ModalCrearProducto = ({ isOpen, isClose, idPedido = undefined, recargarTabla = undefined }) => {
    const { postDetallePedidos } = useDetallePedidos();
    const { empleados , validacionDocumento } = useEmpleados()
    const empleadosDropdown = [
        ...empleados.map(empleado => empleado.estado ? <option value={empleado.documento}>{empleado.nombre} {empleado.apellido} </option> : null)
    ]
    let postDetallePedidoArray = []
   
    return (
        <>
            <Formik
                initialValues={initialValuesAgregarProducto}
                validate={(values) => validateInputsAgregarProducto(values, validacionDocumento)}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    const valuesDetalle = {
                        ...values,
                        idPedido: idPedido,                        
                        idEstado: 1,
                    };
                    if (idPedido === undefined) {                        
                        recargarTabla(valuesDetalle)
                        isClose()
                    } else {
                        const empleadoProducto = empleados.find(empleado => empleado.documento == values.documentoEmpleado)
                        valuesDetalle.idEmpleado = empleadoProducto.idEmpleado                        
                        postDetallePedidoArray.push(valuesDetalle)
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
                {({ errors, handleSubmit, touched }) => (

                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Agregar producto</ModalHeader>
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
                                            <span>peso(gr)</span>
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
                                            <span>Detalle</span>
                                            <CustomInput
                                                type="text"
                                                id="detalle"
                                                name="detalle"
                                                 
                                            />
                                            {touched.detalle && errors.detalle && <SpanError>{errors.detalle}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
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
                                        <Label className="mt-4">
                                            <span>Cantidad</span>
                                            <CustomInput
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"
                                                
                                            />
                                            {touched.cantidad && errors.cantidad && <SpanError>{errors.cantidad}</SpanError>}
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
                                    <Button onClick={handleSubmit}>Agregar producto</Button>
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
