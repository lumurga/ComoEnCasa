import React, { useState, useEffect} from 'react';
import { useParams} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import useFetch from '../useFetch.js';

import Heading from '../Heading/Heading';
import Policies from '../Policies/Policies';
import InputForm from '../InputForm/InputForm';
import BookingFormik from "../BookingFormik/BookingFormik";
import Calendar from '../Calendar/Calendar';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';

import './BookingPage.scss'

const BookingPage = () => {

    const { id } = useParams();
    const { t } = useTranslation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [userId, setUserId] = useState(null);
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    const [bookingError, setBookingError] = useState(false);

    useEffect(() => {
        setUserId(sessionStorage.getItem("id"));
        setName(sessionStorage.getItem("name"));
        setLastName(sessionStorage.getItem("lastName"));
        setEmail(sessionStorage.getItem("email"));
        setToken(sessionStorage.getItem("token"));
    }, [])

    const {data, loading, error} = useFetch("http://52.67.178.177:8080/products/id/" + id);

    if(loading) 
        return <h1>Loading...</h1>
    else if(data !== null){
    
        return (
            <>
            <main>
                <Heading category={data.category.title} title={data.name}/>
                <div className = "bookingContainer">
                    {error ? <p style={{color: "red"}}>{t('booking_error_msg')}</p>: <p></p>}
                    <h2> {t('title_form_booking')} </h2>
                    <div className = "containerOne">
                        <div className="form"> 
                            <form id='formBooking'>
                                <InputForm class = "bookingGroup" label = {t('name')} name = "nombre" type = "text" id = "nombre-input" disabled = {true} value={name}/>
                                <InputForm class = "bookingGroup" label = {t('lastname')} name = "apellido" type = "text" id = "apellido-input"disabled = {true} value={lastName}/>
                                <InputForm class="bookingGroup" label= {t('email')} name="mail" type="email" id="mail-input"disabled = {true} value={email}/>
                                <InputForm class = "bookingGroup" label = {t('city')} name = "ciudad" type = "text" id = "ciudad-input" required="true"/>
                                <div className= "textArea">
                                    <label>{t('booking_extra_info')}</label>
                                    <textarea id="extraData" name="" rows="2"></textarea>
                                </div>
                                <div className= "covidArea">
                                    <label>{t('booking_covid19')}</label>
                                    <input  name="covid" className = "vaccinatedOption" type = "checkbox" id = "vaccinated" /> <p>{t('booking_covid_vaccine')}</p>
                                </div>
                            </form>
                        </div>
                        <section className = "date">
                            <h2>{t('calendar_title_booking')}</h2>
                            <div className = "calendar">
                                <Calendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} id={id}/>
                            </div>
                        </section>
                        <section className = "time">
                            <h2>{t('arrival_time_booking')}</h2>
                            <div className = "timeContent">
                                <div className = "timeText">
                                    <FontAwesomeIcon icon={faCheckCircle} className="checkIcon" />
                                    <p >{t('arrival_time_title_booking')}</p>
                                </div>
                                <h5>{t('arrival_time_subtitle_booking')} </h5>
                                <select id="time" name="time" required >
                                    <option id = "placeholder" value="" disabled selected hidden invalid>{t('arrival_time_placeholder_booking')}</option>                                    
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 AM</option>
                                    <option value="13:00">01:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
                                    <option value="18:00">06:00 PM</option>
                                    <option value="19:00">07:00 PM</option>
                                    <option value="20:00">08:00 PM</option>
                                    <option value="21:00">09:00 PM</option>
                                    <option value="22:00">10:00 PM</option>
                                    <option value="23:00">11:00 PM</option>
                                </select>
                                <h5 className = "emptyTime"> {t('arrival_time_error_booking')} </h5>
                            </div>
                        </section>
                    </div>
                    <BookingFormik product={data} start={startDate} end={endDate} userId={userId} token={token} setError={setBookingError}/>
                </div>
                <Policies product={data}/>
            </main>
            </>
        );
    }

    else return <h1>Cargando...</h1>;
};

export default BookingPage;