'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';
import { Link } from 'react-router';

let App = React.createClass({
  logoutHandler: function(event) {
    this.props.logoutUser();
  },

  render: function() {
    return (
      <div>
        <h1><Link to="/">App Component</Link></h1>
        <h4>Primary Nav:</h4>
        <ul>
          {/*<li><Link to="/dashboard/about">About</Link></li>*/}
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/themes">Themes</Link></li>
          <li><Link to="/welcome">Welcome</Link></li>
        </ul>
        <br/>
        {this.props.user ? <button onClick={this.logoutHandler}>Logout</button> : null}
        {this.props.children}
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
