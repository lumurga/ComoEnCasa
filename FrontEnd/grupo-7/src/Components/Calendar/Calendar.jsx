import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useFetch from '../useFetch.js';

/* Calendario */
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';
import pt from 'date-fns/locale/pt';
import de from 'date-fns/locale/de';
import it from 'date-fns/locale/it';
registerLocale("es", es);
registerLocale("fr", fr);
registerLocale("pt", pt);
registerLocale("de", de);
registerLocale("it", it);


const Calendar = ({startDate, setStartDate, endDate, setEndDate, id}) => {

    const [isOpen, setIsOpen] = useState(true);
    const [monthCalendar, setMonthCalendar] = useState(null);

    const { t } = useTranslation();

    let excludeDates = [];

    const handleDate = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        if (end) {setIsOpen(!isOpen)};
    }

    const handleMonth = () => {
        if(window.innerWidth <= 428)
            setMonthCalendar(1)
        else 
            setMonthCalendar(2)
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
      
    useEffect(() => {
        handleMonth();
    },[window.innerWidth]);

    const {data, loading, error} = useFetch("http://52.67.178.177:8080/reservations/product/" + id);

    if(loading) return <h1>Loading...</h1>

    else if(data !== null){

        data.map(reservation => {       
            let arrivalDate = new Date(reservation.arrivalDate);
            arrivalDate = addDays(arrivalDate, 1);
            let departureDate = new Date(reservation.departureDate);
            departureDate = addDays(departureDate, 1);
            
            do {
                excludeDates.push(arrivalDate);
                arrivalDate = addDays(arrivalDate, 1);
            } while(arrivalDate <= departureDate);
        });

        return (
            <DatePicker
                selected = {startDate} 
                onChange = {handleDate}
                locale ={t('language')} 
                startDate = {startDate}
                endDate = {endDate} 
                selectsRange 
                inline
                monthsShown={monthCalendar}
                minDate={new Date()}
                formatWeekDay={nameOfDay => nameOfDay.substr(0,1).toUpperCase()}
                excludeDates={excludeDates}
            /> 
        );
    }
    else return <h1>Cargando..</h1>

}

export default Calendar;