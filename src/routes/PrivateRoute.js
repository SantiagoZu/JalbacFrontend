import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const cookie = Cookies.get('CookieJalbac')

    if(!cookie){
        return false;
    }
    else{
        return true;
    }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
};

const LogeadoRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect to="/app" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};


  
export {PrivateRoute, LogeadoRoute};