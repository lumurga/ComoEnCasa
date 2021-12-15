import React from 'react'
import UserHeader, {goUserProfile} from './UserHeader'
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
    const wrapper = shallow(<UserHeader />)
    expect(wrapper).toHaveLength(1);
})

test('Comprobar que los hijos de la section Buscador sean 2', () => {
    const wrapper = shallow(<UserHeader className={'admin'} />)
    const classname = wrapper.find('div').first()
    expect(classname.hasClass('admin')).toBeTruthy();   
  })

