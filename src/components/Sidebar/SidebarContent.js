import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import { usePermisos } from '../../services/hooks/usePermisos'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {

  const { permisos } = usePermisos();
  const newPermisos = [];

  permisos.forEach(item =>{
    if (item.nombrePermiso === "Dashboard") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "Chart",
        url: "/app/dashboard",
      });
    }
    if (item.nombrePermiso === "Backup") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "CircleStack",
        url: "/app/backup",
      });
    }
    if (item.nombrePermiso === "Roles") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "Cog",
        url: "/app/roles",
      });
    }
    if (item.nombrePermiso === "Empleados") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "Users",
        url: "/app/empleados",
      });
    }
    if (item.nombrePermiso === "Clientes") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "User",
        url: "/app/clientes",
      });
    }
    if (item.nombrePermiso === "Pedidos") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "Clipboard",
        url: "/app/pedidos",
      });
    }
    if (item.nombrePermiso === "Historial pedidos") {
      newPermisos.push({
        idPermiso: item.idPermiso,
        nombre: item.nombrePermiso,
        icono: "DocumentGlass",
        url: "/app/historial",
      });
    }
  });

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">
        JalbacSoft
      </a>
      <ul className="mt-6">
        {newPermisos.map((permiso) =>
          (
            <li className="relative px-6 py-3" key={permiso.idPermiso}>
              <NavLink
                to={permiso.url}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={permiso.url}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true">
                  </span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={permiso.icono} />
                <span className="ml-4">{permiso.nombre}</span>

              </NavLink>
            </li>
          )
        )}
      </ul>
      
    </div>
  )
}

export default SidebarContent