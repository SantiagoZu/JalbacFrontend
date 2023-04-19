import React, { useState, useEffect } from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import responseDetalles from '../../../../utils/demo/dataHistorialEstadoProducto';
import { showAlertCorrect, showAlertDeleted } from '../../../../helpers/Alertas';
import {
    Label,
    Select
} from '@windmill/react-ui'

export const ModalEditarEstadoProducto = ({ isOpen, isClose }) => {
    const resultsPerPage = 10
    const responseDetallesProductos = responseDetalles.concat([])
    const [pageTable3, setPageTable3] = useState(1)
    const [dataTable3, setDataTable3] = useState([])

    useEffect(() => {
        setDataTable3(responseDetallesProductos.slice((pageTable3 - 1) * resultsPerPage, pageTable3 * resultsPerPage))
    }, [pageTable3])

    function AlertaCorrecta(){
        showAlertCorrect('Estado cambiado de manera existosa', 'success', isClose)
    }

    return (
        <>
            <form action='' >
                <Modal isOpen={isOpen} onClose={isClose}>
                    <ModalHeader className='mb-3'>Editar producto</ModalHeader>
                    <ModalBody>
                        <Label className="mt-4">
                            <span >Estado</span>
                            <Select className="mt-1" onChange={(dato) => {
                                if (dato.target.value == "Devuelto") {

                                }
                                else {
                                }
                            }}>
                                <option>En produccion</option>
                                <option>Entregado</option>
                            </Select>
                        </Label>


                    </ModalBody>

                    <ModalFooter>
                        <div className="hidden sm:block">
                            <Button layout="outline" onClick={isClose}>
                                Cancelar
                            </Button>
                        </div>
                        <div className="hidden sm:block">
                            <Button onClick={AlertaCorrecta}>Editar producto</Button>
                        </div>

                        <div className="block w-full sm:hidden">
                            <Button block size="large" layout="outline" onClick={isClose}>
                                Cancel
                            </Button>
                        </div>
                        <div className="block w-full sm:hidden">
                            <Button block size="large">
                                Accept
                            </Button>
                        </div>


                    </ModalFooter>
                </Modal>
            </form>
        </>
    );
}
