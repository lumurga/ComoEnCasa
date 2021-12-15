import React from "react";
import LocationSearch from "./LocationSearch";
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup } from "@testing-library/react"
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
    cleanup()
});

const citiData = [{ name: "La Rioja", country: "Argentina"},
{name: "Cordoba", country: "Argentina"},
{name: "Rosario", country: "Argentina"}]

test('Deberia renderizarse sin Error', () => {
    const wrapper = shallow(<LocationSearch cities={citiData} />)
    expect(wrapper).toHaveLength(1);
})
