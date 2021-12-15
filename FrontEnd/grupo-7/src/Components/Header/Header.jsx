import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import cookies from 'js-cookie';

import LoginRegister from '../LoginRegister/LoginRegister';
import UserHeader from '../UserHeader/UserHeader';
import MenuMobile from '../MenuMobile/MenuMobile';
import LanguageMenuTablet from "../LanguageMenu/LanguageMenuTablet";
import LanguageMenuDesktop from '../LanguageMenu/LanguageMenuDesktop';
import ReactCountryFlag from "react-country-flag";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import "./Header.scss";
import logo from "../../Assets/Images/logoCasitas-01.png";

const Header = ({button, logged, setLogged}) => {

    const showMenu = () => {
        document.querySelector(".menuContainer").style.width = "50vw";
        document.querySelector(".footerContainer").style.zIndex = "0";
    }

    const languages = [
      {
        code: "de",
        name: "Deutsch",
        country_code: "DE"
      },
      {
        code: "en",
        name: "English",
        country_code: "GB"
      },
      {
        code: "es",
        name: "Español",
        country_code: "AR"
      },
      {
        code: "fr",
        name: "Français",
        country_code: "FR"
      },
      {
        code: "it",
        name: "Italiano",
        country_code: "IT"
      },
      {
        code: "pt",
        name: "Português",
        country_code: "BR"
      }
  ]

    const [restLanguages, setRestLanguages] = useState([])
    const currentLanguageCode = cookies.get('i18next') || 'es';
    const currentLanguage = languages.find(l => l.code === currentLanguageCode)

    
    useEffect(() => {
        setRestLanguages(languages.filter(lan => lan.name !== currentLanguage.name))
    }, [currentLanguageCode])

    return (
        <header>
            <MenuMobile button = {button}  id="Menu" setLogged={setLogged} restLanguages={restLanguages} currentLanguage={currentLanguage} />
            <div className="logo">
                <Link to="/"><img src={logo} alt="logo"/></Link>
                <Link to="/"><h4>Como en casa</h4></Link>
            </div>
            <div className='headerCountryFlagsDesktop'>
              <LanguageMenuDesktop languages={languages} />
            </div>
            <div className="headerCountryFlags">
              <LanguageMenuTablet languages={languages} currentLanguage={currentLanguage} restLanguages={restLanguages} />
            </div>
            {logged ? <UserHeader  languages={languages} className = "userContainer" setLogged={setLogged}/> : <LoginRegister button={button} languages={languages} classes="buttonsHeader"/>}
            <FontAwesomeIcon icon={faBars} id="menuIcon" onClick={showMenu}/>
        </header>
    );
}

export default Header;