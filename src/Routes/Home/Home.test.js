import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';
import NavBar from '../../Components/NavBar/Navbar';
import { BrowserRouter as Router} from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<Home />', () => {
  it('Home component renders', () => {
    const wrapper = mount(<Router> <Home /></Router>);
    expect(wrapper).toContain(<NavBar />);
  });
});