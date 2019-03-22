import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import Registration from '../Registration/Registration';

jest.mock('axios');

describe('Registration component', () => {
    describe('when rendered', () => {
        interface('should fetch a post request', () => {
            const postSpy = jest.spyOn(axios, 'post');
            const registratinonInstance = shallow(
                <Registration/>
            )
        });
        expect(postSpy).toBeCalled();
    })
})