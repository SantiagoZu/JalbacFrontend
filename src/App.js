import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/login-accountPages/Login'))
const RecuperarPassword = lazy(() => import('./pages/login-accountPages/recuperarPassword'))
const RestablecerPassword = lazy(() => import('./pages/login-accountPages/restablecerPassword'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/recuperar-password" component={RecuperarPassword} />
          <Route path="/restablecer-password" component={RestablecerPassword} />

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>

    </>
  )
}

export default App
