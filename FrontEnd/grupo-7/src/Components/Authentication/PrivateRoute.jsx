import React from 'react';
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom';


const PrivateRoute = ({ children, ...rest })  => {

    return (
      <Route
        {...rest}
        render={({ location }) =>
          sessionStorage.getItem("role") === "ROLE_USER" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default PrivateRoute;

