import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import "./RegisterFormik.scss"

const Registerformik = ({booking, setBooking, id, setRegisterError, setLogged}) => {

    const history = useHistory();
    const { t } = useTranslation()
    // const [formularioEnviado, setFormularioEnviado] = useState(false)


    return (
        <>
            <Formik
                initialValues={{
                    nombre: "",
                    apellido: "",
                    email: "",
                    password: "",
                    rePassword: ""
                }}
                validate={(values) => {
                    let errors = {};

                    //Validación Nombre
                    if(!values.nombre){
                        errors.nombre = t('error_register_name.1')
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.nombre)){
                        errors.nombre = t('error_register_name.2')
                    }
                    //Validación Apellido
                    if(!values.apellido){
                        errors.apellido = t('error_register_lastname.1')
                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.apellido)){
                        errors.apellido = t('error_register_lastname.2')
                    }
                    //Validación Correo
                    if(!values.email){
                        errors.email = t('error_register_email.1')
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
                        errors.email = t('error_register_email.2')
                    }
                    //Validación Password
                    if(!values.password){
                        errors.password = t('error_register_password.1')
                    } else if (values.password.length < 8){
                        errors.password = t('error_register_password.2')
                    }
                    //Validación Re-Password
                    if(!values.rePassword){
                        errors.rePassword = t('error_register_confirm_password.1')
                    } else if (values.password !== values.rePassword){
                        errors.rePassword = t('error_register_confirm_password.2')
                    }

                    return errors;
                }}

                onSubmit={(values, {resetForm}) => {
                    
                    let newUser = {
                        email : values.email.toLowerCase().trim(),
                        lastName : values.apellido.trim(),
                        name : values.nombre.trim(),
                        password: values.password,
                        role: "user"
                    }

                    let user = {
                        email : values.email.toLowerCase().trim(),
                        password: values.password
                    }
            
                    let registerConfig = {
                        method : "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify(newUser)
                    }

                    let loginConfig = {
                        method : "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body : JSON.stringify(user)
                    }

                    fetch(`http://52.67.178.177:8080/api/auth/signup`, registerConfig)
                    .then(response => {

                        if(response.ok) {
                            console.log("registro ok")

                            fetch('http://52.67.178.177:8080/api/auth/signin', loginConfig)
                                .then(response => response.json())
                                .then(responseJSON => {  
                                    console.log("login ok")

                                    sessionStorage.setItem('token', responseJSON.token);
                                    sessionStorage.setItem('email', responseJSON.email);
                                    sessionStorage.setItem('name', responseJSON.name);
                                    sessionStorage.setItem('lastName', responseJSON.lastName);
                                    sessionStorage.setItem('role', responseJSON.authorities[0].authority);

                                    setLogged(true)

                                    if(booking){
                                        setBooking(false)
                                        history.push("/product/" + id + "/booking")
                                    }
                                    else history.push("/")
                                })
                                .catch((e) => {
                                    console.log(e)
                                    setRegisterError(true);
                                });
                        }

                        else {
                            console.log("error")
                            setRegisterError(true);
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                        setRegisterError(true);
                    });
                }}
            >
                {({errors}) => (
                    <Form id="formRegister">
                        <h2>{t('create_account_button')}</h2>
                        <div class="name">
                            <div className="registGroup" id="nameContainer">
                                <label>{t('name')}</label>
                                <Field 
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder={t('placeholder_name_register')}
                                />
                            </div>
                                <ErrorMessage name="nombre" component={() => (<div className="errorRegister1"> {errors.nombre} </div>)} />
                            <div className="registGroup" id="lastNameContainer">
                                <label>{t('lastname')}</label>
                                <Field 
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    placeholder={t('placeholder_lastname_register')}
                                />
                            </div>
                                <ErrorMessage name="apellido" component={() => (<div className="errorRegister2"> {errors.apellido} </div>)} />
                        </div>
                            <div className="registGroup">
                                <label>{t('email')}</label>
                                <Field 
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="correo@correo.com"
                                />
                                <ErrorMessage name="email" component={() => (<div className="errorRegister"> {errors.email} </div>)} />
                            </div>
                            <div className="registGroup">
                                <label>{t('password')}</label>
                                <Field 
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                />
                                <ErrorMessage name="password" component={() => (<div className="errorRegister"> {errors.password} </div>)} />
                            </div>
                            <div className="registGroup">
                                <label>{t('confirm_password_register')}</label>
                                <Field 
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    placeholder="********"
                                />
                                <ErrorMessage name="rePassword" component={() => (<div className="errorRegister"> {errors.rePassword} </div>)} />
                            </div>
                        <div className = "buttonGroup">
                            <button type = "submit">
                                {t('register_button_submit')}
                            </button>
                            <Link to = "/login" >
                                {t('go_to_login')}
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Registerformik;
