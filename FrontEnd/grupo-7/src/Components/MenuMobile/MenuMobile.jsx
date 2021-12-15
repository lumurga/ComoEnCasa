import React, {useState, useEffect} from 'react';
import {useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginRegister from '../LoginRegister/LoginRegister';
import UserHeader from '../UserHeader/UserHeader';
import LanguageMenuMobile from "../LanguageMenu/LanguageMenuMobile"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import './MenuMobile.scss';

const MenuMobile = ({button, setLogged, restLanguages, currentLanguage}) => {

    const [role, setRole] = useState("");

    const history = useHistory();
    const { t } = useTranslation();

    const logout = () => {
        setLogged(false);
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('lastName');
        sessionStorage.removeItem('email');
        sessionStorage.setItem('token', null);
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('id')
        setLogged(false);
        document.querySelector(".menuContainer").style.width = "0";
        document.querySelector(".footerContainer").style.zIndex = "1";
        history.push('/');
    }

    const hideMenu = () => {
        document.querySelector(".menuContainer").style.width = "0";
        document.querySelector(".footerContainer").style.zIndex = "1";
    }

    const goProductAdministration  = () => {
        history.push('/administration/products');
    }

    useEffect(() => {
        setRole(sessionStorage.getItem("role"));
      }, [])

    return (
        <div className="menuContainer">
            <div className="divOne">
                <FontAwesomeIcon icon={faTimes} onClick={hideMenu} style={{cursor: 'pointer'}}/>
                {sessionStorage.getItem("name") ? <UserHeader  className = "userMobile"/> : <h3>{t('menu')}</h3>}
            </div>
            <div className="divTwo">
                {sessionStorage.getItem("role") === "ROLE_USER" ? <p></p> 
                 : sessionStorage.getItem("role") === "ROLE_ADMIN" ? <div className="adminMobile" onClick={goProductAdministration}><p>{t('administration')}</p></div> 
                 : <LoginRegister button={button} classes= "buttonsMenu" />}
                 <div className='headerCountryFlagsMobile'>
                    <LanguageMenuMobile currentLanguage={currentLanguage} restLanguages={restLanguages} /> 
                 </div>
                <div className = "divThree">
                    {sessionStorage.getItem("name") ? <p id="logoutText" onClick={logout}>{t('close_session')}</p> : <p> </p>}
                    {sessionStorage.getItem("name") ? <hr/> : <p> </p>}
                    <div className="socials">
                        <FontAwesomeIcon icon={faFacebook}/>
                        <FontAwesomeIcon icon={faTwitter}/>
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                        <FontAwesomeIcon icon={faInstagram}/>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MenuMobile;