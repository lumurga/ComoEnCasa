import React, { useState } from 'react';
import {Formik, Form, Field} from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "./LoginFormik.scss"

const Loginformik = ({setLogged}) => {

    const history = useHistory();
    const location = useLocation()
    const { t } = useTranslation()
    const [loginError, setLoginError] = useState(false)
    
    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}

                onSubmit={(values, {resetForm}) => {

                    let newUser = {
                        email : values.email.toLowerCase().trim(),
                        password: values.password,
                    }

                    let config = {
                        method : "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify(newUser)
                    }

                    fetch('http://52.67.178.177:8080/api/auth/signin', config)
                        .then(response => response.json())
                        .then(responseJSON => {  

                            sessionStorage.setItem('token', responseJSON.token);
                            sessionStorage.setItem('email', responseJSON.email);
                            sessionStorage.setItem('name', responseJSON.name);
                            sessionStorage.setItem('lastName', responseJSON.lastName);
                            sessionStorage.setItem('role', responseJSON.authorities[0].authority);

                            // var myHeaders = new Headers();
                            // myHeaders.append("Authorization", "Bearer " + responseJSON.token);
                            // myHeaders.append("Content-Type", "application/json");

                            // var requestOptions = {
                            //     method: 'GET',
                            //     headers: myHeaders,
                            //     redirect: 'follow'
                            // };

                            fetch("http://52.67.178.177:8080/users/" + sessionStorage.getItem("email"))
                            .then(response => response.json())
                            .then(responseJSON => {  
                                sessionStorage.setItem("id", responseJSON.id);
                            })

                            setLogged(true)

                            history.replace(from)
                        })
                        .catch(() => {
                            console.log("error al loguear el usuario")
                            setLoginError(true);
                        });
                }}
            >
            {({}) => (
                <Form id="formLogin">
                    <h2>{t('login_button_header')}</h2>
                    <div className="loginGroup" id="mail-input">
                        <label>{t('email')}</label>
                        <Field 
                            type="text"
                            id="email"
                            name="email"
                            placeholder="correo@correo.com"
                            onFocus={() => setLoginError(false)}
                        />
                    </div>
                    <div className="loginGroup" id="password-input">
                        <label>{t('password')}</label>
                        <Field 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            onFocus={() => setLoginError(false)}
                        />
                    </div>
                        {loginError && <div className="loginError"> {t('error_login')} </div> }
                    <div className="buttonGroup">
                        <button type="submit">
                            {t('login_button_submit')}
                        </button>
                        <Link to="/register" >
                            {t('no_account_yet')}
                        </Link>
                    </div>
                </Form>
            )}
            </Formik>
        </>
    );
}

export default Loginformik;
