import React from 'react'
import Register from './Register'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<Register />)
    expect(wrapper).toHaveLength(1);
})