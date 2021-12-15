import React, { useState, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage, FieldArray} from 'formik';
import {useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

//import './Porduc.scss';

const ProductRegistrationFormik = () => {

    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [features, setFeatures] = useState([]);
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);


    const fetchCategories = async () => {
        const response = await fetch("http://52.67.178.177:8080/categories");
        const responseJSON = await response.json()
        setCategories(responseJSON);
    }

    const fetchCities = async () => {
        const response = await fetch("http://52.67.178.177:8080/cities");
        const responseJSON = await response.json()
        setCities(responseJSON);
    }

    const fetchFeatures = async () => {
        const response = await fetch("http://52.67.178.177:8080/features");
        const responseJSON = await response.json()
        setFeatures(responseJSON);
    }


    useEffect(() => {
        fetchCategories();
        fetchCities();
        fetchFeatures();

    }, []);

    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
    }, [])

    const history = useHistory();
    const { t } = useTranslation();

    return (
        <>
        <Formik
            initialValues={{
                name: "",
                address: "",
                category: "",
                city: "",
                latitude: "",
                longitude: "",
                description: "",
                legals: "",
                features: [],
                images: [],
                cancellationPolicies: "",
                safetyAndHygiene: "",
                nightPrice: "" ,
                score: ""
            }}

            validate={(values) => {
                let errors = {};

                //Validación nombre del alojamiento
                if(!values.name){
                    errors.name = t('insert_required_info')
                } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                    errors.name = t('error_register_name.2')
                }

                //Validación dirección
                if(!values.address){
                    errors.address = t('insert_required_info')
                } 

                //Validación  de la categoria
                if(!values.category){
                    errors.category = t('insert_required_info')
                }

                // //Validación de la ciudad
                if(!values.city){
                    errors.city = t('insert_required_info')
                }

                //Validación latitud
                if(!values.latitude){
                    errors.latitude = t('insert_required_info')
                } else if (/[a-zA-ZÀ-ÿ\s]/.test(values.latitude)){
                    errors.latitude = t('insert_no_letters')
                }

                //Validación longitud
                if(!values.longitude){
                    errors.longitude = t('insert_required_info')
                } else if (/[a-zA-ZÀ-ÿ\s]/.test(values.longitude)){
                    errors.longitude = t('insert_no_letters')
                }

                //Validación descripcion
                if(!values.description){
                    errors.description = t('insert_required_info')
                }

                //Validación normas
                if(!values.legals){
                    errors.legals = t('insert_required_info')
                } 
                
                //Validación seguridad e higiene
                if(!values.safetyAndHygiene){
                    errors.safetyAndHygiene = t('insert_required_info')
                }

                //Validación politicas de cancelacion
                if(!values.cancellationPolicies){
                    errors.cancellationPolicies = t('insert_required_info')
                }

                if(values.images.length < 5){
                    errors.images = t('insert_five_images')
                }

                //Validación score
                if(!values.score){
                    errors.score = t('insert_required_info')
                } else if (/[a-zA-ZÀ-ÿ\s]/.test(values.score)){
                    errors.score = t('insert_no_letters')
                } else if (values.score > 5 || values.score < 1){
                    errors.score = "Ingrese un numero entre 1 y 5"
                }

                //Validación night price
                if(!values.nightPrice){
                    errors.nightPrice = t('insert_required_info')
                } else if (/[a-zA-ZÀ-ÿ\s]/.test(values.nightPrice)){
                    errors.nightPrice = t('insert_no_letters')
                }


                return errors;
            }}

            onSubmit={(values) => {

                console.log(values.images);

                let features1 = document.querySelectorAll('.checkbox');
                let features2 = [];

                for(let i = 0; i < features1.length; i++){
                    if(features1[i].checked){
                        let f_aux = {id: features1[i].value}
                        features2.push(f_aux)
                    }
                }

                console.log(features2)

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + token);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "name": values.name.trim(),
                    "address": values.address,
                    "description": values.description,
                    "category":{
                        "id": values.category
                    },
                    "city": {
                        "id": values.city
                    },
                    "features" : features2,
                    "latitude": values.latitude,
                    "longitude": values.longitude,
                    "cancellationPolicies" : values.cancellationPolicies,
                    "legals": values.legals,
                    "safetyAndHygiene":  values.safetyAndHygiene,
                    "images" : values.images,
                    "nightPrice" : values.nightPrice,
                    "score": values.score
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };


                fetch(`http://52.67.178.177:8080/products/register`, requestOptions)
                    .then(response => {
                        if(response.ok){
                            console.log('Registro de producto exitoso')
                            history.push("/success");
                        }
                        else {
                            console.log('Respuesta de red OK pero respuesta HTTP no OK');
                            Swal.fire({
                                icon: 'error',
                                title: t('alert_product_title'),
                                text: t('alert_product_text')
                            })
                        }
                        
                    })
                    .catch(error => {
                        console.log('Hubo un problema con la petición Fetch:' + error.message);
                        setError(true);
                });

            }}
        >
            {({values, errors}) => (
                <>
                <h2 id="regist">{t('admin_register_product_button')}</h2>
                <Form id="formRegisterProduct">
                    <section className="detailContainer">

                        <div className="registProductGroup" id="nameContainer">
                            <label>{t('name')}</label>
                            <Field type="text" id="name" name="name" placeholder="Cabañas Peuma"/>
                            <ErrorMessage name="name" component={() => (<h5 className="errorRegister1"> {errors.name} </h5>)} />
                        </div>
                        <div className="registProductGroup" id="cityContainer">
                            <label>{t('city')}</label>
                            <Field as="select" id="city" name="city" /*required*/>
                                <option id = "placeholder" value="" disabled selected hidden invalid>{t('select_city')}</option> 
                                {cities.map(city => {
                                    return <option value={city.id}>{city.name}, {city.country}</option>
                                })}
                            </Field>
                           <ErrorMessage name="city" component={() => (<h5 className="errorRegister2"> {errors.city} </h5>)} />
                        </div>
                        <div className="registProductGroup" id="addressContainer">
                            <label>{t('address')}</label>
                            <Field type="text" id="address" name="address" placeholder="Av Colón 1728"/>
                            <ErrorMessage name="address" component={() => (<h5 className="errorRegister3"> {errors.address} </h5>)} />
                        </div>
                        <div className="registProductGroup" id="categoryContainer">
                            <label>{t('category')}</label>
                            <Field as="select" id="category" name="category" /*required*/>
                                <option id = "placeholder" value="" disabled selected hidden invalid>{t('select_category')}</option> 
                                {categories.map(category => {
                                    return <option value={category.id}>{t(category.title)}</option>
                                })}
                            </Field>
                            <ErrorMessage name="category" component={() => (<h5 className="errorRegister4"> {errors.category} </h5>)} />
                        </div>
                        <div className="registProductGroup" id="latitudeContainer">
                            <label>{t('latitude')}</label>
                            <Field type="text" id="latitude" name="latitude" placeholder="-50.452"/>
                            <ErrorMessage name="latitude" component={() => (<h5 className="errorRegister5"> {errors.latitude} </h5>)} />
                        </div>
                        <div className="registProductGroup" id="longitudeContainer">
                            <label>{t('longitude')}</label>
                            <Field type="text" id="longitude" name="longitude" placeholder="-9.03"/>
                            <ErrorMessage name="longitude" component={() => (<h5 className="errorRegister6"> {errors.longitude} </h5>)} />
                        </div>                        
                        <div className="registProductGroup" id="descriptionContainer">
                            <label>{t('description_title_product')}</label>
                            <Field as="textArea"rows="6" id="description" name="description" placeholder={t('write_here')}/>
                            <ErrorMessage name="description" component={() => (<h5 className="errorRegister7"> {errors.description} </h5>)} />
                        </div>

                        <div className="registProductGroup" id="nightPriceContainer">
                            <label>{t('night_price')}</label>
                            <Field type="number" id="nightPrice" name="nightPrice" placeholder={t('write_here')}/>
                            <ErrorMessage name="nightPrice" component={() => (<h5 className="errorRegister7"> {errors.nightPrice} </h5>)} />
                        </div>

                        <div className="registProductGroup" id="scoreContainer">
                            <label>{t('score')}</label>
                            <Field type="number" id="score" name="score" placeholder="Inserte un puntaje entre 1 y 5"/>
                            <ErrorMessage name="score" component={() => (<h5 className="errorRegister7"> {errors.score} </h5>)} />
                        </div>

                    </section>

                    <section className="featuresContainer">
                        <h3>{t('accommodation_char')}</h3>
                        {features.map(feature => {
                                return (
                                    <label>
                                        <Field type="checkbox" name="features" className="checkbox" value={feature.id.toString()} />
                                        {feature.name}
                                    </label>
                                );
                        })}
                    </section>

                    <section className="policiesContainer">
                        <h3>{t('policies')}</h3>
                        <div>
                            <div className="registProductGroup" id="legalsContainer">
                                <h4>{t('policies_norms_product')}</h4>
                                {/* <label>Descripción</label> */}
                                <Field as="textarea" rows="6" id="legals" name="legals" placeholder={t('write_here')}/>
                                <ErrorMessage name="legals" component={() => (<h5 className="errorRegister8"> {errors.legals} </h5>)} />
                            </div>
                            <div className="registProductGroup" id="safetyContainer">
                                <h4>{t('policies_norms_health_and_safety')}</h4>
                                {/* <label>Descripción</label> */}
                                <Field as="textarea" rows="6" id="safetyAndHygiene" name="safetyAndHygiene" placeholder={t('write_here')}/>
                                <ErrorMessage name="safetyAndHygiene" component={() => (<h5 className="errorRegister9"> {errors.safetyAndHygiene} </h5>)} />
                            </div>
                            <div className="registProductGroup" id="cancellationContainer">
                                <h4>{t('policies_norms_cancelation')}</h4>
                                {/* <label>Descripción</label> */}
                                <Field as="textarea" rows="6" id="cancellationPolicies" name="cancellationPolicies" placeholder={t('write_here')} />
                                <ErrorMessage name="cancellationPolicies" component={() => (<h5 className="errorRegister10"> {errors.cancellationPolicies} </h5>)} />
                            </div>
                        </div>
                    </section> 

                    <section className="addImagesContainer">
                        <h3>{t('load_images')}</h3>

                        <FieldArray name="images" render=
                        {
                            arrayHelpers => (
                            <div className = "img">
                            {
                                (values.images && values.images.length > 0) ? 
                                values.images.map((image, index) => {
                                    return(
                                        <div key={index}>
                                            <Field className="imgTitle" name={`images.${index}.title`} placeholder={t('insert_title')} />
                                            <Field name={`images.${index}.urlImage`} placeholder={t('insert_url')} />
                                            <FontAwesomeIcon icon={faTimes} className="remove" onClick={() => arrayHelpers.remove(index)}/>
                                            <FontAwesomeIcon icon={faPlus} className="add" onClick={() => arrayHelpers.insert(index, '')}/> 
                                        </div>
                                    )
                                }) : 
                                (<button type="button" className="addButton" onClick={() => arrayHelpers.push('')}>{t('add_button')}</button>)
                            }
                            </div>)
                            
                        }
                        />
                        <ErrorMessage name="images" component={() => (<h5 className="errorRegister11"> {errors.images} </h5>)} />
                    </section>

                        {/* {formularioEnviado && <p className="formExito"> Formulario enviado con exito! </p>} */}
                    <div className = "buttonGroup">
                        <button className = "productSubmit" type = "submit">
                            {t('confirm_button')}
                        </button>
                    </div>
                </Form>
                </>
            )}
        </Formik>
        </>
    );
}

export default ProductRegistrationFormik;
