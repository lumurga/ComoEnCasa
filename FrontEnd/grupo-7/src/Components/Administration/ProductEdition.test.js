import React from "react";
import ProductEdition from "./ProductEdition";
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});


test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<ProductEdition />)
  expect(wrapper).toHaveLength(1);
});

