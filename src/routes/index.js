import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/DashboardPages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const Roles = lazy(() => import('../pages/ConfiguracionPages/Roles'))
const Empleados = lazy(() => import('../pages/VentasPages/Empleados'))
const Clientes = lazy(() => import('../pages/VentasPages/Clientes'))
const Pedidos = lazy(() => import('../pages/VentasPages/Pedidos'))
const CrearPedido = lazy(() => import('../pages/VentasPages/components/PedidosComponents/CrearPedido'))
const EditarPedido = lazy(() => import('../pages/VentasPages/components/PedidosComponents/EditarPedido'))
const Devoluciones = lazy(() => import('../pages/VentasPages/Devoluciones'))
const Perfil = lazy(() => import('../pages/Perfil'))
const Historial = lazy(() => import('../pages/VentasPages/historialEstado'))
const Backup = lazy(() => import('../pages/ConfiguracionPages/backUp'))
const HistorialDetalles = lazy(() => import('../pages/VentasPages/components/HistorialPedidosComponents/HistorialDetalles'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
  {
    path: '/roles',
    component: Roles,
  },
  {
    path: '/empleados',
    component: Empleados,
  },
  {
    path: '/clientes',
    component: Clientes,
  },
  {
    path: '/pedidos',
    component: Pedidos,
  },
  {
    path: '/crearPedido',
    component: CrearPedido,
  },
  {
    path: '/historialDetalles',
    component: HistorialDetalles
  },
  {
    path: '/editarPedido',
    component: EditarPedido,
  },
  {
    path: '/devoluciones',
    component: Devoluciones,
  },
  {
    path: '/perfil',
    component: Perfil,
  },
  {
    path: '/historial',
    component: Historial,
  },
  {
    path: '/backup',
    component: Backup,
  },
]

export default routes