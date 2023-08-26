/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  /*{
    path: '/app/forms',
    icon: 'FormsIcon',
    name: '',
  },*/
  {
    icon: 'PagesIcon',
    name: 'Configuración',
    routes: [
      // submenu
      {
        path: '/app/backup',
        name: 'Backup',
      },
      {
        path: '/app/roles',
        name: 'Roles',
      },
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Usuarios',
    routes: [
      // submenu
      {
        path: '/app/usuarios',
        name: 'Usuarios',
      },
    ],
  },
  {
    icon: 'PagesIcon',
    name: 'Ventas',
    routes: [
      // submenu
      {
        path: '/app/empleados',
        name: 'Empleados',
      },
      {
        path: '/app/clientes',
        name: 'Clientes',
      },
      {
        path: '/app/pedidos',
        name: 'Pedidos',
      },
      {
        
        path: '/app/crearPedido',
        name: 'Crear pedido',
      },
      {
        path: '/app/historial',
        name: 'Historial pedidos',
      },
      {
        path: '/app/hisDetalles',
        name: 'Historial pedidos',
      },
      {
        path: '/app/devoluciones',
        name: 'Devoluciones',
      },
      {
        path: '/app/pedidosEntregados',
        name: 'Crear pedido',
      }
    ],
  },
]

export default routes
