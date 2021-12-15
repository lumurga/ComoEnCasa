import React from 'react';
import { useHistory } from 'react-router-dom';

import "./Footer.scss"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

    const history = useHistory()

    return (
        <footer className="footerContainer">
            <div className="copyright">©2021 Como en casa</div>
            <div className="socials">
                <FontAwesomeIcon icon={faFacebook}/>
                <FontAwesomeIcon icon={faTwitter}/>
                <FontAwesomeIcon icon={faLinkedinIn}/>
                <a href="https://www.instagram.com/comoencasadh/" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>  
            </div>
        </footer>
    );
}

export default Footer;
