'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form'
import { resetPassword } from '../actions/index';
import InputText from '../components/InputText'
import messages from '../shared/messages';
import classnames from 'classnames';

const classes = classnames('password-reset', {});

require ('./styles/confirmation.scss');

let PasswordReset = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  componentWillMount: function() {
    /* from path /confirm/:confirmationID */
    var id = this.props.params.id;
    console.log('id:', id);
    if (id) {
      this.props.resetPassword(id)
    }
  },

  continueHandler: function() {
    this.context.router.push('/welcome');
  },

  render: function() {
    const { fields, login } = this.props;

    if (this.props.login.passwordReset) {
      return (
        <div className={classes}>
          <h3>Forgot your password?</h3>
          <p>The password reset has been sent. </p>
        </div>
      )
    } else {
      return (
        <div className={classes}>
          <h3>Forgot your password?</h3>
          <p>Enter your e-mail address to reset your password. Check your spam folder and make sure that you have not blocked no-reply@toitoi.co.</p>
          <InputText
            field={fields.email}
            id='reset-email'
            label=''
            placeholder='Email'
          />
          <button onClick={this.resetHandler}>Reset</button><br/><br/>
          {this.props.login.error ? this.props.login.error.data.message:''}
        </div>
      )
    }

  }
});

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = messages.error_email;
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

// export default connect(mapStateToProps, { resetPassword })(PasswordReset)



PasswordReset = reduxForm({
  form: 'PasswordResetForm', //name of the form, doesn't have to be same as component
  fields: ['email'],
  // fields,
  validate
},
mapStateToProps, { resetPassword })(PasswordReset)

export default PasswordReset;
