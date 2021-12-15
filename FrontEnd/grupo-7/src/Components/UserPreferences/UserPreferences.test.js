import React from 'react'
import UserPreferences from './UserPreferences'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});



test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<UserPreferences name={"Sofia"} lastName={"Medina"} email={"sofiamedina@medina.com"}/>)
    expect(wrapper).toHaveLength(1);
})

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<UserPreferences name={"Sofia"} lastName={"Medina"} email={"sofiamedina@medina.com"}/>)
    const classname = wrapper.find('.userPreferences') 
    expect(classname.children()).toHaveLength(4);   
})