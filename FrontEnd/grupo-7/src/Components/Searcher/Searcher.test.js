import React from "react";
import Searcher from "./Searcher"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<Searcher />)
  expect(wrapper).toHaveLength(1);
});


test('Comprobar que exista el botón Buscar', () => {
    const componente = shallow(<Searcher />)
    expect(componente.find('button').text().includes('Buscar')).toBe(false)
})

test('Comprobar que los hijos de la section Buscador sean 2', () => {
  const wrapper = shallow(<Searcher />)
  const classname = wrapper.find('.searcherContainer') 
  expect(classname.children()).toHaveLength(2);   
})

