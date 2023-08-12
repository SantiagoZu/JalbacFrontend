import React from 'react'
import { Label } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { showAlertCorrect, showAlertIncorrect } from '../../../../helpers/Alertas';
import { Formik, Field } from 'formik';
import { SpanError } from '../../../../components/styles/styles';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos'
import { usePedidos } from '../../../../services/hooks/usePedidos';

export const ModalEditarEstado = ({ isOpen, isClose, pedido }) => {
    const { detallePedidos, updateDetallePedidos } = useDetallePedidos();
    const { updatePedidos } = usePedidos()
    let detallesAEditar = detallePedidos.filter(detallePedido => detallePedido.idPedido == pedido.idPedido)
   
    return (
        <>
            <Formik
                initialValues={{ estado: null }}
                validate={(value) => value.estado == null ? {estado : 'Escoge el estado a cambiar'} : {}}
                onSubmit={(value, { resetForm }) => {   
                    const updatedValuesPedido = {
                        idPedido: pedido.idPedido,
                        idCliente: pedido.idCliente,
                        idEstado: value.estado,
                        fechaPedido: pedido.fechaPedido,
                        fechaEntrega: pedido.fechaEntrega,
                        isActivo : pedido.isActivo
                    };                                                       
                    updatePedidos(pedido.idPedido, updatedValuesPedido).then((response) => {
                        resetForm();                        
                        showAlertCorrect('Estado editado correctamente', 'success', isClose)                        
                    }).catch(response => {
                        showAlertIncorrect('No se pudo editar el estado', 'error', isClose);                        
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
                            motivoDevolucion: null
                        }
                        let responseDetalles = updateDetallePedidos(detallePedido.idDetallePedido, updateValuesDetalle)
                        console.log(responseDetalles)
                    }
                   
                    isClose()
                }}
            >
                {({ errors, handleSubmit, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal isOpen={isOpen} onClose={isClose}>
                            <ModalHeader className='mb-3'>Editar estado del pedido</ModalHeader>
                            <ModalBody>
                                <div className='flex gap-5'>
                                    <Label className="mt-4">                                     
                                        <Field
                                            as="select"
                                            id='estado'
                                            name='estado'
                                            className="block w-full pl-4 mt-1 mb-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-select"
                                        >
                                            <option hidden>Cambiar...</option>
                                            {
                                                pedido.idEstado == 1 ? <option value='2'>En produccion</option> : pedido.idEstado == 2 ? <option value='3'>Entregado</option> : null
                                            }
                                        </Field>
                                        {touched.estado && errors.estado && <SpanError>{errors.estado}</SpanError>}
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

