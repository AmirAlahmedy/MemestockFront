import React from 'react';
import Registration from './Registration';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

it('Registration page renders without crashing', () => {
    const form = document.createElement('form');
    ReactDOM.render(<BrowserRouter> <Registration/></BrowserRouter>, form);
    ReactDOM.unmountComponentAtNode(form);

});



// test('Adds 2 + 2 to equal 4', () => {
//     expect(functions.add(2, 2)).toBe(4);
// });