import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './Navbar';
import Aux from '../HOC/Auxiliary';

configure({adapter: new Adapter()});

describe('<NavBar />', () => {

  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<NavBar />);
  });

  it('NavBar component renders', () => {
    expect(wrapper.find(Aux)).toHaveLength(1);
  });

  it('NavBar contains right links (PM, Create Post, Notifications)', () => {
    // wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find('.rightLinksWrapper')).toHaveLength(1);  
  });

  it('NavBar contains a searchbar', () => {
   
    expect(wrapper.find('.me-me')).toHaveLength(1);  
  });

});