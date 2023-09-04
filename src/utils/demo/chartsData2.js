import { useDetallePedidos } from '../../services/hooks/useDetallePedidos';
import { useEmpleados } from './../../services/hooks/useEmpleados';
import moment from 'moment';


const colorYear = {
    2020: '#fbbf24',
    2021: '#a3e635',
    2022: '#fde68a',
    2023: '#a5f3fc',
    2024: '#f472b6',
    2025: '#ffe4e6',
    2026: '#94a3b8',
    /*   2027: 'rgba(255, 159, 64, 0.2)',
      2028: 'rgba(255, 205, 86, 0.2)',
      2029: 'rgba(255, 159, 64, 0.2)',
      2030: 'rgba(255, 205, 86, 0.2)', */
};

function Charts2(fechaInicioCantidadPedidos, fechaFinCantidadPedidos) {
    const { empleados } = useEmpleados();
    const { detallePedidos } = useDetallePedidos();

    const fechaInicioCantidadPedidosFiltrar = fechaInicioCantidadPedidos || '';

    const detallesFiltrados = detallePedidos.filter((detalle) => {
        if (fechaInicioCantidadPedidosFiltrar !== '') {
            const fechaPedidoEmpleado = moment(detalle.idPedidoNavigation.fechaPedido);
            return (
                fechaPedidoEmpleado.isSameOrAfter(moment(fechaInicioCantidadPedidosFiltrar)) &&
                (!fechaFinCantidadPedidos || fechaPedidoEmpleado.isSameOrBefore(moment(fechaFinCantidadPedidos)) && detalle.idPedidoNavigation.isActivo)
            );
        }
        return (
            !fechaFinCantidadPedidos ||
            moment(detalle.idPedidoNavigation.fechaPedido).isSameOrBefore(moment(fechaFinCantidadPedidos))
        );
    });

    const cantidadPedidosPorEmpleado = empleados.map((empleado) => {
        const empleadoId = empleado.idEmpleado;
        const empleadoNombre = `${empleado.nombre} ${empleado.apellido}`;
        const pedidosEmpleado = detallesFiltrados.filter((detalle) => detalle.idEmpleado === empleadoId);

        const pedidosPorAño = pedidosEmpleado.reduce((accumulator, currentPedido) => {
            const pedidoYear = moment(currentPedido.idPedidoNavigation.fechaPedido).year();
            if (!accumulator[pedidoYear]) {
                accumulator[pedidoYear] = 1;
            } else {
                accumulator[pedidoYear]++;
            }
            return accumulator;
        }, {});

        return { empleadoNombre, pedidosPorAño };
    });

    const uniqueYears = [...new Set(detallesFiltrados.map(
        (detalle) => moment(detalle.idPedidoNavigation.fechaPedido).year())
    )];
    uniqueYears.sort();

    const labelsEmpleados = cantidadPedidosPorEmpleado.map((empleado) => empleado.empleadoNombre);

    const datasets = uniqueYears.map((year) => ({
        label: year,
        backgroundColor: colorYear[year] || '#000000',
        borderColor: '#0694a2',
        data: cantidadPedidosPorEmpleado.map((empleado) => empleado.pedidosPorAño[year] || 0),
        fill: false,
    }));

    const pedidosEmpleado = {
        data: {
            labels: labelsEmpleados,
            datasets: datasets,
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
                yAxes: [{
                    ticks: {
                        precision: -1
                    }
                }],
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
            display: true,
        },
    };

    return {
        pedidosEmpleado,
    };
}

export default Charts2;
