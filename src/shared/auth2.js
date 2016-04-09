'use strict';

const CST = require('../shared/constants');
// const webSocketRef = new WebSocket(CST.WEBSOCKET_URL);
const auth = require('../shared/auth');
const axios = require('axios');



module.exports = {
  checkAuth: function() {

    // static contextTypes = {
    //   router: PropTypes.object
    // };

    // status: 200
    axios.post(`${CST.LOGIN_URL}/generate-token`, null, { withCredentials: true })
    .then((response) => {
      console.log('login response:', response)
      return true;
      // if response.status is 401 -> user is not logged in, show login screen
    })
    .catch((err) => {
      // dispatch(loginFailure(err));
      // go to login page
      console.log('login response:', err)
      if (err.status === 401) {
        console.log('okay, show login');
        // this.context.router.push('/login')
        window.location = CST.CMS_URL + '/login';

      }
      return false;
    });
  }




}
