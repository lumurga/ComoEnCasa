import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import UserReservations from '../UserReservations/UserReservations.jsx';
import UserPreferences from '../UserPreferences/UserPreferences.jsx';
import UserFavorites from "../UserFavorites/UserFavorites"

import "./User.scss"

const User = () => {

    const [userComponentShown, setUserComponentShown] = useState("Preferences")
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState()

    const { t } = useTranslation();
    

    const fetchReservations = async () => {
        const response = await fetch("http://52.67.178.177:8080/reservations/user/" + id);
        const responseJSON = await response.json()
        console.log(responseJSON);
    }

    const fetch2 = () => {
        fetch('http://52.67.178.177:8080/reservations/user/' + id)
            .then(response => response.json())
            .then(responseJSON => {
                console.log(responseJSON);  
        })
    }

    useEffect(() => {
        setName(sessionStorage.getItem("name"));
        setLastName(sessionStorage.getItem("lastName"));
        setEmail(sessionStorage.getItem("email"));
        setId(sessionStorage.getItem("id"))
    }, [])

    return (
        <main>
            <nav className="userNavContainer">
                <div className="userNav" onClick={() => setUserComponentShown("Preferences")}>
                    {t('my_preferences')}
                </div>
                <div className="userNav" onClick={() => setUserComponentShown("Reservations")}>
                    {t('my_reservations')}
                </div>
                <div className="userNav" onClick={() => setUserComponentShown("Favorites")}>
                    {t('my_favorites')}
                </div>
            </nav>
            { (userComponentShown === "Reservations") ? <UserReservations id={id}/> 
            : (userComponentShown === "Favorites")    ? <UserFavorites /> : <UserPreferences name={name} lastName={lastName} email={email} />}
        </main>
    );
}

export default User;
