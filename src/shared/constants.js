module.exports = {
  // Content
  IMAGE_UPLOAD_REQUEST: 'image_upload_request',
  IMAGE_UPLOAD_SUCCESS: 'image_upload_success',
  IMAGE_UPLOAD_ERROR: 'image_upload_error',

  // CMS
  CMS_URL: getHostURL() + ':4000',

  // Login and Auth
  // LOGIN_URL: 'http://localhost:3000',
  LOGIN_URL: getHostURL() + ':3000',
  LOGIN_REQUEST: 'login_request',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  TOKEN_REQUEST: 'token_request',
  TOKEN_SUCCESS: 'token_success',
  TOKEN_FAILURE: 'token_failure',
  FIREBASE_AUTH_REQUEST: 'firebase_auth_request',
  FIREBASE_AUTH_SUCCESS: 'firebase_auth_success',
  FIREBASE_AUTH_FAILURE: 'firebase_auth_failure',
  LOGOUT_REQUEST: 'logout_request',
  LOGOUT_SUCCESS: 'logout_success',
  RETURN_USER: 'return_user',

  // Database
  FIREBASE_URL: 'https://toitoidev.firebaseio.com/buckets/',
  FIREBASE_REQUEST: 'firebase_request',
  FIREBASE_RECEIVE: 'firebase_receive',
  FIREBASE_SAVE: 'firebase_save',
  FIREBASE_UPDATE: 'firebase_update',
  FIREBASE_FAILURE: 'firebase_failure',

  // Generate & Images
  // GENERATE_URL: 'http://localhost:6557',
  GENERATE_URL: getHostURL() + ':6557',

  // Themes
  THEMES_REQUEST: 'themes_request',
  THEMES_REQUEST_SUCCESS: 'themes_request_success',
  THEMES_REQUEST_FAILURE: 'themes_request_failure',
  THEME_SELECTION: 'theme_selection',
  THEME_SELECTION_SUCCESS: 'theme_selection_success',
  THEME_SELECTION_FAILURE: 'theme_selection_failure',

  // User
  USER_STORED: 'user_stored',

  // WebSocket
  // WEBSOCKET_URL: 'ws://localhost:6557/ws',
  WEBSOCKET_URL: 'ws://' + window.location.hostname + ':6557/ws',
  PUBLISH_REQUEST: 'publish_request',
  PUBLISH_SUCCESS: 'publish_success',
  PUBLISH_ERROR: 'publish_error'
}

function getHostURL() {
  var http = location.protocol;
  var slashes = http.concat('//');
  return slashes.concat(window.location.hostname);
}
