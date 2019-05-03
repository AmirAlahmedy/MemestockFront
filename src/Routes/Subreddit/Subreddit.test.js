import React from 'react';
import Subreddit from './Subreddit';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';



it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Subreddit />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

