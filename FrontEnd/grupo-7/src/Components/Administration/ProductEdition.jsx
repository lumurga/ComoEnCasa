import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Heading from '../Heading/Heading';
import ProductEditionFormik from './ProductEditionFormik';

import './ProductRegistration.scss';

const ProductEdition = () => {

  const { t } = useTranslation();

  useEffect(() => {
    if(window.innerWidth <= 428)
      document.querySelector(".menuContainer").style.width = "0";
  }, [])


  return (
    <>
    <main style={{backgroundColor: "rgba(236, 238, 250, 0.425)", display:"flex", flexWrap:"wrap", width:"100%", justifyContent:"center" }}>
      <Heading title={t('admin_title_heading')} category=""/>
      <ProductEditionFormik/>
    </main>
    </>
  );
}

export default ProductEdition;