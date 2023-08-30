import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import {PrivateRoute, LogeadoRoute} from './routes/PrivateRoute'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/login-accountPages/Login'))
const RecuperarPassword = lazy(() => import('./pages/login-accountPages/recuperarPassword'))
const RestablecerPassword = lazy(() => import('./pages/login-accountPages/restablecerPassword'))
const Page404 = lazy(() => import('./pages/404')) 

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <LogeadoRoute path="/login" component={Login} />
          <Route path="/recuperar-password" component={RecuperarPassword} />
          <Route path="/restablecer-password" component={RestablecerPassword} />
          <Route path="/Pagina404" component={Page404}/>

          {/* Se cargan las rutas según los permisos del usuario */}
          <PrivateRoute path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
          {/* Redirecciona automaticamente cuando no existe una ruta */}
          <Route component={Page404}/>
        </Switch>
      </Router>

    </>
  )
}

export default App
