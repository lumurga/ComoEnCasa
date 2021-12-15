import React from "react";
import MyReservations from "./MyReservations";
import "@testing-library/jest-dom/extend-expect"
import { screen, cleanup } from "@testing-library/react"
import { shallow, render, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

const icons = [{ name: "Cocina" }, { name: "Aire acondicionado"}];

test('Deberia renderizarse sin Error', () => {
  const wrapper = shallow(<MyReservations features={icons} />)
  expect(wrapper).toHaveLength(1);
});

