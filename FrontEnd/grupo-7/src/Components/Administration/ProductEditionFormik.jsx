import React, { useState, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage ,FieldArray} from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useFetch from '../useFetch.js';
import Loading from "../Loading/Loading"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

//import './Porduc.scss';

const ProductEditionFormik = () => {

    const {id} = useParams();
    const { t } = useTranslation();

    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [features, setFeatures] = useState([]);
    const [token, setToken] = useState(null);

    const toggleAttribute = (index) => {

        let id = "f" + index;

        let element = document.getElementById(id);

        if(element.getAttribute("checked")){
            console.log("chequeado")
            element.checked = false;
            element.removeAttribute("checked");
        }
        else{
            element.checked = true;
            element.setAttribute("checked", "true");
        }

    }
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
    // const [formularioEnviado, setFormularioEnviado] = useState(false)

    const {data, loading, error} = useFetch("http://52.67.178.177:8080/products/id/" + id);

    if(loading) 
        return <Loading />
    else if(data !== null){
    
        return (
            <>
            <Formik
                initialValues={{
                    name: data.name,
                    address: data.address,
                    category: data.category.id,
                    city: data.city.id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    description: data.description,
                    cancellationPolicies: data.cancellationPolicies,
                    safetyAndHygiene: data.safetyAndHygiene,
                    legals: data.legals,
                    features: data.features,
                    images: data.images,
                    nightPrice: data.nightPrice,
                    score: data.score
                }}

                validate={(values) => {
                    let errors = {};

                    //Validación nombre del alojamiento
                    if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
                        errors.name = t('insert_no_letters')
                    }

                    //Validación latitud
                    if (/[a-zA-ZÀ-ÿ\s]/.test(values.latitude)){
                        errors.latitude = t('insert_no_letters')
                    }

                    //Validación longitud
                    if (/[a-zA-ZÀ-ÿ\s]/.test(values.longitude)){
                        errors.longitude = t('insert_no_letters')
                    }

                    return errors;
                }}

                onSubmit={(values) => {

                    let features1 = document.querySelectorAll('.checkbox');
                    let features2 = [];

                    for(let i = 0; i < features1.length; i++){
                        if(features1[i].checked){
                            let f_aux = {id: features1[i].value}
                            features2.push(f_aux)
                        }
                    }
                        
                    console.log(sessionStorage.getItem("token"));

                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));
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
                        "nigthPrice" : values.nightPrice,
                        "score": values.score
                    });

                    var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };


                    fetch(`http://52.67.178.177:8080/products/update`, requestOptions)
                        .then(response => {
                            if(response.ok) 
                                history.push("/success")
                            else console.log('Respuesta de red OK pero respuesta HTTP no OK');
                        })
                        .catch(error => {
                            console.log('Hubo un problema con la petición Fetch:' + error.message);
                            // setError(true);
                    });
                }}
                >
                {({values, errors}) => (
                    <>
                    <h2 id="regist">{t('edit_accommodation')}</h2>
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
                                    <option key="0p" value="" disabled selected hidden >{t('select_city')}</option> 
                                    {cities.map((city, index) => {
                                        return <option key={index + "p"} value={city.id}>{city.name}, {city.country}</option>
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
                                    <option key="0p" value="" disabled selected hidden >{t('select_category')}</option> 
                                    {categories.map((category, index) => {
                                        return <option key={index + "p"} value={category.id}>{t(category.title)}</option>
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
                                <Field as="textarea"rows="6" id="description" name="description" placeholder={t('write_here')} value={values.description}/>
                                <ErrorMessage name="description" component={() => (<h5 className="errorRegister7"> {errors.description} </h5>)} />
                            </div>

                            <div className="registProductGroup" id="nightPriceContainer">
                                <label>{t('night_price')}</label>
                                <Field type="number" id="nightPrice" name="nightPrice" placeholder={t('write_here')} value={values.nightPrice} />
                                <ErrorMessage name="nightPrice" component={() => (<h5 className="errorRegister7"> {errors.nightPrice} </h5>)} />
                            </div>

                            <div className="registProductGroup" id="scoreContainer">
                                <label>{t('score')}</label>
                                <Field type="number" id="score" name="score" placeholder="Inserte un puntaje entre 1 y 5" value={values.score} />
                                <ErrorMessage name="score" component={() => (<h5 className="errorRegister7"> {errors.score} </h5>)} />
                            </div>
                        </section>

                        <section className="featuresContainer">
                            <h3>{t('accommodation_char')}</h3>
                            {features.map((f, index) => {
                                if(data.features.includes(f)) {
                                    return(
                                        <label>
                                            <Field type="checkbox" name="features" className="checkbox" id={"f" + index} checked={true} value={f.id.toString()} onClick={() => toggleAttribute(index)}/>
                                            {f.name}
                                        </label>
                                    )
                                }
                                else {
                                    
                                    return (
                                        <label>
                                            <Field type="checkbox" name="features" className="checkbox" id={"f" + index}  value={f.id.toString()} onClick={() => toggleAttribute(index)}/>
                                            {f.name}
                                        </label>
                                    )
                                }
                            })}
                        </section>

                        <section className="policiesContainer">
                            <h3>{t('policies')}</h3>
                            <div>
                                <div className="registProductGroup" id="legalsContainer">
                                    <h4>{t('policies_norms_product')}</h4>
                                    {/* <label>Descripción</label> */}
                                    <Field as="textarea" rows="6" id="legals" name="legals" placeholder={t('write_here')} value={values.legals}/>
                                    <ErrorMessage name="legals" component={() => (<h5 className="errorRegister8"> {errors.legals} </h5>)} />
                                </div>
                                <div className="registProductGroup" id="safetyContainer">
                                    <h4>{t('policies_norms_health_and_safety')}</h4>
                                    {/* <label>Descripción</label> */}
                                    <Field as="textarea" rows="6" id="safetyAndHygiene" name="safetyAndHygiene" placeholder={t('write_here')} value={values.safetyAndHygiene}/>
                                    <ErrorMessage name="safetyAndHygiene" component={() => (<h5 className="errorRegister9"> {errors.safetyAndHygiene} </h5>)} />
                                </div>
                                <div className="registProductGroup" id="cancellationContainer">
                                    <h4>{t('policies_norms_cancelation')}</h4>
                                    {/* <label>Descripción</label> */}
                                    <Field as="textarea" rows="6" id="cancellationPolicies" name="cancellationPolicies" placeholder={t('write_here')} value={values.cancellationPolicies}/>
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
                                {t('edit_accommodation')}
                            </button>
                        </div>
                    </Form>
                    </>
                )}
            </Formik>
            </>
        );
        
    }

    else return <h1>Cargando...</h1>;
}

export default ProductEditionFormik;
