import { useDetallePedidos } from '../../services/hooks/useDetallePedidos';
import { useEmpleados } from './../../services/hooks/useEmpleados';

function Charts2(fechaInicioCantidadPedidos, fechaFinCantidadPedidos) {
    const { empleados } = useEmpleados()
    const { detallePedidos } = useDetallePedidos()


    const fechaInicioCantidadPedidosFiltrar = fechaInicioCantidadPedidos || '';

    const detallesFiltrados = detallePedidos.filter((detalle) => {

        if (fechaInicioCantidadPedidosFiltrar !== '') {
            const fechaPedidoEmpleado = new Date(detalle.idPedidoNavigation.fechaPedido);
            return fechaPedidoEmpleado >= new Date(fechaInicioCantidadPedidosFiltrar) &&
                (!fechaFinCantidadPedidos || fechaPedidoEmpleado <= new Date(fechaFinCantidadPedidos));
        }
        return (!fechaFinCantidadPedidos || new Date(detalle.idPedidoNavigation.fechaPedido) <= new Date(fechaFinCantidadPedidos));
    });

    const cantidadPedidosPorEmpleado = empleados.map((empleado) => {
        const empleadoId = empleado.idEmpleado;
        const empleadoNombre = `${empleado.nombre} ${empleado.apellido}`; 
        const cantidadPedidos = detallesFiltrados.filter((detalle) => detalle.idEmpleado === empleadoId).length;
        return { empleadoNombre, cantidadPedidos };
    });

    const labelsEmpleados = cantidadPedidosPorEmpleado.map((empleado) => empleado.empleadoNombre);
    const dataPedidosEmpleado = cantidadPedidosPorEmpleado.map((empleado) => empleado.cantidadPedidos);


    const pedidosEmpleado = {
        data: {
            labels: labelsEmpleados,
            datasets: [
                {
                    label: 'Pedidos',
                    /**
                     * These colors come from Tailwind CSS palette
                     * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
                     */
                    backgroundColor: '#0694a2',
                    borderColor: '#0694a2',
                    data: dataPedidosEmpleado,
                    fill: false,
                },

            ],
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true,
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Empleados',
                    },
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Cantidad de pedidos',
                    },
                },
            },
        },
        legend: {
            display: false,
        },
    };

    return {
        pedidosEmpleado,
    };
}

export default Charts2;