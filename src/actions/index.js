'use strict';

const contentActions = require('./content');
const firebaseActions = require('./firebase');
const loginActions = require('./login');
const publishActions = require('./publish');
const themesActions = require('./themes');

module.exports = Object.assign({},
  contentActions,
  firebaseActions,
  loginActions,
  publishActions,
  themesActions
);
