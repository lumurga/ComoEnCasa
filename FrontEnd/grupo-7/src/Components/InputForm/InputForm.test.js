import React from "react";
import InputForm from "./InputForm";
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<InputForm />)
    expect(wrapper).toHaveLength(1);
})

test('Comprobar que los hijos de la div sean 2', () => {
    const wrapper = shallow(<InputForm />)
    const classname = wrapper.find('div') 
    expect(classname.children()).toHaveLength(2);   
  })
  