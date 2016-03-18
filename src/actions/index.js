'use strict';

const loginActions = require('./login');
const firebaseActions = require('./firebase');
const publishActions = require('./publish');
const themesActions = require('./themes');

module.exports = Object.assign({},
  loginActions,
  firebaseActions,
  publishActions,
  themesActions
);
