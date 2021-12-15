import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useFetch from '../useFetch.js';

/* Componentes */
import Heading from '../Heading/Heading';
import Gallery from '../Gallery/Gallery';
import Policies from '../Policies/Policies';
import Calendar from '../Calendar/Calendar';

/* Iconos */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faWifi as wifi, faBlender, faPaw, faCar, faSnowflake, faTv, faShareAlt, faSwimmer, faIgloo} from '@fortawesome/free-solid-svg-icons';
import {faHeart as heartSolido, faCheck, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {faHeart as heartRegular} from '@fortawesome/free-regular-svg-icons';

import "leaflet/dist/leaflet.css";
import "./ReservationDetail.scss"

const Reservationdetail = () => {
    
    useEffect(() => {
        const L = require("leaflet");

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "",
            iconUrl: "https://toppng.com/uploads/preview/map-point-google-map-marker-gif-11562858751s4qufnxuml.png",
            shadowUrl: "",
            urlSize: [30,60]
        });
    });

    const { id } = useParams();

    const [icon, setIcon] = useState(heartRegular);

    const history = useHistory();
    const { t } = useTranslation(); 

    const icons = [{icon: faBlender, name: "Cocina"},{icon: faSnowflake, name: "Aire acondicionado"},{icon: faCar, name: "Estacionamiento gratuito"},{icon: wifi,name: "Wifi"},{icon: faTv,name: "Televisión"}, {icon: faSwimmer, name: "Pileta"},{icon: faPaw,name: "Apto mascotas"}];

    let icons_aux = [];
    
    const toggleIcon = () => {
        if(icon === heartRegular)
            setIcon(heartSolido);
        else
            setIcon(heartRegular);
    }

    const arrayIcons = (features, icons_aux) => { 

       features.map((f) => {

            let i = icons.find(element => element.name == f.name);
            if(i !== null)
                icons_aux.push(i);
        })
        
        return icons_aux;
    };

    

    const {data, loading, error} = useFetch("http://52.67.178.177:8080/reservations/id/" + id);

    if(loading) 
        return <h1>Loading...</h1>
    else if(data !== null){
        return (
            <>
            <main>
                <Heading category={data.product.category.title} title={data.product.name}/>
                <section className = "locationContainer">
                    <div className="location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} id="iconLocation"/>
                        <p>{data.product.city.name}, {data.product.city.country}</p>
                    </div> 
                    <div className="calification"> 
                        { data.product.score == 1 ? <p  id="opinion">Muy malo</p>
                        : data.product.score == 2 ? <p  id="opinion">Malo</p>
                        : data.product.score == 3 ? <p  id="opinion">Regular</p>
                        : data.product.score == 4 ? <p  id="opinion">Muy bueno</p>
                        : data.product.score == 5 ? <p  id="opinion">Excelente</p>: null
                        } 
                    <p id="points">{data.product.score}</p>
                    </div>
                </section>
                <section className="social">
                    <FontAwesomeIcon icon={faShareAlt} id="iconShare"/>
                    <FontAwesomeIcon icon={icon} id="iconHeart" onClick={toggleIcon}/>
                </section>
                <Gallery images = {data.product.images}/>
                <section className="description">
                    <h2>{t('description_title_product')}</h2>
                    <p>{data.product.description}</p> 
                </section>
                <section className="features">
                    <h2>{t('features_title_product')}</h2>
                    <hr/>
                    <div className = "icons">
                        {
                            arrayIcons(data.product.features, icons_aux).map((icono) => {
                                return (
                                    <div className = "iconProducto">
                                        <FontAwesomeIcon icon={icono.icon}/>
                                        <p>{icono.name}</p>
                                    </div>);
                                })
                        }
                    </div>
                </section>
                <section className = "datesReservation">
                    <h2>{t('booking_form_title')}</h2>
                    <div className='datailsReservationContainer'>
                        <div className='detailsReservation' id="one">
                            <h3>{t('reservations_start_date')}:</h3>
                            <p>{data.arrivalDate}</p>
                        </div>
                        <div className='detailsReservation' id="two" >
                            <h3>{t('reservations_end_date')}: </h3>
                            <p>{data.departureDate}</p>
                        </div>
                        <div className='detailsReservation' id="three">
                            <h3>{t('arrival_time_booking')}</h3>
                            <p>{data.startTime}</p>
                        </div>
                        <div className='detailsReservation' id="four" >
                            <h3>{t('booking_covid_vaccine')}</h3>
                            {data.vaccinated ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimesCircle} />}
                        </div>
                        <div className='detailsReservation2' id="five" >
                            <h3>{t('extra_info')}</h3>
                            <p>{data.extraData}</p>
                        </div>
                    </div>
                </section>
                <section className = "maps">
                    <h2>{t('title_map_product')}</h2>
                    <hr/>
                    <p>{data.product.city.name}, {data.product.city.country}</p>
                    <div className = "map">
                        <MapContainer center={[data.product.latitude, data.product.longitude]} zoom={11} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[data.product.latitude, data.product.longitude]}>
                                <Popup>
                                <span>{data.product.address}, {data.product.city.name}</span>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </section>
                <Policies product={data.product}/>
            </main> 
            </>
        );  
    }

    else return <h1>Cargando...</h1>;
}

export default Reservationdetail;
