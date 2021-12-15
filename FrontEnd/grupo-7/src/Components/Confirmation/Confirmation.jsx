import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons';


import './Confirmation.scss';
    
const Confirmation = ({icon, text}) => {

    const { t } = useTranslation();

    return (
        <>
        <main>
            <div className="confirmationContainer">
                <div>
                    <FontAwesomeIcon icon={icon}/>
                    <h2>{t('booking_success_thanks')}</h2>
                    <h3>{text}</h3>
                        <Link to='/' className="okButton">
                            {t('booking_go_to_home')}
                        </Link>
                </div>
            </div>
        </main>
        </>
    );
}

export default Confirmation;
