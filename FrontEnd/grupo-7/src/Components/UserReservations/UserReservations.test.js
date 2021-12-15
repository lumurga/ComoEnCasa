import React from 'react'
import UserReservations, {activeBookings} from './UserReservations'
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
    const wrapper = shallow(<UserReservations />)
    expect(wrapper).toHaveLength(1);
})

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<UserReservations />)
    const container = wrapper.filter('section')
    const h2 = container.find('Mis reservas')
    expect(h2).toBeTruthy();
})
