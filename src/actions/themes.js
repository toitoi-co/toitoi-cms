'use strict';

const CST = require('../shared/constants');
const axios = require('axios');


export function getThemes() {
  return function(dispatch) {
    axios.get(`${CST.LOGIN_URL}/presets`, { withCredentials: true })
    .then((response) => {
      // console.log('themes response:', response);
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

export function selectTheme(id) {
  console.log('id', id);
  return function(dispatch) {
    dispatch(themeSelection());
    axios.post(`${CST.LOGIN_URL}/generate-signed-request/{id}`, null, { withCredentials: true })
    .then((response) => {
      console.log('themes response:', response);
      dispatch(themeSelectionSuccess(response));
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
      dispatch(themeSelectionFailure(error));
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
