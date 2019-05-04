import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  { Thr, Listings } from './Listings';
import Aux from '../HOC/Auxiliary';
import renderer from 'react-test-renderer';


configure({adapter: new Adapter()});

describe('<Listings />', () => {

  let wrapper;

  beforeEach(() => {
      wrapper = shallow(<Listings></Listings>);
  });

  it('Listings component renders', () => {
    expect(wrapper.find(Aux)).toHaveLength(1);
  });

  const Component = () => <Listings />
  it('Listing component renders', () => expect(renderer.create(<Component />)).toBeDefined())
  
   
  it('Threads should call goToCreateSr when clicked', () => {
    const Sr_spy = jest.spyOn(Thr.prototype, 'goToCreateSr');
    const Sr_wrapper = mount(<Thr/>);
    Sr_wrapper.find('#Sr').simulate('click');
    expect(Sr_spy).toHaveBeenCalled() 
  });

  it('Threads should call goToCreatePost when clicked', () => {
    const Sr_spy = jest.spyOn(Thr.prototype, 'goToCreatePost');
    const Sr_wrapper = mount(<Thr/>);
    Sr_wrapper.find('#Cp').simulate('click');
    expect(Sr_spy).toHaveBeenCalled() 
  });

  it('getThreads is called', () => {
    const spyThreads = jest.spyOn(Thr.prototype, 'getThreads');
    const wrapperThreads = mount(<Thr />);
     wrapperThreads.instance().getThreads();
     expect(spyThreads).toHaveBeenCalled();
  });
  
  it('componentDidMount is called', () => {
    const spy = jest.spyOn(Thr.prototype, 'componentDidMount');
    const did_wrapper = mount(<Thr />);
    did_wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  


  

 
 

});

