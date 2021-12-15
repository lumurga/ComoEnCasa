import React from 'react';
import { useTranslation } from 'react-i18next';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const Locationsearch = ({setDisplayList, city, handleList, displayList, cities, handleCity, setCity}) => {
    
    const { t } = useTranslation()

    return (
        <div className="inputLocation" onBlur={() => {setTimeout(() => {setDisplayList("none")}, 100);}}> 
            <FontAwesomeIcon icon={faMapMarkerAlt} className="iconLocation" />
            <input type="text" placeholder={t('input_city_searchbar')} value={city} onFocus={handleList} onChange={(e) => setCity(e.target.value)} onClick={(e) => e.target.select()}/>
            <ul className="listLocation" style={{display: displayList}}> 
                {cities.slice(0,4).map(citi => {
                    return <li key={citi.name} onClick={handleCity} id={citi.name}><FontAwesomeIcon icon={faMapMarkerAlt} className="iconLocation" />{citi.name}, {citi.country}</li>
                })}
            </ul>
        </div>
    );
}

export default Locationsearch;
