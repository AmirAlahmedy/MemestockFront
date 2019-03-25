import React from 'react';
import ReactDOM from 'react-dom';
import Listing from './Listings';

it('A listning renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Listing />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

//createThread

//createThreads