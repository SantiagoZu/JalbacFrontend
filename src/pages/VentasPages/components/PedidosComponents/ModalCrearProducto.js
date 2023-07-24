import React, { useState, useEffect } from 'react'
import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { initialValuesAgregarProducto, validateInputsAgregarProducto } from './PedidosFormValidations/ProductosFormik';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
export const ModalCrearProducto = ({ isOpen, isClose, idPedido = undefined , updateTable = undefined}) => {
    const { postDetallePedidos} = useDetallePedidos();
    const tiposDropDown = [
        { value: '', label: 'Seleccione un tipo de anillo' },
        { value: '3D', label: '3D' },
        { value: 'A mano', label: 'A mano' },
        { value: 'Vaceado', label: 'Vaceado' },
    ];
    const materialDropDown = [
        { value: '', label: 'Seleccione un material' },
        { value: 'oroRosado', label: 'Oro rosado' },
        { value: 'oro', label: 'Oro' },
        { value: 'plata', label: 'Plata' },
    ];
    const { empleados } = useEmpleados()
    const empleadosDropdown = []
    for (const id in empleados) {
        const empleado = {
            value: parseInt(empleados[id].idEmpleado),
            label: empleados[id].nombre
        }
        empleadosDropdown.push(empleado)
    }
    
   let postDetallePedidoArray = []
    return (
        <>
            <Formik
                initialValues={initialValuesAgregarProducto}
                validate={(values) => validateInputsAgregarProducto(values)}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)                    
                    const updatedValues = {
                        ...values,
                        idEmpleado : values.idEmpleado,
                        idEstado : 1,                       
                        motivoDevolucion: '',
                    
                    };                   
                    if(idPedido === undefined) {                        
                        updateTable(updatedValues)
                        showAlertCorrect('Producto creado correctamente', 'success', isClose)
                    } else {
                        postDetallePedidoArray.push(updatedValues)
                        postDetallePedidos(postDetallePedidoArray).then(response => {                            
                            resetForm();
                            console.log(response)
                            showAlertCorrect('Producto creado correctamente', 'success', isClose)                                                   
                        }).catch(error => {
                            showAlertIncorrect('No se pudo crear el producto', 'error', isClose);
                            console.log(error);
                            console.log(updatedValues)
                        });
                    }
                    console.log(updatedValues)
                   
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
                                                placeholder="Nombre ejemplo"
                                            />
                                            {touched.nombreAnillido && errors.nombreAnillido && <SpanError>{errors.nombreAnillido}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tipo</span>
                                            <CustomInput
                                                type="select"
                                                id="tipo"
                                                name="tipo"
                                                options={tiposDropDown}
                                            />
                                        </Label>
                                        <Label className="mt-4">
                                            <span>peso</span>
                                            <CustomInput
                                                type="text"
                                                id="peso"
                                                name="peso"
                                                placeholder="12gr"
                                            />
                                            {touched.peso && errors.peso && <SpanError>{errors.peso}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño anillo</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoAnillo"
                                                name="tamanoAnillo"
                                                placeholder="12 1/2"
                                            />
                                            {touched.tamanoAnillo && errors.tamanoAnillo && <SpanError>{errors.tamanoAnillo}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Tamaño piedra</span>
                                            <CustomInput
                                                type="text"
                                                id="tamanoPiedra"
                                                name="tamanoPiedra"
                                                placeholder="12 1/2"
                                            />
                                            {touched.tamanoPiedra && errors.tamanoPiedra && <SpanError>{errors.tamanoPiedra}</SpanError>}
                                        </Label>
                                    </div>
                                    <div className='flex-auto'>
                                        <Label className="mt-4">
                                            <span>Material</span>
                                            <CustomInput
                                                type="select"
                                                id="material"
                                                name="material"
                                                options={materialDropDown}
                                            />
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Detalle</span>
                                            <CustomInput
                                                type="text"
                                                id="detalle"
                                                name="detalle"
                                                placeholder="12 1/2"
                                            />
                                            {touched.detalle && errors.detalle && <SpanError>{errors.detalle}</SpanError>}
                                        </Label>
                                        <Label className="mt-4">
                                            <span>Asignar empleado</span>
                                            <CustomInput
                                                type="select"
                                                id="idEmpleado"
                                                name="idEmpleado"
                                                placeholder="12 1/2"
                                                options={empleadosDropdown}
                                            />

                                        </Label>
                                        <Label className="mt-4">
                                            <span>Cantidad</span>
                                            <CustomInput
                                                type="text"
                                                id="cantidad"
                                                name="cantidad"
                                                placeholder="1"
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
