import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Heading.scss';

const Heading = ({category, title}) => {

    const history = useHistory()
    const { t } = useTranslation()
    
    return (
        <div className="headingContainer">
            <div>
                <h5>{t(category).toUpperCase()}</h5>
                <h2>{title}</h2>
            </div>
            <button onClick={() => history.goBack()} className="backButtonHeading"><FontAwesomeIcon icon={faChevronLeft} id="iconBack"/></button> 
        </div>
    );
}

export default Heading;