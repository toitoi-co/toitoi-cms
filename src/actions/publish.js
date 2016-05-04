'use strict';

const CST = require('../shared/constants');
const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');


export function publishSite(user) {
  let hostname = user.site.subdomainName + '.toitoi.co';
  return function(dispatch) {
    dispatch(requestPublishSite());
    webSocketRef.send(JSON.stringify({
      'site': hostname,
      'token': auth.getToken(),
      'messageType': 'build'
    }));
    webSocketRef.onerror = function(error) {
      console.log('WebSocket Error:', error);
      dispatch(publishSiteFailure(error));
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
    payload: JSON.parse(response)
  }
}

function publishSiteFailure(response) {
  return {
    type: CST.PUBLISH_FAILURE,
    payload: JSON.parse(response)
  }
}

export function selectTheme() {
  return function(dispatch) {

  }
}
