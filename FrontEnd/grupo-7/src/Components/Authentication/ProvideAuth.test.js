import React from "react";
import Provideauth from "./ProvideAuth";
import "@testing-library/jest-dom/extend-expect"
import { cleanup, render } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

test('Deberia renderizarse sin error', () => {
    const wrapper = shallow(<Provideauth />)
    expect(wrapper).toHaveLength(1);
})