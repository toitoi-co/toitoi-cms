'use strict';

const CST = require('../shared/constants');
const webSocket = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');


export function publishSite(site) {
  return function(dispatch) {
    dispatch(requestPublishSite());
    webSocket.send(JSON.stringify({
      'site': site,
      'token': auth.getToken(),
      'messageType': 'build'
    }));
    webSocket.onerror = function(error) {
      console.log('WebSocket Error:', error);
      dispatch(publishSiteError(error));
    }
    webSocket.onmessage = function(evt) {
      console.log('WebSocket Message:', evt.data);
      dispatch(publishSiteSuccess(evt.data));
    }
  }
}

function requestPublishSite() {
  return {
    type: CST.PUBLISH_REQUEST
  }
}

function publishSiteSuccess(response) {
  return {
    type: CST.PUBLISH_SUCCESS,
    payload: response
  }
}

function publishSiteError(response) {
  return {
    type: CST.PUBLISH_ERROR,
    payload: response
  }
}

export function selectTheme() {
  return function(dispatch) {

  }
}
