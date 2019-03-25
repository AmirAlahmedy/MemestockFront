import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';

it('Login form renders without crashing', () => {
    const form = document.createElement('form');
    ReactDOM.render(<Login />, form);
    ReactDOM.unmountComponentAtNode(form);
});