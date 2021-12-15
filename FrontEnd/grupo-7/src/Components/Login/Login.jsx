import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import LoginFormik from "../LoginFormik/LoginFormik"

// No logueada: Redirigir al bloque login. El login debe contener un texto en su parte superior que indique que el login es obligatorio y que en caso de no estar registrada, la persona usuaria deberá registrarse.

const Login = ({setLogged}) => {

    useEffect(() => {
        if(window.innerWidth <= 428){
            document.querySelector(".menuContainer").style.width = "0";
            document.querySelector(".footerContainer").style.zIndex = "1";
        }
    }, [])

    return (
        <>
        <main style={{display: 'flex', justifyContent: 'center', width: "100%", marginBottom:'0'}}>
            <LoginFormik setLogged={setLogged}/>
        </main>
        </>
    );
}

export default Login;
