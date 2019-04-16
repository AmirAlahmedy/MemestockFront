import React from 'react';
import { configure, shallow } from 'enzyme';
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

  

});