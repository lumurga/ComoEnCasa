import React, { useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import "./UserHeader.scss";


const Userheader = ({className, setLogged}) => {


    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");

    const history = useHistory();
    const { t } = useTranslation();

    const logout = () => {
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('role');
        sessionStorage.setItem('token', null);
        setLogged(false);
        history.push('/');
    }

    const goProductAdministration  = () => {
        if(window.innerWidth <= 428){
            document.querySelector(".menuContainer").style.width = "0";
            document.querySelector(".footerContainer").style.zIndex = "1";
        }
        history.push('/administration/products');
    }

    const goUserProfile = () => {
        if(window.innerWidth <= 428){
            document.querySelector(".menuContainer").style.width = "0";
            document.querySelector(".footerContainer").style.zIndex = "1";
        }
        history.push("/user")
    }

    useEffect(() => {
        setName(sessionStorage.getItem("name"));
        setLastName(sessionStorage.getItem("lastName"));
        setRole(sessionStorage.getItem("role"));
      }, [])

    


    return (
        <div className={className}>
            {role === "ROLE_ADMIN" && <div className="admin" onClick={goProductAdministration}><p>{t('administration')}</p></div>}
            {role === "ROLE_USER" &&
                <> 
                <div className="userCircle" onClick={goUserProfile}>
                    {name[0]}{lastName[0]}
                </div>
                <div className="greeting" onClick={goUserProfile}>
                    <p>{t('greeting_user_header')}</p>
                    <p id="name">{name} {lastName}</p>
                </div>
                </>
            }
            {role === "ROLE_ADMIN" && 
            <div className="userCircle">
                {name[0]}{lastName[0]}
            </div>}
            {role === "ROLE_ADMIN" && 
            <div className="greeting">
                <p>Hola,</p>
                <p id="name">{name} {lastName}</p>
            </div>}
            <FontAwesomeIcon id="logoutIcon" icon={faTimes} onClick={logout} style={{cursor: "pointer"}}/>
        </div>
    );
}

export default Userheader;
