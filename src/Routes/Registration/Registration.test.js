import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Registration from './Registration';
import Aux from '../../Components/HOC/Auxiliary';
import renderer from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import * as axios from 'axios';

configure({adapter: new Adapter()});

describe('<Registration />', () => {

  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<Registration />);
  });

  it('Registration component renders', () => {
    expect(wrapper.find(Aux)).toHaveLength(1);
  });

  it('Registration should call handleSubmit when clicked', () => {
    const spy = jest.spyOn(Registration.prototype, 'handleSubmit');
    const f_wrapper = mount(<Registration/>);
    f_wrapper.find('.regForm').simulate('submit');
    expect(spy).toHaveBeenCalled() 
  });

  it('Inputs render', () => {
    expect(wrapper.find('.inputs')).toHaveLength(1);
  });

  it('Registration button renders ', () => {
    expect(wrapper.find('.registerButton')).toHaveLength(1);
  });

//   it('returns data when handleSubmit is called', done => {
//     var mock = new MockAdapter(axios);
//     const data = { response: true };
//     mock.onPost('http://18.217.163.16/user/register').reply(200, data);

//     Registration.handleSubmit (0, 'any').then(response => {
//         expect(response).toEqual(data);
//         done();
//     });
//     });

        // Mock out all top level functions, such as get, put, delete and post:
    // jest.mock("axios");
    // it("good response", () => {
    //     axios.post.mockImplementation(() => Promise.resolve({
    //         status: 200, 
    //         data: {
    //             Email: 'user@reddit.com',
    //             Username: 'User1',
    //             Password: 'Password'}
    //         }));
    //     return Registration.all().then(resp => expect(resp.data).toEqual({"token":"we8749832b7498c2b78942"}))
    //   });

});


const Component = () => <Registration />
it('will render', () => expect(renderer.create(<Component />)).toBeDefined())
