import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* Iconos */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faWifi as wifi, faBlender, faPaw, faCar, faSnowflake, faTv, faShareAlt, faSwimmer, faIgloo} from '@fortawesome/free-solid-svg-icons';

import "./MyReservations.scss"

const Myreservations = ({past, id, img, title, location, category, features, startDate, endDate}) => {

    const history = useHistory();
    const { t } = useTranslation();

    const goBookingDetail = () => {
        history.push('reservation/' + id)
    }

    const punctuate = () => {
        alert("Aca puntuas :)")
    }

    const icons = [
        {
            icon: faBlender,
            name: "Cocina"
        },
        {
            icon: faSnowflake,
            name: "Aire acondicionado"
        },
        {
            icon: faCar,
            name: "Estacionamiento gratuito"
        },
        {
            icon: wifi,
            name: "Wifi"
        },
        {
            icon: faTv,
            name: "Televisión"
        },
        {
            icon: faSwimmer,
            name: "Pileta"
        },
        {
            icon: faPaw,
            name: "Apto mascotas"
        }
    ];
    
    let icons_aux = [];

    const arrayIcons = (features, icons_aux) => { 

       features.map((f) => {

            let i = icons.find(element => element.name == f.name);
            if(i !== null)
                icons_aux.push(i);
        })
        
        return icons_aux;
    };


    return (
        <article className="myReservationContainer" >
            <div className="imgMyReservation" >
                <img className="myReservationAccommodation" src={img} alt="imagen del producto"/>
            </div>
            <div className="txtMyReservation">
                <h5 className="myReservationCategory" >{category}</h5>
                {/* <div className="myReservationCalification" >
                    <p id="p1">8</p>
                    <p  data-testid="myReservation-1" id="p2">Muy bueno</p>
                </div> */}
                <h3 className="myReservationTitle" >{title}</h3>
                <p className="myReservationLocation" >{location}</p>
                <div className="myReservationPerks" >
                    {
                        arrayIcons(features, icons_aux).map((icono) => {
                            return <FontAwesomeIcon icon={icono.icon}/>
                        })
                    }
                </div>
                <div className="myReservationDate">
                    <div className="myReservationDateStart">
                        <p>{t('reservations_start_date')}</p>
                        <p>{startDate}</p>
                    </div>
                    <div className="myReservationDateEnd">
                        <p>{t('reservations_end_date')}</p>
                        <p>{endDate}</p>
                    </div>
                </div>
                {past ?
                    <div className="pastButtons">
                    <button className="myReservationButton" onClick={goBookingDetail}>
                        {t('see_detail_button')}
                    </button>
                    <button className="myReservationButton" onClick={punctuate}>
                       {t('set_score_button')}
                    </button> 
                    </div> :
                    <button className="myReservationButton" onClick={goBookingDetail}>
                        {t('see_detail_button')}
                    </button>
                }
            
            </div>
        </article>
    );
}

export default Myreservations;
