import React from 'react';
import { useTranslation } from 'react-i18next';

import "./Block.scss"

const Block = ({src, title, setProducts, setNumberProducts}) => {

    const { t } = useTranslation()

    const fetchProductsCate = async () => {
        const response = await fetch("http://52.67.178.177:8080/products/category/" + title);
        const responseJSON = await response.json()
        setProducts(responseJSON);
        setNumberProducts(8)
    }

    return (
        <div className="blockContainer" onClick={fetchProductsCate}>
            <div className="imgContainer">
                <img src={src} alt="Imagen de la categoria"/> 
            </div>
            <div className="titleContainer">
                <h3>{t(title)}</h3>
                <p>100.104 {t('availability_category')}</p>
            </div>
        </div>
    );
}

export default Block;
