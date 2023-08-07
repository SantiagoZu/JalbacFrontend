import { lazy } from 'react'
import Cookies from 'js-cookie'
import { usePermisos } from '../services/hooks/UsePermisos'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/DashboardPages/Dashboard'))
const Roles = lazy(() => import('../pages/ConfiguracionPages/Roles'))
const Empleados = lazy(() => import('../pages/VentasPages/Empleados'))
const Clientes = lazy(() => import('../pages/VentasPages/Clientes'))
const Pedidos = lazy(() => import('../pages/VentasPages/Pedidos'))
const CrearPedido = lazy(() => import('../pages/VentasPages/components/PedidosComponents/CrearPedido'))
const EditarPedido = lazy(() => import('../pages/VentasPages/components/PedidosComponents/EditarPedido'))
const Historial = lazy(() => import('../pages/VentasPages/historialEstado'))
const Backup = lazy(() => import('../pages/ConfiguracionPages/backUp'))
const HistorialDetalles = lazy(() => import('../pages/VentasPages/components/HistorialPedidosComponents/HistorialDetalles'))


export const Routes = () => {

  const { permisos } = usePermisos();
  const cookie = Cookies.get('CookieJalbac');
  const routes = [
  ]

  if (cookie != '') {

    permisos.forEach(item => {
      if (item.nombrePermiso === "Dashboard") {
        routes.push({
          path: '/dashboard',
          component: Dashboard
        });
      }
      if (item.nombrePermiso === "Backup") {
        routes.push({
          path: '/backup',
          component: Backup
        });
      }
      if (item.nombrePermiso === "Roles") {
        routes.push({
          path: '/roles',
          component: Roles
        });
      }
      if (item.nombrePermiso === "Empleados") {
        routes.push({
          path: '/empleados',
          component: Empleados,
        });
      }
      if (item.nombrePermiso === "Clientes") {
        routes.push({
          path: '/clientes',
          component: Clientes,
        });
      }
      if (item.nombrePermiso === "Pedidos") {
        routes.push({
          path: '/pedidos',
          component: Pedidos
        }, {
          path: '/crearPedido',
          component: CrearPedido,
        }, {
          path: '/editarPedido',
          component: EditarPedido,
        });
      }
      if (item.nombrePermiso === "Historial pedidos") {
        routes.push({
          path: '/historial',
          component: Historial,
        },
          {
            path: '/mostrarDetalles',
            component: HistorialDetalles
          });
      }
      
    });
  }

  return {
    routes
  }
}

// const routes = [
//   {
//     path: '/dashboard', // the url
//     component: Dashboard, // view rendered
//   },
//   {
//     path: '/roles',
//     component: Roles,
//   },
//   {
//     path: '/empleados',
//     component: Empleados,
//   },
//   {
//     path: '/clientes',
//     component: Clientes,
//   },
//   {
//     path: '/pedidos',
//     component: Pedidos,
//   },
//   {
//     path: '/devoluciones',
//     component: Devoluciones,
//   },
//   {
//     path: '/historial',
//     component: Historial,
//   },
//   {
//     path: '/backup',
//     component: Backup,
//   },
// ]