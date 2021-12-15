import React from "react";
import RegisterFormik from "./RegisterFormik";
import "@testing-library/jest-dom/extend-expect"
import { screen, cleanup } from "@testing-library/react"
import { render, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<RegisterFormik />)
  expect(wrapper).toHaveLength(1);
});



