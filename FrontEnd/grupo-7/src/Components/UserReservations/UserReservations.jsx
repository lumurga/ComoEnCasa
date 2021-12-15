import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import MyReservations from '../MyReservations/MyReservations';

import "./UserReservations.scss"

const Userreservations = ({id}) => {

    const [reservations, setReservations] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [activeBookings, setActiveBookings] = useState([]);

    const { t } = useTranslation();

    const compareDates = (date) => {

        let aux = new Date() - new Date(date);

        return Math.floor(aux / (1000*60*60*24));
    }

    const fetchReservations = async () => {
        const response = await fetch("http://52.67.178.177:8080/reservations/user/" + id);
        const responseJSON = await response.json()
        console.log(responseJSON);

        const res1 = responseJSON.filter(r => 
            compareDates(r.departureDate) < 0
        )

        const res2 = responseJSON.filter(r => 
            compareDates(r.departureDate) >= 0
        )
        
        setActiveBookings(res1);
        setBookingHistory(res2);
      
        setReservations(responseJSON);
    }

    useEffect(() => {
        fetchReservations()
    }, [])


return (
        <div className="userReservationMain">
            <div className="userReservationContainer">
                <section className="reservationsContainer">
                    <h2> {t('my_reservations_active_title')} </h2>
                    <div className="reservationCards">
                        {(activeBookings.length == 0 ) ? <p> Aún no tienes reservas </p> :
                        activeBookings.map(reservation => {
                        return(
                            <MyReservations past={false} img={reservation.product.images[0].urlImage} /*category={reservation.product.category.title.toUpperCase()}*/ title={reservation.product.name} location={reservation.product.city.name} description={reservation.product.description} id={reservation.id} features={reservation.product.features} startDate={reservation.arrivalDate} endDate={reservation.departureDate} />);
                        })
                        }
                    </div>
                </section>
                {(bookingHistory.length == 0 ) ? <p></p> :
                <section className="reservationsContainer">
                    <h2>{t('my_reservations_finished_title')}</h2>
                        {bookingHistory.map(reservation => {
                        return(
                            <MyReservations past={true} img={reservation.product.images[0].urlImage} /*category={reservation.product.category.title.toUpperCase()}*/ title={reservation.product.name} location={reservation.product.city.name} description={reservation.product.description} id={reservation.id} features={reservation.product.features} startDate={reservation.arrivalDate} endDate={reservation.departureDate} />);
                        })
                        }
                </section>
                }
            </div>
        </div>
    );
}

export default Userreservations;
