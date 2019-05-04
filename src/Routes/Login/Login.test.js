import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from './Login';
import Aux from '../../Components/HOC/Auxiliary';

configure({adapter: new Adapter()});

describe('<Login />', () => {

  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<Login />);
  });

  it('Login component renders', () => {
    expect(wrapper.find(Aux)).toHaveLength(1);
  });

  it('Login should call handleSubmit when clicked', () => {
    const spy = jest.spyOn(Login.prototype, 'handleSubmit');
    const f_wrapper = mount(<Login/>);
    f_wrapper.find('.logInForm').simulate('submit');
    expect(spy).toHaveBeenCalled() 
  });

  it('Inputs render', () => {
    expect(wrapper.find('.inputs')).toHaveLength(1);
  });

  it('Login button renders ', () => {
    expect(wrapper.find('.registerButton')).toHaveLength(1);
  });

  it('Login should call forgotPassHand when forgot password link is clicked', () => {
    const spy = jest.spyOn(Login.prototype, 'forgotPassHand');
    const f_wrapper = mount(<Login/>);
    f_wrapper.find('#frgt').simulate('click');
    expect(spy).toHaveBeenCalled() 
  });
});