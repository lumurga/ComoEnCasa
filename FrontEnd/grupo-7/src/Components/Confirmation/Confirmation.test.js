import React from "react";
import Confirmation from "./Confirmation"
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin error', () => {
	const wrapper = shallow(<Confirmation />)
    expect(wrapper).toHaveLength(1);	
});

test('Texto de reserva', () => {
    const wrapper = shallow(<Confirmation />);
    const h2 = wrapper.find('h2');
    expect(h2.text()).toEqual('booking_success_thanks');
  });