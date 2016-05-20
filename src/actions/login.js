'use strict';
import { browserHistory } from 'react-router';

const CST = require('../shared/constants');
const axios = require('axios');
const Firebase = require('firebase');
const firebaseRef = new Firebase(CST.FIREBASE_URL);
const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');

export function confirmUser(id) {
  return function(dispatch) {
    axios.post(`${CST.LOGIN_URL}/confirm/${id}`, {})
    .then((response) => {
      dispatch(confirmUserSuccess());
    })
    .catch((err) => {
      dispatch(confirmUserFailure(err));
    });
  }
}

function confirmUserSuccess() {
  return {
    type: CST.CONFIRM_USER_SUCCESS
  }
}

function confirmUserFailure(err) {
  return {
    type: CST.CONFIRM_USER_FAILURE,
    payload: err
  }
}

/* Auth with -admin server then req Firebase & image tokens. */
export function loginUser(creds) {
  return function(dispatch) {
    dispatch(loginRequest());
    axios.post(`${CST.LOGIN_URL}/login`, creds, { withCredentials: true })
    .then((response) => {
      dispatch(loginSuccess(response));
      if (response.data.onboardingFlowCompleted) {
        dispatch(requestToken());
      }
      if (response.data.site.subdomainName) {
        dispatch(requestImageToken(response.data));
      }
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
    isLoggedIn: false,
    isAuthenticated: false,
  }
}

function loginSuccess(response) {
  console.log('login response:', response);
  return {
    type: CST.LOGIN_SUCCESS,
    isFetching: false,
    isLoggedIn: true,
    isAuthenticated: false,
    payload: response
  }
}

function loginFailure(response) {
  console.log('error:', response);
  return {
    type: CST.LOGIN_FAILURE,
    isFetching: false,
    isLoggedIn: false,
    isAuthenticated: false,
    payload: response
  }
}

export function requestToken() {
  return function(dispatch) {
    dispatch(tokenRequest());
    axios.post(`${CST.LOGIN_URL}/generate-token`, {}, { withCredentials: true })
    .then((response) => {
      /* Got token, now auth Firebase with it */
      console.log('resp:', response);
      firebaseRef.authWithCustomToken(response.data.token, function(error, authData){
        if (error) {
          console.log('Firebase login Failed!', error);
          /* Token failed with Firebase */
          dispatch(tokenFailure(error));
        } else {
          console.log('Authenticated to Firebase.', authData);
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
    isAuthenticated: false,
    isLoggedIn: true,
    hasToken: false
  }
}

function tokenSuccess(response) {
  return {
    type: CST.TOKEN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    isLoggedIn: true,
    payload: response
  }
}

function tokenFailure(response) {
  console.log('error:', response);
  return {
    type: CST.TOKEN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    isLoggedIn: true,
    payload: response
  }
}

export function requestImageToken(user) {

  let hostname = user.site.subdomainName + '.toitoi.co';
  console.log('hostname:', hostname);
  console.log('token:', auth.getToken());
  return function(dispatch) {
    dispatch(imageTokenRequest());
    webSocketRef.send(JSON.stringify({
      'site': hostname,
      'token': auth.getToken(),
      'messageType': 'imageToken'
    }));
    webSocketRef.onerror = function(error) {
      console.log('WebSocket Error:', error);
      dispatch(imageTokenFailure(error));
    }
    webSocketRef.onmessage = function(evt) {
      console.log('WebSocket Message:', evt.data);
      dispatch(imageTokenSuccess(evt.data));
    }
  }
}

function imageTokenRequest() {
  return {
    type: CST.IMAGE_TOKEN_REQUEST,
    isFetching: true,
  }
}

function imageTokenSuccess(response) {
  return {
    type: CST.IMAGE_TOKEN_SUCCESS,
    isFetching: false,
    payload: JSON.parse(response)
  }
}

function imageTokenFailure(response) {
  console.log('error:', response);
  return {
    type: CST.IMAGE_TOKEN_FAILURE,
    isFetching: false,
    payload: JSON.parse(response)
  }
}

function logoutSuccess(response) {
  console.log('logout:', response);
  return {
    type: CST.LOGOUT_SUCCESS,
    isFetching: false,
    isLoggedIn: false,
    isAuthenticated: false,
    payload: response
  }
}

export function logoutUser() {
  return function(dispatch) {
    firebaseRef.unauth();
    axios.post(`${CST.LOGIN_URL}/logout`, {}, { withCredentials: true })
    .then((response) => {
      dispatch(logoutSuccess(response));
      auth.removeToken();
      browserHistory.push('/');
    })
    .catch((err) => {
      console.log('Failed to logout user:', err);
      /* TODO The dispatch below should be removed... it's a false positive to resolve the
       401 we're getting back when trying to logout */
      dispatch(logoutSuccess(err));
    })
  }
}

// function returnUser(response) {
//   return {
//     type: CST.RETURN_USER,
//     isLoggedIn: true,
//     payload: response
//   }
// }

export function reloadUser() {
  console.log('about to get user!');
  return function(dispatch) {
    axios.get(`${CST.LOGIN_URL}/profile`, { withCredentials: true })
    // .then((response) => {
    //   dispatch(returnUser(response));
    // })
    // .catch((err) => {
    //   console.log('Failed to get user:', err);
    // })
    .then((response) => {
      dispatch(loginSuccess(response));
      if (response.data.onboardingFlowCompleted) {
        dispatch(requestToken());
      }
      if (response.data.site.subdomainName) {
        dispatch(requestImageToken(response.data));
      }
    })
    .catch((err) => {
      dispatch(loginFailure(err));
      if (err.status === 401) {
        browserHistory.push('/');
      }
    });
  }
}

function getHostURL() {
  var http = location.protocol;
  var slashes = http.concat('//');
  return slashes.concat(window.location.hostname);
}

// export function checkAuth() {
//   console.log('Check auth');
//   /* This fn checks to see if user is still authenticated (200) otherwise will redirect to login page.
//      If indeed authenticated, will proceed to get Firebase token and retrieve user object */
//   return function(dispatch) {
//     dispatch(tokenRequest());
//     axios.post(`${CST.LOGIN_URL}/generate-token`, {}, { withCredentials: true })
//     .then((response) => {
//       console.log('check auth resp:', response);
//       /* success...200 response */
//       /* Got token, now auth Firebase with it */
//       firebaseRef.authWithCustomToken(response.data.token, function(error, authData){
//         if (error) {
//           console.log('Firebase login Failed!', error);
//           /* Token failed with Firebase */
//           dispatch(tokenFailure(error));
//         } else {
//           console.log('Authenticated to Firebase successfully with payload:', authData);
//           // auth.setToken(authData.token);
//           dispatch(tokenSuccess(authData));
//           dispatch(getUser());
//         }
//       });
//     })
//     .catch((err) => {
//       /* Didn't get token from -admin server */
//       dispatch(tokenFailure(err))
//       console.log('Firebase token error:', err);
//       if (err.status === 401) {
//         window.location = `${CST.CMS_URL}/`;
//       }
//
//     });
//   }
// }

export function resetPassword(id) {
  return function(dispatch) {
    /* TODO 'reset' endpoint is just a placeholder... need to add correct one */
    axios.post(`${CST.LOGIN_URL}/reset/${id}`, {})
    .then((response) => {
      dispatch(resetPasswordSuccess());
    })
    .catch((err) => {
      dispatch(resetPasswordFailure(err));
    });
  }
}

function resetPasswordSuccess() {
  return {
    type: CST.RESET_PASSWORD_SUCCESS,
  }
}

function resetPasswordFailure(err) {
  return {
    type: CST.RESET_PASSWORD_FAILURE,
    payload: err
  }
}
