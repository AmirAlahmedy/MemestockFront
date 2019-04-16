import React from 'react';
import Subreddit from './Subreddit';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';



it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Subreddit />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


// test('Link changes the class when hovered', () => {
//     const component = renderer.create(
//       <Subreddit page="http://www.facebook.com">Facebook</Subreddit>,
//     );
// })