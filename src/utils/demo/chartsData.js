import { usePedidos } from './../../services/hooks/usePedidos';

function Charts(fechaInicioPedidos, fechaFinPedidos) {
  const { pedidos } = usePedidos()

  const fechaInicioPedidosFiltrar = fechaInicioPedidos || '';

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (fechaInicioPedidosFiltrar !== '') {
      console.log(pedido.fechaPedido)
      const fechaPedido = new Date(pedido.fechaPedido);
      return fechaPedido >= new Date(fechaInicioPedidosFiltrar) &&
        (!fechaFinPedidos || fechaPedido <= new Date(fechaFinPedidos));
    }
    return (!fechaFinPedidos || new Date(pedido.fechaPedido) <= new Date(fechaFinPedidos));
  });


  const cantidadPedidosPorMes = pedidosFiltrados.reduce((acc, pedido) => {
    const fechaPedido = new Date(pedido.fechaPedido);
    const mes = fechaPedido.getMonth();
    if (!acc[mes]) {
      acc[mes] = 1;
    } else {
      acc[mes]++;
    }
    return acc;
  }, []);

  const cantidadPedidos = {
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Pedidos',
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: '#0694a2',
          borderColor: '#0694a2',
          data: cantidadPedidosPorMes,
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
      display: false,
    },
  }

  return {
    cantidadPedidos
  };
}

export default Charts;





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

export const lineLegends = [
  { title: 'Pedidos', color: 'bg-teal-600' },
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
