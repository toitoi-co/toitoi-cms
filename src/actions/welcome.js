'use strict';
import { browserHistory } from 'react-router';

const CST = require('../shared/constants');
const STEPS = require('../shared/welcome_steps');
const axios = require('axios');

export function saveSite(vals) {
  return function(dispatch) {
    dispatch(saveSiteRequest());
    axios.put(`${CST.LOGIN_URL}/site`, vals, { withCredentials: true })
    .then((response) => {
      dispatch(saveSiteSuccess());
      browserHistory.push('/welcome/theme');
    })
    .catch((err) => {
      dispatch(welcomeFailure(err));
    })
  }
}

function saveSiteRequest(response) {
  return {
    type: CST.WELCOME_SITE_REQUEST,
    isFetching: true
  }
}

function saveSiteSuccess(response) {
  STEPS.setStep(1);
  return {
    type: CST.WELCOME_SITE_SUCCESS,
    isFetching: false,
    payload: response
  }
}

// export function savePlan(vals) {
//   return function(dispatch) {
//     dispatch(savePlanRequest());
//     console.info('vals', vals);
//     // axios.put(`${CST.LOGIN_URL}/profile`, vals, { withCredentials: true })
//     // .then((response) => {
//     //   dispatch(savePlanSuccess());
//     // })
//     // .catch((err) => {
//     //   dispatch(welcomeFailure(err));
//     // })
//     browserHistory.push('/dashboard');
//   }
// }
//
// function savePlanRequest(response) {
//   return {
//     type: CST.WELCOME_PLAN_REQUEST,
//     isFetching: true
//   }
// }
//
// function savePlanSuccess(response) {
//   STEPS.removeStep_steps();
//   return {
//     type: CST.WELCOME_PLAN_SUCCESS,
//     isFetching: false,
//     payload: response
//   }
// }
//
// export function saveTheme__unused(vals) {
//   return function(dispatch) {
//     dispatch(saveThemeRequest());
//     axios.put(`${CST.LOGIN_URL}/profile`, vals, { withCredentials: true })
//     .then((response) => {
//       dispatch(saveThemeSuccess());
//     })
//     .catch((err) => {
//       dispatch(welcomeFailure(err));
//     })
//   }
// }
//
// export function saveTheme(id, user) {
//   let hostname = user.site.subdomainName + '.toitoi.co';
//   return function(dispatch) {
//     dispatch(themeSelection());
//     let req = {
//       presetId: id,
//       hostname: hostname
//     };
//     axios.post(`${CST.LOGIN_URL}/generate-signed-request/preset`, req, { withCredentials: true })
//     .then((response) => {
//       let signedRequest = response.data.signedRequest;
//       console.log('save theme:', response);
//       dispatch(saveThemeRequest(response));
//       webSocket.send(JSON.stringify({
//         'site': hostname,
//         'messageType': 'preset',
//         'signedRequest': signedRequest
//       }));
//       webSocket.onerror = function(error) {
//         console.log('WebSocket Error:', error);
//         dispatch(saveThemeFailure(error));
//       }
//       webSocket.onmessage = function(evt) {
//         console.log('WebSocket event:', evt);
//         console.log('WebSocket Message:', evt.data);
//         if (evt.data.messageType === 'done') {
//           dispatch(saveThemeSuccess(evt.data));
//           browserHistory.push('/welcome/plan');
//         } else {
//           dispatch(welcomeFailure(evt.data.message));
//         }
//       }
//
//     })
//     .catch((error) => {
//       console.log('themes error:', error);
//       /* error object structured as
//       { config: Object
//       data: Object
//       headers: Object
//       status: 405
//       statusText: "Method Not Allowed" }
//       */
//       dispatch(welcomeFailure(error.data.message));
//     });
//   }
// }
//
//
//
// function saveThemeRequest(response) {
//   return {
//     type: CST.WELCOME_THEME_REQUEST,
//     isFetching: true
//   }
// }
//
// function saveThemeSuccess(response) {
//   STEPS.setStep(2);
//   return {
//     type: CST.WELCOME_THEME_SUCCESS,
//     isFetching: false,
//     payload: response
//   }
// }

function welcomeFailure(errorMsg) {
  return {
    type: CST.WELCOME_FAILURE,
    isFetching: false,
    payload: errorMsg
  }
}
