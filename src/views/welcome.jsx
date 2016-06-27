'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { reloadUser } from '../actions/index';
import classnames from 'classnames';

require ('../scss/views/welcome.scss');

const classes = classnames('welcome', {});

let Welcome = React.createClass({
  componentWillMount: function() {
    if (!this.props.user) {
      console.log('No data, get User and tokens')
      this.props.reloadUser();
    }
  },

  render: function() {
    if (!this.props.error && !this.props.user) {

      // TODO add conditional to see if user has completed onboard. If so, redirect to dashboard

      return (
        <div className={classes}>
          <p>Loading...</p>
          <br/><br/>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className={classes}>
          <h1>Welcome page</h1>
          {React.cloneElement(this.props.children, {
            imageToken: this.props.imageToken,
            token: this.props.token,
            user: this.props.user
          })}
        </div>
      );
    }
  }
});

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, { reloadUser })(Welcome)
