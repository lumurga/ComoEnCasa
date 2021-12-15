import React, {useState, useEffect, useMemo } from 'react';

const UserContext = React.createContext();

export function UserProvider(props){

    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true);

}