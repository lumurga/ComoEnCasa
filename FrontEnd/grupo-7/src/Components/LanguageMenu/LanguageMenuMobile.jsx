import React from 'react';
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next';

import "./LanguageMenu.scss"

const Languagemenumobile = ({restLanguages, currentLanguage}) => {
    return (
        <div className="dropdown">
        <button className="dropbtn">
            <ReactCountryFlag countryCode={currentLanguage.country_code} svg />
            {currentLanguage.name}
        </button>
        <div className="dropdown-content">
        {restLanguages.map(lan => 
           <button onClick={() => i18next.changeLanguage(lan.code)} className="countryFlagsContainer" key={lan.code}>
              <ReactCountryFlag countryCode={lan.country_code} svg />
              {lan.name}
            </button>
          )}
        </div>
    </div>
    );
}

export default Languagemenumobile;
