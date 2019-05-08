import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import CardProf from './CardProf';
import { create } from "react-test-renderer";

configure({adapter: new Adapter()});
//jest.mock("axios");

describe('<CardProf/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CardProf></CardProf>);
    });

    test("it matches the snapshot", () => {
        const component = create(<CardProf />);
        expect(component.toJSON()).toMatchSnapshot();
      });

    it("shows the Cakeday ", async () => {
        const component = create(<CardProf />);
        const instance = component.getInstance();
        await instance.componentDidMount();
        console.log(instance.state) 
    });
})
it("block user ", async () => {
    const component = create(<CardProf />);
    const instance = component.getInstance();
    await instance.handleBlock();
    console.log(instance.state) 
});

it("Add user as a friend ", async () => {
    const component = create(<CardProf />);
    const instance = component.getInstance();
    await instance.handleFriend();
    console.log(instance.state) 
});

it("Unblock user  ", async () => {
    const component = create(<CardProf />);
    const instance = component.getInstance();
    await instance.handleUnblock();
    console.log(instance.state) 
});

it("Remove friend request", async () => {
    const component = create(<CardProf />);
    const instance = component.getInstance();
    await instance.removeReq();
    console.log(instance.state) 
});