import React from "react";
import Block from "./Block"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })


afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Block />)
    expect(wrapper).toHaveLength(1);
  });

test('Comprobar que una variable no sea undefined', () => {
    const wrapper = render(<Block />)
    const img = wrapper.getByRole("img")
    expect(img.getAttribute("alt")).toMatch("Imagen de la categoria");
})

test('Comprobar que una variable no sea undefined', () => {
    const wrapper = shallow(<Block />)
    const element = wrapper.find('p').text()
    expect(element).toBe('100.104 availability_category')
})


