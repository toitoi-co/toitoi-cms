import axios from 'axios'

export const SET_PASSWORD = 'SET_PASSWORD'
export const LOGIN_USER = 'LOGIN_USER'
export const AUTH_SET_TOKEN = 'SET_TOKEN'
export const AUTH_DISCARD_TOKEN = 'DISCARD_TOKEN'
export const AUTH_SET_USER = 'SET_USER'

const ROOT_URL = 'http://localhost:9000/api'
// using info learned from https://auth0.com/blog/2016/01/04/secure-your-react-and-redux-app-with-jwt-authentication/

// TODO: need to integrate with auth server
export function setPassword() {
  //make some API request here to set password
  //placeholder, set request = true
  const request = true

  return {
    type: SET_PASSWORD,
    payload: request
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

// At the moment, receiveLogin() and loginError() not called because the reducer is handling
// the return of success and errors. Not the best way but keeping here until get a handle on
// figuring out how to conditionally return different statuses from loginUser() promise.

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  const request = axios.post(`${ROOT_URL}/authenticate`, creds)

  return {
    type: LOGIN_REQUEST,
    payload: request
  }
}
