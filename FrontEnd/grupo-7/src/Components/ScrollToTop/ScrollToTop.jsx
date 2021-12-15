import React, { useEffect, useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';

import './ScrollToTop.scss';

const ScrollToTop = () => {

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => { 
        if(window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)        
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
        window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const ButtonToTop = () => {
        return (
        <div className="scrollButton" onClick={scrollToTop}>
            <button type='button' onClick={scrollToTop} >
                <FontAwesomeIcon icon={faChevronUp} aria-hidden='true'/>
            </button>
        </div>
        )
    }
    

    return (
        <>
            {!isVisible ? null : <ButtonToTop />}
        </>
        );
}



export default ScrollToTop;