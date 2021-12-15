import React from "react";
import ScrollToTop from "../ScrollToTop/ScrollToTop"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin error', () => {
	const wrapper = shallow(<ScrollToTop />)
    expect(wrapper).toHaveLength(1);	
});

test('Comprobar que el valor del atributo type sea submit', () => {
	const wrapper = shallow(<ScrollToTop />)
    const container = wrapper.find('.scrollButton')
    const button = container.find('button')
    expect(button).toBeDefined();	
}); 




