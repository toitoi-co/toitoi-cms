'use strict';

const CST = require('../shared/constants');
// const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');
const axios = require('axios');

export function addImage(images, site) {
  console.log('site', site);
  return function(dispatch) {
    dispatch(imageUpload());
    let hostname = 'demo.toitoi.co';

    axios.put(`${CST.GENERATE_URL}/images/${site}/${images[0].name}`, images[0], {
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
