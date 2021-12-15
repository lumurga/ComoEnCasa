import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

import Block from "../Block/Block"

import "./Categories.scss"

const Categories = ({setProducts, setNumberProducts}) => {

  const { t } = useTranslation()

  const [categories, setCategories] = useState([]);

  const fetchCate = async () => {
      const response = await fetch("http://52.67.178.177:8080/categories");
      const responseJSON = await response.json()
      setCategories(responseJSON);
  }

  useEffect(() => {
    fetchCate();
  }, []);


  return (
      <section className="categoriesContainer">
        <h2>{t('title_categories')}</h2>          
        <div className="categories">
          {
            categories.map(cat => 
              <Block key={cat.title} src={cat.urlImage} title={cat.title} setProducts={setProducts} setNumberProducts={setNumberProducts}/>)
          }
        </div>
      </section>
  );
}

export default Categories;
