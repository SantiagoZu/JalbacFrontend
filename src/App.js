import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/login-accountPages/Login'))
const CreateAccount = lazy(() => import('./pages/login-accountPages/CreateAccount'))
const recuperarPassword = lazy(() => import('./pages/login-accountPages/recuperarPassword'))
const restablecerPassword = lazy(() => import('./pages/login-accountPages/restablecerPassword'))

function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/recuperar-password" component={recuperarPassword} />
          <Route path="/restablecer-password" component={restablecerPassword} />

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
