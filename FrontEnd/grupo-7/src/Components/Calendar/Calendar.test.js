import React from "react";
import Calendar, {DatePicker} from "./Calendar"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })


afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Calendar />)
    expect(wrapper).toHaveLength(1);
  });

  test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Calendar />)
    const element = wrapper.find('h1').text()
    expect(element).toBe('Cargando..')
  });

  test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Calendar />)
    const element = wrapper.find('DatePicker')
    expect(element.children()).not.toHaveLength(11); 
  });
