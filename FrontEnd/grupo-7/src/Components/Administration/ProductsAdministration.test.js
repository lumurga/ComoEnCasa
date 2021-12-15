import React from "react";
import ProductAdministration from "./ProductsAdministration";
import "@testing-library/jest-dom/extend-expect"
import { render, screen, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<ProductAdministration />)
  expect(wrapper).toHaveLength(1);
});