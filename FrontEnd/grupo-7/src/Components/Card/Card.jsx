import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";


/* Iconos */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWifi as wifi, faBlender, faPaw, faCar, faSnowflake, faTv, faSwimmer} from '@fortawesome/free-solid-svg-icons';
import {faHeart as heartSolido} from '@fortawesome/free-solid-svg-icons';
import {faHeart as heartRegular} from '@fortawesome/free-regular-svg-icons';

import "./Card.scss"

const Card = (props) => {

    const { t } = useTranslation()

    const deleteProduct = () => {

        Swal.fire({

            title: '¿Estas seguro que deseas borrar este producto?',
            text: "No podras revertirlo",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',

        }).then((result) => {

            if (result.isConfirmed) {

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

                var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch("http://52.67.178.177:8080/products/delete/"+ props.id, requestOptions)
                .then(response => {
                    if(response.ok){

                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }

                    else console.log('Respuesta de red OK pero respuesta HTTP no OK');
                })
                .catch(error => {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                });
            }
              
        })
    }

    const icons = [
        {
            icon: faBlender,
            name: "Cocina"
        },
        {
            icon: faSnowflake,
            name: "Aire acondicionado"
        },
        {
            icon: faCar,
            name: "Estacionamiento gratuito"
        },
        {
            icon: wifi,
            name: "Wifi"
        },
        {
            icon: faTv,
            name: "Televisión"
        },
        {
            icon: faSwimmer,
            name: "Pileta"
        },
        {
            icon: faPaw,
            name: "Apto mascotas"
        }
    ];
    

    const arrayIcons = (features) => { 

        let icons_aux = [];

       features.map((f) => {

            let i = icons.find(element => element.name == f.name);
            if(i !== null)
                icons_aux.push(i);
        })
        
        return icons_aux;
    };

    const imgResize = (size) => {

        const array1 = document.querySelectorAll(".imgCard");
        const array2 = document.querySelectorAll(".alojamiento");
        const array3 = document.querySelectorAll(".txtCard");

        for(let i = 0; i < array1.length; i++){
            array1[i].style.height = size;
            array2[i].style.height = size;
            array3[i].style.height = size;
        }
    }

    const history = useHistory();

    const [icon, setIcon] = useState(heartRegular);

    const toggleIcon = () => {
        if(icon === heartRegular)
            setIcon(heartSolido);
        else
            setIcon(heartRegular);
    }

    const toggleId = (e) =>{

        const array4 = document.querySelectorAll(".cardDescription");

        if(e.target.id === "hidden"){
            e.target.id = "active";
            imgResize("217px");
        }
        else{
            for(let i = 0; i < array4.length; i++)
                array4[i].id = "hidden";
            imgResize("203px");
        } 
    }

    const goProductDetail = () => {
        history.push("/product/" + props.id)
    }

    const goProductEdition = () => {
        history.push("/administration/products/" + props.id + "/edit");
    }

    return (
        <article className="cardContainer" >
            <div className="imgCard" onClick={toggleIcon}>
                <FontAwesomeIcon icon={icon} className="favorito" />
                <img className="accommodation" src={props.img} alt="imagen del producto"/>
            </div>
            <div className="txtCard">
                <h5 className="cardCategory" >{t(props.category).toUpperCase()}</h5>
                <div className="cardCalification" >
                    <p id="p1">{props.score}</p>
                    { props.score == 1 ? <p  data-testid="card-1" id="p2">Muy malo</p>
                    : props.score == 2 ? <p  data-testid="card-1" id="p2">{t('bad')}</p>
                    : props.score == 3 ? <p  data-testid="card-1" id="p2">{t('regular')}</p>
                    : props.score == 4 ? <p  data-testid="card-1" id="p2">{t('very_good')}</p>
                    : props.score == 5 ? <p  data-testid="card-1" id="p2">{t('excellent')}</p>: null
                    }                    
                </div>
                <h3 className="cardTitle" >{props.title}</h3>
                <p className="cardLocation" >{props.location}</p>
                <div className="cardPerks" >
                    {
                        arrayIcons(props.features).map(icono => {
                            console.log(icono)
                            return <FontAwesomeIcon icon={icono.icon}/>
                        })
                    }
                </div>
                <p className="cardDescription" id="hidden" onClick={toggleId}> {props.description}</p>
                {props.admin == false ? 
                    <button className="cardButton" onClick={goProductDetail}>
                        {t('see_more_button')}
                    </button>
                :
                    <div className="adminButtons">
                    <button onClick={goProductEdition}>
                        {t('admin_edit_product_button')}
                    </button>
                    <button onClick={deleteProduct}>
                        {t('admin_delete_product_button')}
                    </button>
                    </div>
                }
            </div>
        </article>
    );
}

export default Card;