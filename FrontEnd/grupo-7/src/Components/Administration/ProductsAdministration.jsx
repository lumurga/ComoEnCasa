import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '../Card/Card';

import Heading from '../Heading/Heading';

import './ProductsAdministration.scss';


const ProductsAdministration = () => {

  const [products, setProducts] = useState([])

  const history = useHistory();
  const { t } = useTranslation();

  const goProductRegistration = () => {
    history.push("/administration/products/register")
  }

   /* FUNCION GENERAL PARA HACER FETCH DE PRODUCTOS */
   const fetchProducts = async () => {
    const response = await fetch("http://52.67.178.177:8080/products");
    const responseJSON = await response.json()
    setProducts(responseJSON);
  }

  useEffect(() => {
    fetchProducts();
    console.log("Busqueda general");
  }, [])


  useEffect(() => {
    if(window.innerWidth <= 428)
      document.querySelector(".menuContainer").style.width = "0";
  }, [])


  return (
    <>
    <main style={{backgroundColor: "rgba(236, 238, 250, 0.425)", display:"flex", flexWrap:"wrap", width:"100%", justifyContent:"center" }}>
      <Heading title={t('admin_title_heading')} category=""/>
      <section className="productsList">
        <h2>{t('admin_title_list')}</h2>
        <div className = "button">
          <button className = "registerButton" onClick={goProductRegistration}>
            {t('admin_register_product_button')}
          </button>
        </div>

        <div className="cartas">
          {products.map(product => {
            return(
              <Card img={product.images[0].urlImage} category={product.category.title} title={product.name} location={product.city.name} description={product.description} id={product.id} features={product.features} admin={true}/>);
            })
          }
        </div>
      </section>

      
    </main>
    </>
  );
}

export default ProductsAdministration;
