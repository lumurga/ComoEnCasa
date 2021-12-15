import React from 'react';

const Block = ({src, title, setProducts, setNumberProducts}) => {

    return (
        <div className="addContainer">

            <div className="imgContainer">
                <img src={src} alt="Imagen de la categoria"/> 
            </div>
        </div>
    );
}

export default Block;