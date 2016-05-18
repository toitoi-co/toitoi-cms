'use strict';

const CST = require('../shared/constants');
const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');

/* preview & publish flow:
   Preview: build site --> retrieve previewKey --> provide link to preview build
   Publish: publish (copy previewData to data node) --> build site */

export function publishSite(user) {
  let hostname = user.site.subdomainName + '.toitoi.co';
  return function(dispatch) {
    dispatch(requestPublishSite());
    webSocketRef.send(JSON.stringify({
      'site': hostname,
      'token': auth.getToken(),
      'messageType': 'publish'
    }));
    webSocketRef.onerror = function(error) {
      console.log('WebSocket Error:', error);
      dispatch(publishSiteFailure(error));
    }
    webSocketRef.onmessage = function(evt) {
      console.log('WebSocket Message:', evt.data);
      if (evt.data.messageType === 'done') {
        dispatch(buildSite(user, false));
      } else {
        dispatch(publishSiteFailure(evt.data.message));
      }
    }
  }
}

export function buildSite(user, preview) {
  let hostname = user.site.subdomainName + '.toitoi.co';
  return function(dispatch) {
    console.log('token:',auth.getToken());
    webSocketRef.send(JSON.stringify({
      'site': hostname,
      'token': auth.getToken(),
      'messageType': 'build',
      'preview': preview
    }));
    webSocketRef.onerror = function(error) {
      console.log('WebSocket Error:', error);
      if (preview) {
        dispatch(previewSiteFailure(error));
      } else {
        dispatch(publishSiteFailure(error));
      }
    }
    webSocketRef.onmessage = function(evt) {
      console.log('WebSocket Message:', evt.data);
      // dispatch(buildSite(user, true));
      if (preview) {
        dispatch(previewSiteSuccess(evt.data));
      } else {
        dispatch(publishSiteSuccess(evt.data));
      }

    }
  }
}

function requestPreviewSite() {
  return {
    type: CST.PREVIEW_REQUEST
  }
}

function previewSiteSuccess(response) {
  return {
    type: CST.PREVIEW_SUCCESS,
    payload: JSON.parse(response)
  }
}

function previewSiteFailure(response) {
  return {
    type: CST.PREVIEW_FAILURE,
    payload: JSON.parse(response)
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
