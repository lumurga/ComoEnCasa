import React from "react";
import Gallery from "./Gallery"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })


afterAll(() => {
    cleanup()
});

const imagesData = [{ urlImage: "https://yt3.ggpht.com/DANVQORpJ8pSi_a7yV2iimlQ4Dbn4UNEMqPVnUbNvD2MuK2yxwXddCfTafv68eqLIXgvik-TyA=s900-c-k-c0x00ffffff-no-rj"},
{urlImage: "https://phantom-expansion.unidadeditorial.es/7a01447f134fa1a4baadf1c5174644cf/resize/640/assets/multimedia/imagenes/2021/03/16/16158875126483.jpg"},
{urlImage: "https://www.casasparaconstruir.com/projetos/1012/01.jpg"},
{urlImage: "https://www.bbva.com/wp-content/uploads/2021/04/casas-ecolo%CC%81gicas_apertura-hogar-sostenibilidad-certificado--1024x629.jpg"},
{urlImage: "https://img.interempresas.net/fotos/P2975463.jpeg"}]

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Gallery images={imagesData}/>)
    expect(wrapper).toHaveLength(1);
  });