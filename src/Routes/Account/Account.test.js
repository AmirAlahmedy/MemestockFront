import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Account from './Account';
import { create } from "react-test-renderer";

configure({adapter: new Adapter()});
//jest.mock("axios");

describe('<Account/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Account></Account>);
    });

    test("it matches the snapshot", () => {
        const component = create(<Account />);
        expect(component.toJSON()).toMatchSnapshot();
      });

    it("Password ", async () => {
        const component = create(<Account />);
        const instance = component.getInstance();
     //   await instance.componentDidMount();
        console.log(instance.state) 
    });
})