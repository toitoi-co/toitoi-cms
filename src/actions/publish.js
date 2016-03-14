'use strict';

const CST = require('../shared/constants');
const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);


export function publishSite() {
  return function(dispatch) {
    dispatch(requestPublishSite());
    webSocketRef.send(JSON.stringify({
      'site': 'demo.toitoi.co',
      'token': auth.getToken(),
      'messageType': 'build'
    }));
    webSocketRef.onerror = function(error) {
      console.log('WebSocket Error:', error);
      dispatch(publishSiteError(error));
    }
    webSocketRef.onmessage = function(evt) {
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
