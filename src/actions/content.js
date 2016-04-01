'use strict';

const CST = require('../shared/constants');
// const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');
const axios = require('axios');

export function addImage(images) {
  return function(dispatch) {
    dispatch(imageUpload());
    // let image = images[0];
    let hostname = 'dev.toitoi.co';

    axios.put(`${CST.GENERATE_URL}/images/`, images, {
    // axios.get(`${CST.GENERATE_URL}/images/${hostname}`, {
      headers: {
        'X-Token': auth.getToken(),
        'Content-Type': images.type
        // 'Content-Type': 'multipart/form-data'
      },
      // withCredentials: true,
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
