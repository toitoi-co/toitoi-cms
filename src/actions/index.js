'use strict';

const loginActions = require('./login');
const firebaseActions = require('./firebase');
const publishActions = require('./publish');

module.exports = Object.assign({},loginActions, firebaseActions);
