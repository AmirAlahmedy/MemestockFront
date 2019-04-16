import React from 'react';
import Thread from './Thread';
import ReactDOM from 'react-dom';


it('A listning renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PMs />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
