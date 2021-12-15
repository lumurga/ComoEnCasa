import React from 'react';
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next';

import "./LanguageMenu.scss"

const Languagemenudesktop = ({languages}) => {
    return (
            <div className="languagesMenuDesktop">
            {languages.map(lan => 
               <button onClick={() => i18next.changeLanguage(lan.code)} className="countryFlagsContainerDesktop" key={lan.code}>
                  <ReactCountryFlag countryCode={lan.country_code} svg />
                  {lan.name}
                </button>
              )}
            </div>
    );
}

export default Languagemenudesktop;
