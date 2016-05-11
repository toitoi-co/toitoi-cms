'use strict';

const CST = require('../shared/constants');
const axios = require('axios');

export function saveSite(vals) {
  return function(dispatch) {
    dispatch(saveSiteRequest());
    axios.put(`${CST.LOGIN_URL}/site`, vals, { withCredentials: true })
    .then((response) => {
      dispatch(saveSiteSuccess());
      window.location = `${CST.CMS_URL}/welcome/theme`;
    })
    .catch((err) => {
      dispatch(welcomeFailure(err));
    })
  }
}

function saveSiteRequest(response) {
  return {
    type: CST.WELCOME_SITE_REQUEST,
    isFetching: true
  }
}

function saveSiteSuccess(response) {
  return {
    type: CST.WELCOME_SITE_SUCCESS,
    isFetching: false,
    payload: response
  }
}

export function savePlan(vals) {
  return function(dispatch) {
    dispatch(savePlanRequest());
    axios.put(`${CST.LOGIN_URL}/profile`, vals, { withCredentials: true })
    .then((response) => {
      dispatch(savePlanSuccess());
    })
    .catch((err) => {
      dispatch(welcomeFailure(err));
    })
  }
}

function savePlanRequest(response) {
  return {
    type: CST.WELCOME_PLAN_REQUEST,
    isFetching: true
  }
}

function savePlanSuccess(response) {
  return {
    type: CST.WELCOME_PLAN_SUCCESS,
    isFetching: false,
    payload: response
  }
}

export function saveTheme(vals) {
  return function(dispatch) {
    dispatch(saveThemeRequest());
    axios.put(`${CST.LOGIN_URL}/profile`, vals, { withCredentials: true })
    .then((response) => {
      dispatch(saveThemeSuccess());
    })
    .catch((err) => {
      dispatch(welcomeFailure(err));
    })
  }
}

function saveThemeRequest(response) {
  return {
    type: CST.WELCOME_THEME_REQUEST,
    isFetching: true
  }
}

function saveThemeSuccess(response) {
  return {
    type: CST.WELCOME_THEME_SUCCESS,
    isFetching: false,
    payload: response
  }
}

function welcomeFailure(err) {
  return {
    type: CST.WELCOME_FAILURE,
    isFetching: false,
    payload: err
  }
}
