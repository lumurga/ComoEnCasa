
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
import {faHeart as heartSolido} from '@fortawesome/free-solid-svg-icons';
import {faHeart as heartRegular} from '@fortawesome/free-regular-svg-icons';

import './ProductPage.scss';
import "leaflet/dist/leaflet.css";

const ProductPage = ({setId}) => {
    
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
    setId(id)

    const [icon, setIcon] = useState(heartRegular);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);

    const history = useHistory();
    const { t } = useTranslation(); 

    const icons = [{icon: faBlender, name: "Cocina"},{icon: faSnowflake, name: "Aire acondicionado"},{icon: faCar, name: "Estacionamiento gratuito"},{icon: wifi,name: "Wifi"},{icon: faTv,name: "Televisión"}, {icon: faSwimmer, name: "Pileta"},{icon: faPaw,name: "Apto mascotas"}];

    let icons_aux = [];
    
    const goForm = () => {
        if(!sessionStorage.getItem("name")){
            Swal.fire({
                icon: 'error',
                title: t('alert_login_title'),
                text: t('alert_login_text')
            })
        }
        else if(sessionStorage.getItem("role") === "ROLE_ADMIN"){
            Swal.fire({
                icon: 'error',
                title: t('alert_admin_title'),
                text: t('alert_admin_text')
            })
        }
        history.push("/product/" + id + "/booking")
    }
    
    const toggleIcon = () => {
        if(icon === heartRegular)
            setIcon(heartSolido);
        else
            setIcon(heartRegular);
    }

    

    const arrayIcons = (features) => { 

        let icons_aux = [];

       features.map((f) => {

            let i = icons.find(element => element.name == f.name);
            if(i !== null)
                icons_aux.push(i);
        })
        
        return icons_aux;
    };

    

    const {data, loading, error} = useFetch("http://52.67.178.177:8080/products/id/" + id);

    if(loading) 
        return <h1>Loading...</h1>
    else if(data !== null){

        console.log("pag ed prodcuto")
        console.log(data.features)
        return (
            <>
            <main>
                <Heading category={data.category.title} title={data.name}/>
                <section className = "locationContainer">
                    <div className="location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} id="iconLocation"/>
                        <p>{data.city.name}, {data.city.country}</p>
                    </div> 
                    <div className="calification"> 
                        { data.score == 1 ? <p  id="opinion">Muy malo</p>
                        : data.score == 2 ? <p  id="opinion">{t('bad')}</p>
                        : data.score == 3 ? <p  id="opinion">{t('regular')}</p>
                        : data.score == 4 ? <p  id="opinion">{t('very_good')}</p>
                        : data.score == 5 ? <p  id="opinion">{t('excellent')}</p>: null
                        } 
                    <p id="points">{data.score}</p>
                    </div>
                </section>
                <section className="social">
                    <FontAwesomeIcon icon={faShareAlt} id="iconShare"/>
                    <FontAwesomeIcon icon={icon} id="iconHeart" onClick={toggleIcon}/>
                </section>
                <Gallery images = {data.images}/>
                <section className="description">
                    <h2>{t('description_title_product')}</h2>
                    <p>{data.description}</p> 
                </section>
                <section className="features">
                    <h2>{t('features_title_product')}</h2>
                    <hr/>
                    <div className = "icons">
                        {
                            arrayIcons(data.features).map((icono) => {
                                return (
                                    <div className = "iconProducto">
                                        <FontAwesomeIcon icon={icono.icon}/>
                                        <p>{icono.name}</p>
                                    </div>);
                                })
                        }
                    </div>
                </section>
                <section className = "dates">
                    <h2>{t('calendar_title_product')}</h2>
                    <div className = "otra">
                        <div className = "calendar">
                           <Calendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} id={id}/>
                        </div>
                        <div className = "booking" data-testid = "container">
                            <p>{t('title_go_to_booking')}</p>
                            <button className = "productButton" onClick={goForm}>{t('go_to_booking_button')}</button>
                        </div>
                    </div>
                </section>
                <section className = "maps">
                    <h2>{t('title_map_product')}</h2>
                    <hr/>
                    <p>{data.address}, {data.city.name}, {data.city.country}</p>
                    <div className = "map">
                        <MapContainer center={[data.latitude, data.longitude]} zoom={11} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[data.latitude, data.longitude]}>
                                <Popup>
                                <span>{data.address}, {data.city.name}</span>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </section>
                <Policies product={data}/>
            </main> 
            </>
        );  
    }

    else return <h1>Cargando...</h1>;
       
}

export default ProductPage;