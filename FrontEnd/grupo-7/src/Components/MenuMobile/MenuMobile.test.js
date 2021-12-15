import React from "react";
import MenuMobile from "./MenuMobile"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<MenuMobile />)
    expect(wrapper).toHaveLength(1);
});

test('Comprobar que los hijos de la section Buscador sean 2', () => {
    const wrapper = shallow(<MenuMobile />)
    const classname = wrapper.find('.socials') 
    expect(classname.children()).toHaveLength(4);   
  })
  

    
    
