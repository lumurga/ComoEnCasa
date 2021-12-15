import React from "react";
import Policies from "./Policies";
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Policies />)
    expect(wrapper).toHaveLength(1);
})

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Policies />)
    const classname = wrapper.find('.security') 
    expect(classname.find('ul').children()).toHaveLength(3);   
})