// import axios from 'axios'
'use strict';

const axios = require ('axios')

export const SET_PASSWORD = 'SET_PASSWORD';
export const LOGIN_USER = 'LOGIN_USER';
export const AUTH_SET_TOKEN = 'SET_TOKEN';
export const AUTH_DISCARD_TOKEN = 'DISCARD_TOKEN';
export const AUTH_SET_USER = 'SET_USER';

const LOGIN_URL = 'http://localhost:3000';
// using info learned from https://auth0.com/blog/2016/01/04/secure-your-react-and-redux-app-with-jwt-authentication/

// TODO: need to integrate with auth server
export function setPassword() {
  //make some API request here to set password
  //placeholder, set request = true
  const request = true;

  return {
    type: SET_PASSWORD,
    payload: request
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    hasToken: false,
    creds
  }
}

function receiveLogin(response) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    hasToken: false,
    payload: response
  }
}

function loginError(response) {
  console.log('error:', response);
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    hasToken: false,
    payload: response
  }
}

function receiveToken(response) {
  return {
    type: TOKEN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    hasToken: true,
    payload: response
  }
}

function requestToken() {
  return function(dispatch) {
    axios.post(`${LOGIN_URL}/generate-token`, null, { withCredentials: true })
    .then((response) => {
      console.log('token response:', response)
      dispatch(receiveToken(response))
    })
    .catch((err) => {
      dispatch(loginError(err))
    });
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  return function(dispatch) {
    dispatch(requestLogin(creds))

    axios.post(`${LOGIN_URL}/login`, creds)
    .then((response) => {
      console.log('login response:', response)
      dispatch(receiveLogin(response));
    })
    .then(() => {
      dispatch(requestToken());
    })
    .catch((err) => {
      dispatch(loginError(err));
    });
  }
}
