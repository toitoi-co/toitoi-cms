'use strict';

module.exports = {
  // Marketing phase only?
  MARKETING_LAUNCH: 'marketing_launch',
  PHASE1_LAUNCH:    'phase1_launch',
  UNRESTRICTED:     'no_launch_restrictions',

  // Content
  IMAGE_UPLOAD_REQUEST: 'image_upload_request',
  IMAGE_UPLOAD_SUCCESS: 'image_upload_success',
  IMAGE_UPLOAD_ERROR: 'image_upload_error',

  // CMS
  CMS_URL: getHostURL() + ':4000',

  // Login and Auth
  // LOGIN_URL: 'http://localhost:3000',
  LOGIN_URL:              getHostURL() + ':3000',
  CONFIRM_USER_SUCCESS:   'confirm_user_success',
  CONFIRM_USER_FAILURE:   'confirm_user_failure',
  LOGIN_REQUEST:          'login_request',
  LOGIN_SUCCESS:          'login_success',
  LOGIN_FAILURE:          'login_failure',
  TOKEN_REQUEST:          'token_request',
  TOKEN_SUCCESS:          'token_success',
  TOKEN_FAILURE:          'token_failure',
  FIREBASE_AUTH_REQUEST:  'firebase_auth_request',
  FIREBASE_AUTH_SUCCESS:  'firebase_auth_success',
  FIREBASE_AUTH_FAILURE:  'firebase_auth_failure',
  LOGOUT_REQUEST:         'logout_request',
  LOGOUT_SUCCESS:         'logout_success',
  RETURN_USER:            'return_user',

  // Passwords
  RESET_PASSWORD_SUCCESS: 'password_reset_success',
  RESET_PASSWORD_FAILURE: 'password_reset_failure',

  // Welcome or onboard flow
  WELCOME_SITE_REQUEST:   'site_request',
  WELCOME_SITE_SUCCESS:   'site_success',
  WELCOME_PLAN_REQUEST:   'plan_request',
  WELCOME_PLAN_SUCCESS:   'plan_success',
  WELCOME_THEME_REQUEST:  'theme_request',
  WELCOME_THEME_SUCCESS:  'theme_success',
  WELCOME_FAILURE:        'welcome_failure',

  // Database
  FIREBASE_URL:     'https://toitoidev.firebaseio.com/buckets/',
  FIREBASE_REQUEST: 'firebase_request',
  FIREBASE_RECEIVE: 'firebase_receive',
  FIREBASE_SAVE:    'firebase_save',
  FIREBASE_UPDATE:  'firebase_update',
  FIREBASE_FAILURE: 'firebase_failure',

  // Image requests/queries
  IMAGES_URL:           getHostURL() + ':6557',
  IMAGE_UPLOAD_REQUEST: 'image_upload_request',
  IMAGE_UPLOAD_SUCCESS: 'image_upload_success',
  IMAGE_UPLOAD_FAILURE: 'image_upload_failure',
  IMAGE_TOKEN_REQUEST:  'image_token_request',
  IMAGE_TOKEN_SUCCESS:  'image_token_success',
  IMAGE_TOKEN_FAILURE:  'image_token_failure',


  // Generate & Images
  // GENERATE_URL: 'http://localhost:6557',
  GENERATE_URL: getHostURL() + ':6557',

  // Themes
  THEMES_REQUEST:           'themes_request',
  THEMES_REQUEST_SUCCESS:   'themes_request_success',
  THEMES_REQUEST_FAILURE:   'themes_request_failure',
  THEME_SELECTION:          'theme_selection',
  THEME_SELECTION_SUCCESS:  'theme_selection_success',
  THEME_SELECTION_FAILURE:  'theme_selection_failure',

  // User
  USER_STORED: 'user_stored',

  // WebSocket
  // WEBSOCKET_URL: 'ws://localhost:6557/ws',
  WEBSOCKET_URL:    'ws://' + window.location.hostname + ':6557/ws',
  PREVIEW_REQUEST:  'preview_request',
  PREVIEW_SUCCESS:  'preview_success',
  PREVIEW_FAILURE:  'preview_failure',
  PUBLISH_REQUEST:  'publish_request',
  PUBLISH_SUCCESS:  'publish_success',
  PUBLISH_FAILURE:  'publish_failure'
}

function getHostURL() {
  var http = location.protocol;
  var slashes = http.concat('//');
  return slashes.concat(window.location.hostname);
}
