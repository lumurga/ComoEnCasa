import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import './Gallery.scss';

const Gallery = ({images}) => {

    const { t } = useTranslation();

    const hideGallery = () => {
        document.querySelector(".galleryContainer").style.display = "none";
        document.querySelector("#cross").style.display = "none";
    }

    const showGallery = () => {
        document.querySelector(".galleryContainer").style.display = "flex";
        document.querySelector("#cross").style.display = "block";
    }

    return (
        <>
        <div className = "galleryDesktop">
            {images.slice(0,5).map((img,index) => {
                return (
                    <div className = "slide" id = {"img" + (index+1)}>
                        <img src = {img.urlImage} alt = "imagen"/>
                    </div>);
                })
            }
            <p className="openGallery" onClick={showGallery}>{t('see_more_button')}</p>
        </div>
        <div className = "galleryContainer">
            <Carousel infiniteLoop autoPlay autoFocus useKeyboardArrows interval={3000} statusFormatter={(currentItem,total) => `${currentItem}/${total}`} >
                {
                    images.map((img,index) => {
                        return (
                            <div className="slide" id={"img" + (index+1)}>
                                <img src={img.urlImage} alt="imagen"/>
                            </div>);
                        })
                }
            </Carousel>  
            <FontAwesomeIcon icon={faTimes} onClick={hideGallery} style={{cursor: 'pointer'}} id="cross"/>
        </div>
        </>
    );
}


export default Gallery;
