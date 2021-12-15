import React, {useState, useEffect} from 'react';

/* Componentes */
import RegisterFormik from '../RegisterFormik/RegisterFormik';
import Header from '../Header/Header';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

const Register = ({button, setLogged, booking, setBooking, id}) => {

    const [registerError, setRegisterError] = useState(false)

    useEffect(() => {
        if(window.innerWidth <= 428){
            document.querySelector(".menuContainer").style.width = "0";
            document.querySelector(".footerContainer").style.zIndex = "1";
        }
    }, [])


    return (
        <>
        <Header button={button} />
        <main style={{display: 'flex', justifyContent: 'center', width: "100%", flexWrap: 'wrap', marginTop: '12vh',  marginBottom: '12vh'}}>
            {registerError && <div className="registerError"><FontAwesomeIcon className = "warningIcon" icon={faExclamationCircle}/><h5>No ha podido registrarse. Por favor intente más tarde</h5></div>}
            <RegisterFormik setLogged={setLogged} booking={booking} setBooking={setBooking} id={id} setRegisterError={setRegisterError}/>
        </main>
        </>
    );
}

export default Register;
