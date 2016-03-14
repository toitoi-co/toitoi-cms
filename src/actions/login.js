'use strict';

const CST = require('../shared/constants');
const axios = require('axios');
const Firebase = require('firebase');
const firebaseRef = new Firebase(CST.FIREBASE_URL);
// const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');

/*** TODO remove the following after setpassword code is finalized ***/
export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_SET_TOKEN = 'SET_TOKEN';
export const AUTH_DISCARD_TOKEN = 'DISCARD_TOKEN';
export const AUTH_SET_USER = 'SET_USER';


/* Auth with -admin server then req Firebase token from it. */
export function loginUser(creds) {
  return function(dispatch) {
    dispatch(loginRequest())
    axios.post(`${CST.LOGIN_URL}/login`, creds, { withCredentials: true })
    .then((response) => {
      // console.log('login response:', response)
      dispatch(loginSuccess(response));
    })
    .then(() => {
      dispatch(requestToken());
    })
    .catch((err) => {
      dispatch(loginFailure(err));
    });
  }
}

function loginRequest() {
  return {
    type: CST.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    hasToken: false,
  }
}

function loginSuccess(response) {
  return {
    type: CST.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    hasToken: false,
    payload: response
  }
}

function loginFailure(response) {
  console.log('error:', response);
  return {
    type: CST.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    hasToken: false,
    payload: response
  }
}

export function requestToken() {
  return function(dispatch) {
    dispatch(tokenRequest());
    axios.post(`${CST.LOGIN_URL}/generate-token`, null, { withCredentials: true })
    .then((response) => {
      /* Got token, now auth Firebase with it */
      firebaseRef.authWithCustomToken(response.data.token, function(error, authData){
        if (error) {
          console.log('Firebase login Failed!', error);
          /* Token failed with Firebase */
          dispatch(tokenFailure(error));
        } else {
          console.log('Authenticated to Firebase successfully with payload:', authData);
          auth.setToken(authData.token);
          dispatch(tokenSuccess(authData));
        }
      });
    })
    .catch((err) => {
      // console.log('token req error:', err)
      /* didn't get token from -admin server */
      dispatch(tokenFailure(err))
    });
  }
}

function tokenRequest() {
  return {
    type: CST.TOKEN_REQUEST,
    isFetching: true,
    isAuthenticated: true,
    hasToken: false
  }
}

function tokenSuccess(response) {
  return {
    type: CST.TOKEN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    hasToken: true,
    payload: response
  }
}

function tokenFailure(response) {
  console.log('error:', response);
  return {
    type: CST.TOKEN_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    hasToken: false,
    payload: response
  }
}


function logoutUser() {
  auth.logout();
  firebaseRef.unauth();
}
