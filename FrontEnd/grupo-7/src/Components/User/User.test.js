import React from "react";
import User from "./User"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })


afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<User />)
    expect(wrapper).toHaveLength(1);
  });

  test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<User />)
    const container = wrapper.find('.userNavContainer')
    const element1 = container.find('Mis Preferencias')
    expect(element1).toBeTruthy()
    const element2 = container.find('Mis Reservaciones')
    expect(element2).toBeTruthy()
    const element3 = container.find('Mis Favoritos')
    expect(element3).toBeTruthy()
    
  });

