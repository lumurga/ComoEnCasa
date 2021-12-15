import React from 'react';
import App, { Home } from "./App"
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import { Route } from 'react-router-dom';
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

afterAll(() => {
  cleanup()
});

let pathMap = {};
describe('Array de routers', () => {
  beforeAll(() => {
    const component = shallow(<App/>);
    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
  })
  
  test('Comprobar que muestre el componente Home cuando la route sea "/"', () => {
    expect(pathMap['/']).toBe(Home);
  })
})

test('Comprobar que los hijos de la section Buscador sean 2', () => {
  const wrapper = shallow(<App />)
  const classname = wrapper.filter('.App') 
  expect(classname.children()).toHaveLength(1);   
})