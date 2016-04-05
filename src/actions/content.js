'use strict';

const CST = require('../shared/constants');
// const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');
const axios = require('axios');

export function addImage(images, user) {
  let hostname = user.site.subdomainName + '.toitoi.co';
  console.log('site', hostname);
  return function(dispatch) {
    dispatch(imageUpload());
    axios.put(`${CST.GENERATE_URL}/images/${hostname}/${images[0].name}`, images[0], {
    // axios.get(`${CST.GENERATE_URL}/images/${hostname}`, {
      headers: {
        'X-Token': auth.getToken(),
      },
      progress: function(progressEvent) {
        console.log('upload:', progressEvent);
      }
    })
    .then((response) => {
      console.log('upload response:', response);
      // dispatch(imageUploadSuccess(response));
    })
    .catch((error) => {
      // console.log('upload error:', error);
      dispatch(imageUploadError(error));
    });
  }
}

function imageUpload() {
  return {
    type: CST.IMAGE_UPLOAD_REQUEST,
    fetching: true
  }
}

function imageUploadSuccess(response) {
  return {
    type: CST.IMAGE_UPLOAD_SUCCESS,
    fetching: false,
    payload: response
  }
}

function imageUploadError(response) {
  return {
    type: CST.IMAGE_UPLOAD_ERROR,
    fetching: false,
    payload: response
  }
}
