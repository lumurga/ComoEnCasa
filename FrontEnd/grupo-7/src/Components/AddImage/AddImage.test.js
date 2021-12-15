import React from "react";
import AddImage from "./AddImage";
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<AddImage />)
  expect(wrapper).toHaveLength(1);
});

test('Comprobar que una variable no sea undefined', () => {
    const wrapper = render(<AddImage />)
    const img = wrapper.getByRole("img")
    expect(img.getAttribute("alt")).toMatch("Imagen de la categoria");
})