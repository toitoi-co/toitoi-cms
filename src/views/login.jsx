'use strict';

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { loginUser, requestToken, getFirebaseData } from '../actions/index';
import { Link } from 'react-router';
import InputText from '../components/InputText';
import InputPassword from '../components/InputPassword';
import classnames from 'classnames';
// import auth from '../shared/auth';

require('./styles/login.scss');

const classes = classnames('login', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');

let Login = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    return {
      errorMsg: null,
      reCaptcha: null
    }
  },

  formSubmit: function(creds) {
    if (this.props.login.reCaptcha) {
      // creds.g-recaptcha-response = this.props.login.reCaptcha;
      // Object.defineProperty(creds, g-recaptcha-response, withValue(this.props.login.reCaptcha));
      creds['g-recaptcha-response'] = this.state.reCaptcha;
    }
    this.props.loginUser(creds);
  },

  getTokenHandler: function() {
    this.props.requestToken();
  },

  onChange: function(value) {
    console.log("Captcha value:", value);
    this.setState({
      reCaptcha: value
    })
  },

  componentDidUpdate: function() {
    // console.log('this.props:', this.props)
    if (this.props.login.loggedIn && !this.props.login.token) {
      /* auth'ed against admin server but not yet against Firebase. Check to see
         whether user is confirmed before making Firebase auth request. */
      if (!this.props.login.user.onboardingFlowCompleted) {

        console.log('site:', this.props.login.user.site);
        if (!this.props.login.user.site) {
          let site = this.props.login.user.site;
          /* If plan has been selected go to last step, otherwise
             check to see if subdomainName exists then go to step 2.
             Default to step 1 if all else fails. */
          if (site.planId) {
            this.context.router.push('/welcome/theme');
          } else if (site.subdomainName) {
            this.context.router.push('/welcome/plan');
          } else {
            this.context.router.push('/welcome');
          }
        } else {
          this.context.router.push('/welcome');
        }
      } else {
        // console.log('get firebase data');
        this.props.getFirebaseData(this.props.login.user);
      }
    }
    if (this.props.login.loggedIn && this.props.login.token) {
      /* now auth'ed against both servers */
      if (this.props.login.user.onboardingFlowCompleted) {
        this.context.router.push('/dashboard');
      }
    }
  },

  render: function() {
    const { fields, handleSubmit, login } = this.props;
    return (
      <div className={classes}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className="form-group">
            <InputText
              field={fields.email}
              id='login-email'
              label={MSG.login_email_label}
              placeholder='joe@example.com'
            />
            <InputPassword
              field={fields.password}
              id='login-pwd'
              label={MSG.login_password_label}
              placeholder=''
            />
          </div>
          {this.props.login.reCaptcha ?
            <ReCAPTCHA
              ref='recaptcha'
              sitekey='6LcZgSATAAAAANy30TLKDmmBsjVWJ-PHG8OtidI4'
              onChange={this.onChange}
            /> : null
          }

          <button type="submit">{MSG.button_login}</button><br/><br/>
        </form>
        {this.props.login.error ? this.props.login.error.data.message:''}
      </div>
    )
  }
});

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = MSG.error_email;
  }
  if (!values.password) {
    errors.password = MSG.error_password;
  }
  return errors;
}

Login.propTypes = {
};

/* connect: first argument is mapStateToProps, 2nd is mapDispatchToProps */
/* reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps */
Login = reduxForm({
  form: 'LoginForm', //name of the form, doesn't have to be same as component
  fields: ['email', 'password'],
  validate
},
state => ({ // mapStateToProps
  login: state.login
}),
{ loginUser, requestToken, getFirebaseData })(Login)

export default Login;
