import React from 'react';
import logo from "../../Assets/Images/logoFull-1.png";
import { useTranslation } from 'react-i18next';

import "./Loading.scss"

const Loading = () => {

    const { t } = useTranslation();

    return (
        <div className='loadingContainer'>
            <div className='imagenContainer'>
                <img src={logo} alt="Loading Logo" />
            </div>
            <h1>{t('loading')}</h1>
        </div>
    );
}

export default Loading;
