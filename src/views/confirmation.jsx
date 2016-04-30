'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmUser } from '../actions/index';
import classnames from 'classnames';

const classes = classnames('confirmation', {});

require ('./styles/confirmation.scss');

let Confirmation = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  componentWillMount: function() {
    /* from path /confirm/:confirmationID */
    var id = this.props.params.id;
    console.log('id:', id);
    this.props.confirmUser(id)
  },

  continueHandler: function() {
    this.context.router.push('/welcome');
  },

  render: function() {
    const { login } = this.props;
    console.log('login props:', this.props);
    if (this.props.login.loggedIn) {
      return (
        <div className={classes}>
          <h3>Confirmation page</h3>
          <p>Thanks for confirming your account.</p>
          <button onClick={this.continueHandler}>Next</button><br/><br/>
        </div>
      )
    } else {
      return (
        <div className={classes}>
          <h3>Confirmation page</h3>
          <p>Sorry, we couldn't confirm your account.</p>
          {this.props.login.error ? this.props.login.error.data.message:''}
        </div>
      )
    }
  }
});

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, { confirmUser })(Confirmation)
