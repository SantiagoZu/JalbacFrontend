import { usePedidos } from './../../services/hooks/usePedidos';
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

function Charts(fechaInicioPedidos, fechaFinPedidos) {
  const { pedidos } = usePedidos()

  const fechaInicioPedidosFiltrar = fechaInicioPedidos || '';

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (fechaInicioPedidosFiltrar !== '') {
      const fechaPedido = moment(pedido.fechaPedido);
      return fechaPedido.isSameOrAfter(moment(fechaInicioPedidosFiltrar)) &&
        (!fechaFinPedidos || fechaPedido.isSameOrBefore(moment(fechaFinPedidos)) && pedido.isActivo);
    }
    return (!fechaFinPedidos || moment(pedido.fechaPedido).isSameOrBefore(moment(fechaFinPedidos)));
  });

  const cantidadPedidosPorMes = pedidosFiltrados.reduce((acc, pedido) => {
    const fechaPedido = moment(pedido.fechaPedido);
    const mes = fechaPedido.month();
    const year = fechaPedido.year();
    if (!acc[year]) {
      acc[year] = Array.from({ length: 12 }, () => 0);
    }
    acc[year][mes]++;
    return acc;
  }, {});

  const years = Object.keys(cantidadPedidosPorMes);

  const datasets = years.map(year => ({
    label: year,
    backgroundColor: colorYear[year] || '#000000',
    data: cantidadPedidosPorMes[year],
    fill: false,
  }));

  const cantidadPedidos = {
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
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
            precision: 0
          }
        }],
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value',
          },
        },
      },
    },
    legend: {
      display: true,
    },
  }

  return {
    cantidadPedidos
  };
}

export default Charts;






/* */

















export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 33, 33],
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2'],
        label: 'Dataset 1',
      },
    ],
    labels: [],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
}

export const doughnutLegends = [
  { title: 'Diseño 3D', color: 'bg-blue-500' },
  { title: 'Terminado a mano', color: 'bg-teal-600' },
  { title: 'Vaceado', color: 'bg-purple-600' },
]

export const barLegends = [
  { title: 'Shoes', color: 'bg-teal-600' },
  { title: 'Bags', color: 'bg-purple-600' },
]

export const barOptions = {
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Shoes',
        backgroundColor: '#0694a2',
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: 'Bags',
        backgroundColor: '#7e3af2',
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}
