import React from 'react'
import {
    Card,
    CardBody,
    Button
} from '@windmill/react-ui'
import { Devolver } from '../../../../icons'
export const CardDetalles = ({ detallePedido }) => {
    return (
        <Card key={detallePedido.idDetallePedido} className="mb-3 shadow-md w-auto">
            <CardBody className='h-full dark:bg-gray-700 bg-gray-100'>
                <div>
                    <div className='flex flex-row'>
                        <div className='space-y-1 mr-4 mb-1'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Nombre anillo
                            </p>
                            <p >
                                {detallePedido.nombreAnillido}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tipo
                            </p>
                            <p>
                                {detallePedido.tipo}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Peso
                            </p>
                            <p >
                                {detallePedido.peso}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tamaño piedra
                            </p>
                            <p>
                                {detallePedido.tamanoPiedra}
                            </p>

                        </div>

                        <div className='space-y-1 mb-1'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Material
                            </p>
                            <p>
                                {detallePedido.material}
                            </p>

                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Cantidad
                            </p>
                            <p>
                                {detallePedido.cantidad}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Estado
                            </p>
                            <p>
                                {detallePedido.idEstadoNavigation.nombre}
                            </p>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-sm">
                                Tamaño anillo
                            </p>
                            <p>
                                {detallePedido.tamanoAnillo}
                            </p>

                        </div>


                    </div>
                    <div className='relative'>
                        <div className='flex flex-row space-x-4'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-center text-sm">
                                Empleado
                            </p>
                            <p className='text-center'>
                                {detallePedido.idEmpleadoNavigation.nombre}
                            </p>
                        </div>
                        <div className='flex flex-row space-x-4'>
                            <p className=" text-gray-700 dark:text-gray-300 font-bold text-center text-sm">
                                Detalle
                            </p>
                            <p className='text-center'>
                                {detallePedido.detalle}
                            </p>
                        </div>
                        <div className='absolute top-0 right-0'>
                            <Button icon={Devolver}>
                            </Button>
                        </div>
                    </div>


                </div>
            </CardBody>
        </Card>
    )
}
