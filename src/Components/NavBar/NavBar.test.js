import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Navbar';

it('NavBar renders without crashing', () => {
    const nav = document.createElement('nav');
    ReactDOM.render(<NavBar />, nav);
    ReactDOM.unmountComponentAtNode(nav);
  });