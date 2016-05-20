'use strict';

module.exports = {

  setToken(token) {
    localStorage.token = token;
  },

  getToken() {
    return localStorage.token;
  },

  removeToken() {
    delete localStorage.token;
  },

}
