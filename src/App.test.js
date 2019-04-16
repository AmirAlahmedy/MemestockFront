import React from 'react';
import ReactDOM from 'react-dom';
import { registrationHandler as regHand, app as App } from './App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import Registration from './Routes/Registration/Registration';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


configure({adapter: new Adapter()});

const app = shallow(
  <Router>
      <App />
  </Router>);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});

//savePassword
// test('Saves password after form submission', () => {
  // describe('savePassword', () => {

  //   it('should call onChange prop', () => {
  //     const onSearchMock = jest.fn();
  //     const event = {
  //       target: { value: 'the-value' }
  //     };
  //     const component = shallow(<Registration onSearch={onSearchMock} />);
  //     component.find('.passInput').simulate('change', event);
  //      expect(onSearchMock).toBeCalledWith('the-value');
  //   });
  
  // });  
  
// });
// registrationHandler


describe('Registration request', () => {
    it('returns data when reistrationHandler is called', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet('http://localhost:4000/user/register').reply(200, data);

        regHand (0, 'any').then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
});