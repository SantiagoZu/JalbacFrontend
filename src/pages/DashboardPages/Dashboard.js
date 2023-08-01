import React, { useState, useEffect } from 'react'
import moment from 'moment'
import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import Calendario from './components/Calendario'
import ChartLegend from '../../components/Chart/ChartLegend'
import PageTitle from '../../components/Typography/PageTitle'
import RoundIcon from '../../components/RoundIcon'
import { Doughnut, Line } from 'react-chartjs-2'
import { CartIcon, PeopleIcon } from '../../icons'
import { useEmpleados } from '../../services/hooks/useEmpleados'
import { useClientes } from '../../services/hooks/useClientes'
import { usePedidos } from '../../services/hooks/usePedidos'
import Charts, {
  doughnutLegends,
  lineLegends
} from '../../utils/demo/chartsData'
import Chart3 from '../../utils/demo/chartsData3'
import Charts2 from '../../utils/demo/chartsData2'
import { useDetallePedidos } from '../../services/hooks/useDetallePedidos'

function Dashboard() {

  const [fechaInicioPedidos, setFechaInicioPedidos] = useState('');
  const [fechaFinPedidos, setFechaFinPedidos] = useState('');
  const [fechaInicioCantidadPedidos, setFechaInicioCantidadPedidos] = useState('');
  const [fechaFinCantidadPedidos, setFechaFinCantidadPedidos] = useState('');
  const [fechaInicioServicio, setFechaInicioServicio] = useState('');
  const [fechaFinServicio, setFechaFinServicio] = useState('');

  const { empleados } = useEmpleados();
  const { clientes } = useClientes();
  const { pedidos } = usePedidos();
  const { detallePedidos } = useDetallePedidos();

  useEffect(() => {
    if (pedidos.length > 0) {
      const fechasPedidos = pedidos.map(pedido => moment(pedido.fechaPedido));
      const fechaPedidoMasAntigua = moment.min(fechasPedidos);
      const fechaPedidoMasNueva = moment.max(fechasPedidos);
      
      setFechaInicioPedidos(fechaPedidoMasAntigua.format('YYYY-MM-DD')); 
      setFechaFinPedidos(fechaPedidoMasNueva.format('YYYY-MM-DD')); 
    }
  }, [pedidos]);

  useEffect(() =>{
    if (detallePedidos.length > 0) {
      const fechasDetallePedidos = detallePedidos.map(detalle => moment(detalle.idPedidoNavigation.fechaPedido));
      const fechaDetallePedidoMasAntigua = moment.min(fechasDetallePedidos);
      const fechaDetallePedidoMasNueva = moment.max(fechasDetallePedidos);
      
      setFechaInicioCantidadPedidos(fechaDetallePedidoMasAntigua.format('YYYY-MM-DD')); 
      setFechaFinCantidadPedidos(fechaDetallePedidoMasNueva.format('YYYY-MM-DD')); 
      setFechaInicioServicio(fechaDetallePedidoMasAntigua.format('YYYY-MM-DD')); 
      setFechaFinServicio(fechaDetallePedidoMasNueva.format('YYYY-MM-DD')); 
    }
  }, [detallePedidos])

  return (
    <>
      <PageTitle>Dashboard</PageTitle>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Clientes" value={clientes.length}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Empleados" value={empleados.length}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <PageTitle>Gráficos</PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 mt-3">
        <Calendario setFechaInicio={setFechaInicioPedidos} setFechaFin={setFechaFinPedidos} 
        fechaInicio={fechaInicioPedidos} fechaFin={fechaFinPedidos}></Calendario>
        <ChartCard title="Cantidad de pedidos">
          <Line {...Charts(fechaInicioPedidos, fechaFinPedidos).cantidadPedidos} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <Calendario setFechaInicio={setFechaInicioCantidadPedidos} setFechaFin={setFechaFinCantidadPedidos}
         fechaInicio={fechaInicioCantidadPedidos} fechaFin={fechaFinCantidadPedidos}></Calendario>
        <ChartCard title="Cantidad de pedidos por empleado">
          <Line {...Charts2(fechaInicioCantidadPedidos, fechaFinCantidadPedidos).pedidosEmpleado} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>

        <Calendario setFechaInicio={setFechaInicioServicio} setFechaFin={setFechaFinServicio}
        fechaInicio={fechaInicioServicio} fechaFin={fechaFinServicio}></Calendario>
        <ChartCard title="Servicio mas solicitado">
          <Doughnut {...Chart3(fechaInicioServicio, fechaFinServicio).servicios} />
          <ChartLegend legends={doughnutLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
