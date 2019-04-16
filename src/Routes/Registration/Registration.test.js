import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Registration from './Registration';
import Aux from '../../Components/HOC/Auxiliary';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

configure({adapter: new Adapter()});

// describe('<Registration />', () => {

//   let wrapper;

//   beforeEach(() => {
//       wrapper = shallow(<Registration />);
//   });

//   it('Registration component renders', () => {
//     expect(wrapper.find(Aux)).toHaveLength(1);
//   });

  

// });


const Component = () => <Registration />
const WrappedComponent = withRouter(connect(Component))

it('will render', () => expect(renderer.create(<Component />)).toBeDefined())
it('will fail', () => renderer.create(<WrappedComponent />))