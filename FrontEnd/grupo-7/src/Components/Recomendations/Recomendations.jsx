import React, {useEffect} from 'react';
import Card from '../Card/Card';
import { useTranslation } from 'react-i18next';

import "./Recomendations.scss"

const Recomendations = ({products, setProducts, numberProducts, setNumberProducts}) => {

  const { t } = useTranslation()

  /* FUNCION GENERAL PARA HACER FETCH DE PRODUCTOS */
  const fetchProducts = async () => {
    const response = await fetch("http://52.67.178.177:8080/products");
    const responseJSON = await response.json()
    setProducts(responseJSON);
    setNumberProducts(8)
  }

  useEffect(() => {
    fetchProducts();
  }, [])
  
  return (
    <section className="productsContainer">
      <h2>{t('title_recommendations')}</h2>
      <div className="cards">
        {products.slice(0,numberProducts).map(product => {
          return(
            <Card key={product.name} score={product.score} img={product.images[0].urlImage} category={product.category.title} title={product.name} location={product.city.name} description={product.description} id={product.id} features={product.features} admin={false}/>);
          })
        }
      </div>
      <div className="seeMoreContainer">
        {products.length < numberProducts ? null : <button className="seeMoreButton" onClick={() => setNumberProducts(numberProducts + 8)}>{t('see_more_button')}</button> }
      </div>
    </section>
  );
}
  

export default Recomendations;
