'use strict';

import React, { PropTypes } from 'react';
import Heading from './Heading';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';
import { Link } from 'react-router';
import WebFont from 'webfontloader';

const CST = require('../shared/constants');
const MSG = require('../shared/messages');

WebFont.load({
  typekit: {
    id: 'rlx6qzw'
  }
});


let App = React.createClass({
  logoutHandler: function(event) {
    this.props.logoutUser();
  },

  render: function() {
    return (
      <div>
        {/*<h1><Link to="/">App Component</Link></h1>
        <h4>Primary Nav:</h4>
        <ul>
          <li><Link to="/dashboard/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/themes">Themes</Link></li>
          <li><Link to="/welcome">Welcome</Link></li>
        </ul>
        <br/>*/}
        <Heading user={this.props.user}/>
        {this.props.children}
        {/*{React.cloneElement(this.props.children, { msg: messages })*/}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, { logoutUser })(App)
