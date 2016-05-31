'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { confirmUser, reloadUser } from '../actions/index';
import classnames from 'classnames';

const obj = require('lodash/fp/object');
const classes = classnames('confirmation', {});
const settings = require('../shared/settings');
const CST = require('../shared/constants');

require ('./styles/confirmation.scss');

let Confirmation = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    return {
      hasConfirmationId: false,
      pageState: null
    }
  },

  componentWillMount: function() {
    /* from path /confirm/:confirmationID */
    var id = this.props.params.id;
    if (id) {
      this.setState({hasConfirmationId: true})
      this.props.confirmUser(id);
    } else if (!this.props.user) {
      /* Trying to access page without logging in */
      this.props.reloadUser();
    }
    this.assignPageState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.assignPageState(nextProps);
  },

  assignPageState(props) {
    console.log('has id:', this.state.hasConfirmationId);
    console.log('user check:', obj.has(props, 'user'));
    console.log('user:', props.user);

    // console.log('hasId, role:', this.state.hasConfirmationId, this.props.user.role)
    /* 4 states to page:
         1 - successful confirmation from e-mail,
         2 - failure with confirmation from e-mail,
         3 - logging in, already confirmed,
         4 - logging in, has not confirmed
    */

    if (this.state.hasConfirmationId && props.confirmed) {
      this.setState({pageState: 1});
      return;
    }
    if (this.state.hasConfirmationId && !props.confirmed) {
      this.setState({pageState: 2});
      return;
    }
    if (!this.state.hasConfirmationId && obj.has(props.user, 'role')) {
      if (props.user.role !== 'unconfirmed') {
        this.setState({pageState: 3});
        return
      } else  {
        this.setState({pageState: 4});
        return
      }
    }
  },

  continueHandler: function() {
    this.context.router.push('/welcome');
  },


  render: function() {
    /* states are listed in assignPageState */
    switch (this.state.pageState) {
      case 1:
        return(
          <div className={classes}>
            <h3>Confirmation page</h3>
            <p>Thanks for confirming your account. Watch your email for details about our launch in the near future.</p>
            {(settings.release===CST.MARKETING_LAUNCH) ?
              null : (<button onClick={this.continueHandler}>Next</button>)}
            <br/><br/>
          </div>
        )
        break;
      case 2:
        return(
          <div className={classes}>
            <h3>Confirmation page</h3>
            <p>We're sorry but we're having trouble confirming your account.</p>
            <p>Would you mind terribly contacting us at <a href="mailto:support@toitoi.co">support@toitoi.co</a> to help figure out what the issue may be?</p>
            {this.props.error ? this.props.error.data.message:''}
            <br/><br/>
          </div>
        )
        break;
      case 3:
        return(
          <div className={classes}>
            <h3>Confirmation page</h3>
            <p>Hi, there. Your account has already been confirmed. Watch your email for details about our launch in the near future.</p>
            {(settings.release===CST.MARKETING_LAUNCH) ?
              null : (<button onClick={this.continueHandler}>Next</button>)}
            <br/><br/>
          </div>
        )
        break;
      case 4:
        return(
          <div className={classes}>
            <h3>Confirmation page</h3>
            <p>Hi, there. Your account has not yet been confirmed. Please check your e-mail for the confirmation link.</p>
            {(settings.release===CST.MARKETING_LAUNCH) ?
              null : (<button onClick={this.continueHandler}>Next</button>)}
            <br/><br/>
          </div>
        )
        break;
      default:
        return null
        break;
    }
  }
});

function mapStateToProps(state) {
  return {
    confirmed: state.login.confirmed,
    error: state.login.error,
    user: state.login.user
  }
}

export default connect(mapStateToProps, { confirmUser, reloadUser })(Confirmation)
