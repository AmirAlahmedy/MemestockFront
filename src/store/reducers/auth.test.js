import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
            Credentials: {
                Email: '',
                Username: '',
                Password: ''
              },
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
            Credentials: {
                Email: '',
                Username: '',
                Password: ''
              },
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id',
            Credentials: {
                Email: 'some-email',
                Username: 'some-username',
                Password: 'some-password'
              },
         })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            Credentials: {
                Email: 'some-email',
                Username: 'some-username',
                Password: 'some-password'
              },
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    })
});
