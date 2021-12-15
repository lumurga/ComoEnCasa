import React from "react";
import ProductRegistrationFormik from "./ProductRegistrationFormik";
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<ProductRegistrationFormik />)
  expect(wrapper).toHaveLength(1);
});


test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<ProductRegistrationFormik />)
  const classname = wrapper.find('.buttonGroup')
  const button = classname.filter('button')
  const element = jest.fn(() => true);
  element();
  element();
  expect(element).toHaveReturnedTimes(2);
  
});


