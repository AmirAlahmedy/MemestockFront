import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  { Thr, Listings } from './Listings';
import Aux from '../HOC/Auxiliary';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { create } from 'react-test-renderer';

configure({adapter: new Adapter()});
jest.mock("axios");

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
  
  it("shows a list of threads", async () => {
    const response = {
      posts: [
        {
            _id: "5cc38191735094039ec8d927",
            title: "Rush Hour 4",
            body: "There are rumors that Rush Hour 4 might be in the making.",
            creatorUsername: "sabek",
            subredditName: "Movies",
            postDate: "2019-04-26T22:09:21.236Z",
        },
        {
            _id: "5cc38191735094039ec8d926",
            title: "Avengers: Endgame",
            body: "Unpopular opinion: Endgame is super overrated.",
            creatorUsername: "captainmaged",
            subredditName: "Movies",
            postDate: "2019-04-26T22:09:21.221Z",
        }
  
        ]
    };
    axios.get.mockResolvedValue(response);
    const component = create(<Thr />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    console.log(instance.state); // << HERE IS THE SNITCH!
  });

  // it('should change state', () => {
  //   const wrapper = shallow(<Thr/>);
  //   const resp = {data:   { posts: [
  //     {
  //         _id: "5cc38191735094039ec8d927",
  //         title: "Rush Hour 4",
  //         body: "There are rumors that Rush Hour 4 might be in the making.",
  //         creatorUsername: "sabek",
  //         subredditName: "Movies",
  //         postDate: "2019-04-26T22:09:21.236Z",
  //     },
  //     {
  //         _id: "5cc38191735094039ec8d926",
  //         title: "Avengers: Endgame",
  //         body: "Unpopular opinion: Endgame is super overrated.",
  //         creatorUsername: "captainmaged",
  //         subredditName: "Movies",
  //         postDate: "2019-04-26T22:09:21.221Z",
  //     }

  //     ]}};
  
  //   axios.post.mockResolvedValue(resp);
  
  //   wrapper.instance().getListing('new').then(resp => {
  //      expect(wrapper.state('reqThreads')).toEqual(resp.data.posts);
  //   });
  
  // }); 

  // it('componentDidMount is called', () => {
  //   const spy = jest.spyOn(Thr.prototype, 'componentDidMount');
  //   const did_wrapper = mount(<Thr />);
  //   did_wrapper.instance().componentDidMount();
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });
  


  

 
 

});

