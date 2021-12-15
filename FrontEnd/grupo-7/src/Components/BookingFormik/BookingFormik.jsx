import React, { useState, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

import './BookingFormik.scss'


const BookingFormik = ({product, start, end,token, setError}) => {

    const history = useHistory();
    const { t } = useTranslation();


    return (
            <Formik     
                initialValues={{
                    start: start,
                    end: end
                }}
       
                onSubmit={() => {

                    let time = document.getElementById("time").value;
                    let data = document.getElementById("extraData").value;
                    let vaccinated = (document.getElementById("vaccinated").checked) ? true : false;

                    console.log(time);
                    console.log(data);
                    console.log(vaccinated);
                 
                    if(!start || !end || !time){

                        if(!start || !end)
                            document.querySelector(".emptyDates").style.display = "block";

                        if(!time)
                            document.querySelector(".emptyTime").style.display = "block";

                        if(start && end)
                            document.querySelector(".emptyDates").style.display = "none";

                        if(time)
                            document.querySelector(".emptyTime").style.display = "none";
                    }

                    else {
                        document.querySelector(".emptyTime").style.display = "none";
                        document.querySelector(".emptyDates").style.display = "none";

                        let startMonth =  (start.getMonth()+1) < 10 ? ("0" + (start.getMonth()+1)) : (start.getMonth()+1);
                        let startDate =  (start.getDate() < 10) ? ("0" + start.getDate()) : start.getDate();

                        let endMonth =  (end.getMonth()+1) < 10 ? ("0" + (end.getMonth()+1)) : (end.getMonth()+1);
                        let endDate =  (end.getDate() < 10) ? ("0" + end.getDate()) : end.getDate();

                        var myHeaders = new Headers();
                        myHeaders.append("Authorization", "Bearer " + token);
                        myHeaders.append("Content-Type", "application/json");

                       var raw = JSON.stringify({
                            "vaccinated": vaccinated,
                            "startTime": time,
                            "extraData" : data,
                            "arrivalDate": start.getFullYear() + '-' + startMonth + '-' + startDate,
                            "departureDate": end.getFullYear() + '-' + endMonth + '-' +endDate,
                            "product": {
                                "id": product.id
                            },
                            "user": {
                                "id": sessionStorage.getItem("id")
                            }
                        });

                        var requestOptions = {
                            method: 'POST',
                            headers: myHeaders,
                            body: raw,
                            redirect: 'follow'
                        };


                        fetch(`http://52.67.178.177:8080/reservations/register`, requestOptions)
                            .then(response => {
                                if(response.ok) 
                                    history.push("/booking")
                                else console.log('Respuesta de red OK pero respuesta HTTP no OK');
                            })
                            .catch(error => {
                                console.log('Hubo un problema con la petición Fetch:' + error.message);
                                setError(true);
                            });
                    }
                }}
            >
                {({values}) => (
                    <Form className="detail">
                        <div>
                            <h2>{t('booking_form_title')}</h2>
                            <img src={product.images[0].urlImage} alt="imagen del producto"/>
                        </div>
                        <div className="productTxt" >
                            <h5 className="productCategory" >{t(product.category.title).toUpperCase()}</h5>
                            <h3 className="productTitle" >{product.name}</h3>
                            <div className="productLocation" >
                                <FontAwesomeIcon icon={faMapMarkerAlt}/>
                                <p>{product.city.name}</p>
                            </div>
                            <hr/>
                            <div className="check">
                                <p>{t('booking_form_checkin')}</p>
                                {start && <p>{start.getDate()}/{start.getMonth()+1}/{start.getFullYear()}</p>}                                
                            </div>
                            <hr/>
                            <div className="check">
                                <p>{t('booking_form_checkout')}</p>
                                {end && <p>{end.getDate()}/{end.getMonth()+1}/{end.getFullYear()}</p>} 
                            </div>
                            <hr/>
                            <div className="check">
                                <p>Precio por noche</p>
                                <p>USD ${product.nightPrice}</p>
                            </div>
                            <hr/>
                            <h5 className = "emptyDates">{t('booking_form_error_msg')}</h5>
                            <button type = "submit" className="bookingButton">
                                {t('booking_form_button')}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
    );
}

export default BookingFormik;
