import React, { useState, useEffect } from 'react'
import { HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik } from 'formik';
import { CustomInput } from '../../../../components/CustomInput';
import { SpanError } from '../../../../components/styles/styles';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { useEstados } from '../../../../services/hooks/useEstados'
import { usePedidos } from '../../../../services/hooks/usePedidos';

export const ModalEditarEstado = ({ isOpen, isClose, pedido }) => {
    const { detallePedidos, updateDetallePedidos } = useDetallePedidos();
    const { updatePedidos } = usePedidos()
    const { estados } = useEstados()
    const estadosDropdown = [
        { value: null, label: 'Elija el estado a cambiar' },
        ...estados.map(estado => ({ value: estado.idEstado, label: estado.nombre })),
    ];
    let detallesAEditar = detallePedidos.filter(detallePedido => detallePedido.idPedido == pedido.idPedido)
    console.log(detallesAEditar)
    return (
        <>
            <Formik
                initialValues={{ estado: '' }}
                validate={() => ({})}
                onSubmit={(value, { resetForm }) => {

                    const updatedValues = {
                        idPedido: pedido.idPedido,
                        idCliente: pedido.idCliente,
                        idEstado: value.estado,
                        fechaPedido: pedido.fechaPedido,
                        fechaEntrega: pedido.fechaEntrega
                    };
                    console.log(value)
                    updatePedidos(pedido.idPedido, updatedValues).then( (response)  => {
                        resetForm();
                        
                        setTimeout(() => window.location.reload(), 2000)
                        showAlertCorrect('Estado editado correctamente', 'success', isClose)
                        console.log(response);
                    }).catch(response => {
                        showAlertIncorrect('No se pudo editar el estado', 'error', isClose);
                        console.log(response);
                    })
                    for (const detallePedido of detallesAEditar) {
                        const updateValuesDetalle = {
                            idDetallePedido: detallePedido.idDetallePedido || '',
                            idPedido: detallePedido.idPedido || '',
                            idEmpleado: detallePedido.idEmpleado || '',
                            idEstado: parseInt(value.estado) || '',
                            nombreAnillido: detallePedido.nombreAnillido || '',
                            tipo: detallePedido.tipo || '',
                            peso: detallePedido.peso || '',
                            tamanoAnillo: detallePedido.tamanoAnillo || '',
                            tamanoPiedra: detallePedido.tamanoPiedra || '',
                            material: detallePedido.material || '',
                            detalle: detallePedido.detalle || '',
                            cantidad: detallePedido.cantidad || '',
                            motivoDevolucion: detallePedido.motivoDevolucion || ''
                        }
                        let responseDetalles =  updateDetallePedidos(detallePedido.idDetallePedido, updateValuesDetalle)
                        console.log(responseDetalles)
                    }
                    console.log(updatedValues)
                }}
            >
                {({ errors, handleSubmit, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Editar estado del pedido</ModalHeader>
                            <ModalBody>
                                <div className='flex gap-5'>
                                    <Label className="mt-4">
                                        <span>Nombre</span>
                                        <CustomInput
                                            type="select"
                                            id="estado"
                                            name="estado"
                                            options={estadosDropdown}
                                        />
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
                                    <Button onClick={handleSubmit}>Editar estado</Button>
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

