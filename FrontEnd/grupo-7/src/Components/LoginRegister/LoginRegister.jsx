import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from "../Button/Button"

const Loginregister = ({classes}) => {

    let location = useLocation();
    const { t, i18n } = useTranslation()
    
    if (location.pathname === "/register") {
        return (
        <div className = {classes}>
        <Button text = {t("login_button_header")} route = "/login"/>
        </div>
    )} else if (location.pathname === "/login") {
            return(
                <div className = {classes}>
                    <Button text = {t('create_account_button')} route = "/register"/>
                </div>)
    } else {
        return (
                <div className = {classes}>
                    <Button text = {t('login_button_header')} route = "/login"/>
                    <hr/>
                    <Button text = {t('create_account_button')} route="/register"/>
                </div>
            )
        }
}

export default Loginregister;
