'use strict';

const CST = require('../shared/constants');
// const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');
const axios = require('axios');

export function uploadImage(images, user) {
  let hostname = user.site.subdomainName + '.toitoi.co';
  console.log('site', hostname);
  return function(dispatch) {
    dispatch(imageUpload());
    axios.put(`${CST.GENERATE_URL}/images/${hostname}/${images[0].name}`, images[0], {
      headers: {
        'X-Token': auth.getToken(),
      },
      progress: function(progressEvent) {
        console.log('upload:', progressEvent);
      }
    })
    .then((response) => {
      console.log(response);
      let imageData = {
        cms_url: response.data.url,
        cms_thumbnail_url: response.data.thumbnailUrl,
        fileSize: response.data.fileSize,
        height: response.data.height,
        resize_path: response.data.filename,
        url: response.data.siteUrl,
        width: response.data.width
      }
      console.log('upload response:', imageData);
      dispatch(imageUploadSuccess(imageData));
    })
    .catch((error) => {
      console.log('upload error:', error);
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
    type: CST.IMAGE_UPLOAD_FAILURE,
    fetching: false,
    payload: response
  }
}
