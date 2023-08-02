import React, { useContext, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  MoonIcon,
  SunIcon,
  MenuIcon,
  DropdownIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from '../icons'
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext, Button } from '@windmill/react-ui'
import { showCloseSesion } from '../helpers/Alertas'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from "js-cookie";

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const history = useHistory();

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  function deleteCookie(){
    Cookies.remove('CookieJalbac')
  }

  const closeSesion = () =>{
    showCloseSesion('¿Estás seguro que desea cerrar sesión?', 'warning', ()=> deleteCookie(), () => history.push('/login'))
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className='flex: 1'/>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <DropdownIcon className="w-6 h-6 mt-2" aria-hidden="true" />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <button onClick={() => closeSesion()} className='w-full'>
              <DropdownItem href="className='w-full bg-red-700'">
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Cerrar sesión</span>
                
              </DropdownItem>  
              </button> 
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header