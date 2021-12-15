import React from 'react';
import GoogleMapReact from 'google-map-react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import './Map.scss'

const Map = () => {

    const location = {
    address: '1600 Amphitheatre Parkway, Mountain View, california.',
    lat: 37.42216,
    lng: 122.08427,
}
    return (
        <div className="map">

            <div className="google-map">
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyA0CZtN6hLknkLTrHcutbfd7uio3yPDXjo' }} defaultCenter={location}
                defaultZoom = '5'
            >
            <div className="pin">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="pin-icon" />
                <p className="pin-text">hola</p>
            </div>
        </GoogleMapReact>
    </div>
  </div>
    );
}

export default Map;