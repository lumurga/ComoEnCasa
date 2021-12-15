import React from "react";
import Categories from "./Categories"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin error', () => {
	const wrapper = shallow(<Categories />)
    expect(wrapper).toHaveLength(1);	
});

test('Comprobar que una variable no sea undefined', () => {
    const wrapper = shallow(<Categories />)
    const element = wrapper.find('h2').text()
    expect(element).toBe('title_categories')
})

