import React from 'react';
import { Route, Redirect, useLocation, useHistory } from 'react-router-dom';


const AdminRoute = ({ children, ...rest })  => {

    return (
      <Route
        {...rest}
        render={({ location }) =>
        sessionStorage.getItem("role") === "ROLE_ADMIN" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

export default AdminRoute;