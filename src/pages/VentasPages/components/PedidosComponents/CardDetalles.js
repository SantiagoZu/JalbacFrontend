import React from 'react'
import {
    Card,
    CardBody
} from '@windmill/react-ui'

export const CardDetalles = ({detallePedido}) => {
    return (
        <Card key={detallePedido.idDetallePedido} className="mb-8 shadow-md">
            <CardBody>
            
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Nombre Anillido: {detallePedido.nombreAnillido}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Tipo: {detallePedido.tipo}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Peso: {detallePedido.peso}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Tamaño Anillo: {detallePedido.tamanoAnillo}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Tamaño Piedra: {detallePedido.tamanoPiedra}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Material: {detallePedido.material}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Detalle: {detallePedido.detalle}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Cantidad: 5
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Estado: {detallePedido.idEstadoNavigation.nombre}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Empleado: {detallePedido.idEmpleadoNavigation.nombre}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Motivo Devolución: {detallePedido.motivoDevolucion}
                </p>
            </CardBody>
        </Card>
    )
}
