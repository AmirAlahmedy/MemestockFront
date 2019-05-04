import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import Flairs from './Flairs';
import { create } from "react-test-renderer";

configure({adapter: new Adapter()});
//jest.mock("axios");

describe('<Flairs/>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Flairs></Flairs>);
    });

    test("it matches the snapshot", () => {
        const component = create(<Flairs />);
        expect(component.toJSON()).toMatchSnapshot();
      });

    it("shows a list of flairs", async () => {
        const component = create(<Flairs />);
        const instance = component.getInstance();
        await instance.componentDidMount();
        console.log(instance.state) 
    });

    // it("shows a list of flairs (mock)", async () => {
    //     const response = {
    //       flairs:  [
    //         {
    //             "_id": "5cc5e38d58af9d0e34be6663",
    //             "username": "mostafa_hazem",
    //             "srName": "Education",
    //             "flair": "el bob",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "5cc5ed2bf14172494416af83",
    //             "username": "mostafa_hazem",
    //             "srName": "Technology",
    //             "flair": "el bob2",
    //             "__v": 0
    //         }
    //     ]

    //     };
    //     axios.get.mockResolvedValue(response);
    //     const component = create(<Flairs />);
    //     const instance = component.getInstance();
    //     await instance.componentDidMount();
    //     console.log(instance.state); // << HERE IS THE SNITCH!
    //   });

    
})

