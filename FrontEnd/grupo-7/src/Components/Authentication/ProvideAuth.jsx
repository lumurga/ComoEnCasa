import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const authContext = createContext();

function useAuth() {
    return useContext(authContext);
}

function useProvideAuth() {
    const [user, setUser] = useState(null);
  
    const signin = cb => {
      return fakeAuth.signin(() => {
        setUser("user");
        cb();
        });
    };

    const signout = cb => {
        return fakeAuth.signout(() => {
        setUser(null);
        cb();
        });
    };

return {
    user,
    signin,
    signout
  };
}

const Provideauth = ({children}) => {
    const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default Provideauth;
