import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './Navbar';


configure({adapter: new Adapter()});

describe('<NavBar />', () => {

  let wrapper, component;

  beforeEach(() => {
      wrapper = shallow(<NavBar />);
     // component = jest.TestUtils.renderIntoDocument(<div><NavBar /></div>);
  });

  it('NavBar component renders', () => {
    expect(wrapper.find('.navWrapper')).toHaveLength(1);
  });

  it('NavBar contains right links (PM, Create Post, Notifications)', () => {
    // wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find('.rightLinksWrapper')).toHaveLength(1);  
  });

  it('NavBar contains a searchbar', () => {
   
    expect(wrapper.find('.me-me')).toHaveLength(1);  
  });

  // it('Goes to home page', () => {
  //   const h_wrapper = mount(<NavBar />);
  //   const spy = jest.spyOn(h_wrapper.instance(), 'goTo');
  //   h_wrapper.find('.toHome').simulate('click');
  //   expect(spy).toHaveBeenCalled() 
  // });

});