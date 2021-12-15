import React, { useState, useEffect } from 'react';

/* Componentes */
import Searcher from '../Searcher/Searcher';
import Categories from '../Categories/Categories';
import Recomendations from '../Recomendations/Recomendations.jsx';

import './Home.scss'

const Home = () => {

  const [products, setProducts] = useState([])
  const [numberProducts, setNumberProducts] = useState(8);

  return (
    <>
      <main>
        <Searcher setProducts={setProducts} setNumberProducts={setNumberProducts}/>
        <Categories setProducts={setProducts} setNumberProducts={setNumberProducts}/>
        <Recomendations products={products} setProducts={setProducts} setNumberProducts={setNumberProducts} numberProducts={numberProducts}/>
      </main>
    </>
  );
}

export default Home;
