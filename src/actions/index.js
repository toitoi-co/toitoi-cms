'use strict';

const firebaseActions = require('./firebase');
const loginActions = require('./login');
const publishActions = require('./publish');
const themesActions = require('./themes');

module.exports = Object.assign({},
  firebaseActions,
  loginActions,
  publishActions,
  themesActions
);
