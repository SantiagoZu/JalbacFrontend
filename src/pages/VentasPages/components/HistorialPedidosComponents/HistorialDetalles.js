import React, { useState, useEffect } from 'react'
import PageTitle from '../../../../components/Typography/PageTitle';
import {
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableHeader,
    TableBody,
    Pagination,
    TableFooter,
    Button,
} from '@windmill/react-ui'
import { History, } from '../../../../icons';
import { useEmpleados } from '../../../../services/hooks/useEmpleados'
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { useDetallePedidos } from '../../../../services/hooks/useDetallePedidos';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ModalHistorialDetalles } from './ModalHistorialDetalles';

function HistorialDetalles() {
    const history = useHistory()
    const location = useLocation()
    const idPedido = location.state.idPedido
    const { detallePedidos } = useDetallePedidos()
    const detallePedidosFiltered = detallePedidos.filter(detallePedido => idPedido == detallePedido.idPedido)
    const detallePedidos2 = detallePedidosFiltered.concat([])
    const { empleados } = useEmpleados();

    const [pageTable2, setPageTable2] = useState(1)
    const [dataTable2, setDataTable2] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [detalleData, setDetalleData] = useState(null)    
    const resultsPerPage = 5
    const totalResults = detallePedidos2.length

    function onPageChangeTable2(p) {
        setPageTable2(p)
    }

    function openModal(detalle) {
        setModalIsOpen(true)
        setDetalleData(detalle)
    }

    function closeModal() {
        setModalIsOpen(false)
    }
    

    useEffect(() => {
        setDataTable2(detallePedidos2.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage));
    }, [detallePedidos, pageTable2]);

    
    return (
        <>
            <PageTitle>
                Historial detalles
            </PageTitle>

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
                            <TableCell>Historial estados</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody className="w-12">
                        {dataTable2.map(detallePedido => (
                            <TableRow key={detallePedido.idDetallePedido}>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.nombreAnillido ? detallePedido.nombreAnillido : "No aplica"}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.servicio}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.peso}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.tamanoAnillo}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.tamanoPiedra ? detallePedido.tamanoPiedra : 'No aplica'}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.material}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.detalle}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{detallePedido.cantidad}</p>
                                </TableCell>
                                <TableCell>
                                    {empleados.map((empleado) => {
                                        return empleado.idEmpleado == detallePedido.idEmpleado ? <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{empleado.nombre}{' '}{empleado.apellido}</p> : null
                                    })}
                                </TableCell>
                                <TableCell >
                                    <Button layout="link" className='ml-6 mr-6 pr-6' size="icon">
                                        <History className="w-5 h-5 ml-6" aria-hidden="true" onClick={() => openModal(detallePedido)}/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
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
            <div className=" w-full ml-auto mt-5 mb-6 space-x-5">
                <Button layout="outline" onClick={() => history.push('/app/historial')}>
                    Regresar a pedidos
                </Button>
            </div>

            <ModalHistorialDetalles isOpen={modalIsOpen} isClose={closeModal} detalle={detalleData}/>
        </>
    )
}

export default HistorialDetalles