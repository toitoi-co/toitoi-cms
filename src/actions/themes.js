'use strict';

const CST = require('../shared/constants');
const axios = require('axios');
const webSocket = new WebSocket(CST.WEBSOCKET_URL);


export function getThemes() {
  return function(dispatch) {
    axios.get(`${CST.LOGIN_URL}/presets`, { withCredentials: true })
    .then((response) => {
      console.log('themes response:', response);
      dispatch(themesRequestSuccess(response.data));
    })
    .catch((error) => {
      // console.log('themes error:', error);
      dispatch(themesRequestFailure(error));
    });
  }
}

function themesRequest() {
  return {
    type: CST.THEMES_REQUEST,
    isFetching: true
  }
}

function themesRequestSuccess(response) {
  return {
    type: CST.THEMES_REQUEST_SUCCESS,
    isFetching: false,
    payload: response,
  }
}

function themesRequestFailure(response) {
  return {
    type: CST.THEMES_REQUEST_FAILURE,
    isFetching: false,
    payload: response
  }
}

export function selectTheme(id, site) {
  console.log('id, site:', id, site);
  return function(dispatch) {
    dispatch(themeSelection());
    let req = {
      presetId: id,
      //need to get hostname dynamically
      hostname: site
    };
    axios.post(`${CST.LOGIN_URL}/generate-signed-request/preset`, req, { withCredentials: true })
    .then((response) => {
      let signedRequest = response.data.signedRequest;
      console.log('themes response:', response);
      dispatch(themeSelectionSuccess(response));


      webSocket.send(JSON.stringify({
        'site': site,
        'messageType': 'preset',
        'token': signedRequest
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
      console.log('themes error:', error);
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
    type: CST.THEME_SELECTION,
    isFetching: true
  }
}

function themeSelectionSuccess(response) {
  return {
    type: CST.THEME_SELECTION_SUCCESS,
    isFetching: false,
    payload: response,
  }
}

function themeSelectionFailure(response) {
  return {
    type: CST.THEME_SELECTION_FAILURE,
    isFetching: false,
    payload: response
  }
}
