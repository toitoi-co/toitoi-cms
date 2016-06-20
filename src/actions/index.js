'use strict';

const imagesActions = require('./images');
const firebaseActions = require('./firebase');
const loginActions = require('./login');
const plansActions = require('./plans');
const publishActions = require('./publish');
const themesActions = require('./themes');
const welcomeActions = require('./welcome');

module.exports = Object.assign({},
  imagesActions,
  firebaseActions,
  loginActions,
  plansActions,
  publishActions,
  themesActions,
  welcomeActions
);
