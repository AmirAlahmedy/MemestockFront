import React from 'react';
import Registration from './Registration';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

it('Registration page renders without crashing', () => {
    const form = document.createElement('form');
    ReactDOM.render(<Registration/>, form);
    ReactDOM.unmountComponentAtNode(form);

});

test('', () => {
    const component = renderer.create(
      <Registration/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
   
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


// test('Adds 2 + 2 to equal 4', () => {
//     expect(functions.add(2, 2)).toBe(4);
// });