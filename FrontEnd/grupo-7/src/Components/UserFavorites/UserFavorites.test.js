import React from "react";
import UserFavorites from "./UserFavorites"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })


afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<UserFavorites />)
    expect(wrapper).toHaveLength(1);
});

{/*test('Find the div element', () => {
    const wrapper = render(<UserFavorites />)
    const div = wrapper.getByText('Mis Favoritos')
    expect(div).toBeTruthy();
});*/}

test('Find the div element', () => {
    const wrapper = render(<UserFavorites />)
    const div = wrapper.getByText('Página en construcción')
    expect(div).toBeTruthy();
});
