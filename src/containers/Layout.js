import React, { useContext, Suspense, useEffect, lazy } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import routes from '../routes'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'
import { SidebarContext } from '../context/SidebarContext'
import Cookies from "js-cookie";

const Page404 = lazy(() => import('../pages/404'))

function Layout() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
  let location = useLocation()
  let cookie = null
  useEffect(() => {
    closeSidebar()
  }, [location])

  if (Cookies.get('CookieJalbac') !== '' ) {
    cookie = Cookies.get('CookieJalbac')
  }
  else{
    console.log('no logueado')
  }
  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
    >
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<ThemedSuspense />}>
            {
              cookie !== undefined ? 
                <Switch>
                  {routes.map((route, i) => {
                    return route.component ? (
                      <Route
                        key={i}
                        exact={true}
                        path={`/app${route.path}`}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null
                  })}
                  <Redirect exact from="/app" to="/app/dashboard" />
                  <Route component={Page404} />
                </Switch> 
              : 
                <Switch>
                  <Redirect exact from="/app" to="/app/404" />
                  <Route component={Page404} />
                </Switch>
            }
          </Suspense>
        </Main>
      </div>
    </div>
  )
}

export default Layout