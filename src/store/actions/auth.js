import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// export const checkAuthTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime * 1000);
//     };
// };

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
             returnSecureToken: true
        };
        // let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
        // if (!isSignup) {
        //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY';
        // }
        
        axios.post('user/register', authData)
        .then( response => {
            
             localStorage.setItem('alreadyRegistered', true);
             localStorage.setItem('token', response.data.token);   
           
                
             dispatch(authSuccess(response.data.token));
        })
        .catch( error =>{
            dispatch(authFail(error.response.data.error));
        })

    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } 
    };
};