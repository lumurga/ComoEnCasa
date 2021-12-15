import React, {useState, useEffect, useMemo } from 'react';

const UsuarioContext = React.createContext();

export function UsuarioProvider(props){

    const [usuario, setUsuario] = useState(null)
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const [logeado, setLogeado] = useState(null);


    const value = useMemo(() => {
        return ({
            usuario,
            setUsuario,
            setLogeado,
            cargandoUsuario,
            logeado
        })
    }, [usuario, cargandoUsuario, logeado])

    return <UsuarioContext.Provider value={value} {...props} />
}

export function useUsuario() {
    const context = React.useContext(UsuarioContext);
    if (!context) {
        throw new Error('useUsuario debe estar dentro del proovedor UsuarioContext')
    }
    return context
}