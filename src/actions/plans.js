'use strict';

const CST = require('../shared/constants');
const STEPS = require('../shared/welcome_steps');
const axios = require('axios');
const webSocket = new WebSocket(CST.WEBSOCKET_URL);


export function getPlans() {
  return function(dispatch) {
    axios.get(`${CST.LOGIN_URL}/presets`, { withCredentials: true })
    .then((response) => {
      console.log('plans response:', response);
      dispatch(plansRequestSuccess(response.data));
    })
    .catch((error) => {
      // console.log('plans error:', error);
      dispatch(plansRequestFailure(error));
    });
  }
}

function plansRequest() {
  return {
    type: CST.PLANS_REQUEST,
    isFetching: true
  }
}

function plansRequestSuccess(response) {
  return {
    type: CST.PLANS_REQUEST_SUCCESS,
    isFetching: false,
    payload: response,
  }
}

function plansRequestFailure(response) {
  return {
    type: CST.PLANS_REQUEST_FAILURE,
    isFetching: false,
    payload: response
  }
}

export function selectPlan(id, user, onboard) {
  let hostname = user.site.subdomainName + '.toitoi.co';
  return function(dispatch) {
    dispatch(themeSelection());
    let req = {
      presetId: id,
      hostname: hostname
    };
    axios.post(`${CST.LOGIN_URL}/generate-signed-request/preset`, req, { withCredentials: true })
    .then((response) => {
      let signedRequest = response.data.signedRequest;
      console.log('plans response:', response);
      dispatch(themeSelectionSuccess(response));
      webSocket.send(JSON.stringify({
        'site': site,
        'messageType': 'preset',
        'signedRequest': signedRequest
      }));
      webSocket.onerror = function(error) {
        console.log('WebSocket Error:', error);
        dispatch(publishSiteError(error));
      }
      webSocket.onmessage = function(evt) {
        console.log('WebSocket Message:', evt.data);
        dispatch(themeSelectionSuccess(evt.data));
      }

    })
    .catch((error) => {
      console.log('plans error:', error);
      /* error object structured as
      { config: Object
      data: Object
      headers: Object
      status: 405
      statusText: "Method Not Allowed" }
      */
      dispatch(themeSelectionFailure(error.data));
    });
  }
}

function themeSelection() {
  return {
    type: CST.PLAN_SELECTION,
    isFetching: true
  }
}

function themeSelectionSuccess(response) {
  return {
    type: CST.PLAN_SELECTION_SUCCESS,
    isFetching: false,
    payload: response,
  }
}

function themeSelectionFailure(response) {
  return {
    type: CST.PLAN_SELECTION_FAILURE,
    isFetching: false,
    payload: response
  }
}

export function saveStripeToken(token) {
  return function(dispatch) {
    axios.post(`${CST.LOGIN_URL}/stripe-token`, {token: token}, { withCredentials: true })
    .then((response) => {
      console.log('save token response:', response);
      // dispatch(saveStripeTokenSuccess(response.data));


      /* temp placholder to set plan */
      let vals = {
        presetId: 3,
        planId: 2
      }
      axios.put(`${CST.LOGIN_URL}/site`, vals, { withCredentials: true })
        .then((response) => {
          console.info('save plan + preset response:', response);
        });


    })
    .catch((error) => {
      console.log('plans error:', error);
      /* error object structured as
      { config: Object
      data: Object
      headers: Object
      status: 405
      statusText: "Method Not Allowed" }
      */
      dispatch(themeSelectionFailure(error.data));
    });
  }
}

function saveStripeTokenSuccess(response) {
  return {
    type: CST.SAVE_STRIPE_TOKEN_SUCCESS,
    isFetching: false,
    payload: response
  }
}

function saveStripeTokenFailure(response) {
  return {
    type: CST.SAVE_STRIPE_TOKEN_FAILURE,
    isFetching: false,
    payload: response
  }
}
