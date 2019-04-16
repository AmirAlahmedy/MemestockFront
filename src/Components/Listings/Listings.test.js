import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Listing from './Listings';
import { BrowserRouter as Router } from 'react-router-dom';
import Aux from '../HOC/Auxiliary';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';

configure({adapter: new Adapter()});

// describe('<Listing />', () => {

//   let wrapper;

//   beforeEach(() => {
//       wrapper = shallow(<Listing><Router></Router></Listing>);
//   });

//   it('Listing component renders', () => {
//     expect(wrapper.find(Aux)).toHaveLength(1);
//   });

 

// });

const Component = () => <Listing />
const WrappedComponent = withRouter(Component)

it('Listing component renders', () => expect(renderer.create(<Component />)).toBeDefined())
it('Listing component will fail', () => renderer.create(<WrappedComponent />))