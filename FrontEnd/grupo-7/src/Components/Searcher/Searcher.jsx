import React, { useState, useEffect } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import LocationSearch from '../LocationSearch/LocationSearch';
import { useTranslation } from 'react-i18next';

import "react-datepicker/dist/react-datepicker.css";
import "./Searcher.scss";

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

const Searcher = ({setProducts, setNumberProducts, titleCate}) => {

  const { t } = useTranslation()

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [monthCalendar, setMonthCalendar] = useState(null);
  const [displayList, setDisplayList] = useState("none");
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [searchedCity, setSearchedCity] = useState([])

  const convertDate = (date) => {

    if(date < 10) 
      return '0' + date.toString()
    
    else return date.toString();
  }

  const handleDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end) {setIsOpen(!isOpen)};
  }
  
  const handleList = () => {
    if (displayList === "none")
      setDisplayList("flex")
    else
      setDisplayList("none")
  };

  const handleMonth = () => {
    if(window.innerWidth <= 428)
        setMonthCalendar(1)
    else 
        setMonthCalendar(2)
  }

  const handleCity = (e) => {
    setCity(e.target.id)
    setDisplayList("none")
  }

  /* FUNCION GENERAL PARA HACER FETCH DE PRODUCTOS */
  const fetchProducts = async (url) => {
    const response = await fetch(url);
    const responseJSON = await response.json()
    setProducts(responseJSON);
    setNumberProducts(8)
  }

 
  const fetchApiCities = async () => {
    const response = await fetch("http://52.67.178.177:8080/cities");
    const responseJSON = await response.json()
    setCities(responseJSON);
    setSearchedCity(responseJSON);
  }

  const searchedCities = () => {
    if (city) {
      const cityFounded = cities.filter(citi => citi.name.toLowerCase().trim().includes(city.toLowerCase().trim()));
      setSearchedCity(cityFounded)
    } else {
      setSearchedCity(cities)
    }
  }

  const fetchProductsDate = async () => {

    const aMonth = convertDate(startDate.getMonth() + 1)
    const dMonth = convertDate(endDate.getMonth() + 1)

    const aDate = convertDate(startDate.getDate())
    const dDate = convertDate(endDate.getDate())

    const arrival =  startDate.getFullYear() + '-' + aMonth + '-' + aDate;
    const departure = endDate.getFullYear()+ '-' + dMonth + '-' + dDate;

    sessionStorage.setItem("startDate", arrival);
    sessionStorage.setItem("endDate", departure);

    fetchProducts("http://52.67.178.177:8080/products/available/dates?arrival=" + arrival + "&departure=" + departure)
  }

  const fetchProductsDateAndCity = async () => {

    const aMonth = convertDate(startDate.getMonth() + 1)
    const dMonth = convertDate(endDate.getMonth() + 1)

    const aDate = convertDate(startDate.getDate())
    const dDate = convertDate(endDate.getDate())

    const arrival =  startDate.getFullYear() + '-' + aMonth + '-' + aDate;
    const departure = endDate.getFullYear()+ '-' + dMonth + '-' + dDate;

    sessionStorage.setItem("startDate", arrival);
    sessionStorage.setItem("endDate", departure);

    fetchProducts("http://52.67.178.177:8080/products/available?arrival=" + arrival + "&city=" + city + "&departure=" + departure)
  }


  const chooseFetch = () => { 

    if(city != null && startDate == null && endDate == null){
      fetchProducts("http://52.67.178.177:8080/products/city/" + city)
    }else if((city == null || city === "") && startDate != null && endDate != null)
      fetchProductsDate()
    else if(city != null && startDate != null && endDate != null)
      fetchProductsDateAndCity()
  }

  useEffect (() => {
    searchedCities()
  }, [city])

  useEffect(() => {
      fetchApiCities();
  }, []);

  

    return (
        <section className="searcherContainer">
          <h1>{t("title_searchbar")}</h1>
          <div className="inputsContainer">
            <LocationSearch setDisplayList={setDisplayList} city={city} handleList={handleList} displayList={displayList} cities={searchedCity} handleCity={handleCity} setCity={setCity} />
            <DatePicker 
              selected = {startDate} 
              onChange = {handleDate}
              locale ={t('language')} 
              startDate = {startDate}
              endDate = {endDate} 
              selectsRange
              placeholderText = {t('input_calendar')}
              monthsShown = {monthCalendar}
              className = "datepicker"
              onInputClick={handleMonth} 
              minDate={new Date()}
              formatWeekDay={nameOfDay => nameOfDay.substr(0,1).toUpperCase()}
            />
            <button className = "search" onClick={chooseFetch}>
            {t('search_button')}
            </button>
          </div>
        </section>
    );
}

export default Searcher;