import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import User from './User';
import { create } from "react-test-renderer";

configure({adapter: new Adapter()});
//jest.mock("axios");

describe('<User/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<User></User>);
    });

    test("it matches the snapshot", () => {
        const component = create(<User />);
        expect(component.toJSON()).toMatchSnapshot();
      });

    it("shows User info", async () => {
        const component = create(<User />);
        const instance = component.getInstance();
        await instance.componentDidMount();
        console.log(instance.state) 
    });
})
it("goes to user's profile", async () => {
    const component = create(<User />);
    const instance = component.getInstance();
    await instance.goto();
    console.log(instance.state) 
});