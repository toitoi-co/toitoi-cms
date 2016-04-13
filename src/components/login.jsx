'use strict';

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { loginUser, requestToken } from '../actions/login';
import { Link } from 'react-router';
import InputText from '../components/InputText';
import InputPassword from '../components/InputPassword';
import classnames from 'classnames';
import auth from '../shared/auth';
import messages from '../shared/messages';

require('./styles/login.scss');

const CST = require('../shared/constants');
const classes = classnames('login', {});

let Login = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    return {
      msg: messages,
      errorMsg: null
    };
  },

  formSubmit: function(creds) {
    this.props.loginUser(creds);
  },

  getTokenHandler: function() {
    this.props.requestToken();
  },

  componentDidUpdate: function() {
    if (this.props.loginData.auth && !this.props.loginData.token) {
      /* auth'ed against admin server but not yet against Firebase */
    }
    if (this.props.loginData.auth && this.props.loginData.token) {
      /* now auth'ed against both servers */
      // enable the following when rest of page is ready
      // auth.setToken(this.props.loginData.token);
      this.context.router.push('/dashboard');
    }
  },

  render: function() {
    const { fields, handleSubmit, loginData, error } = this.props;
    return (
      <div className={classes}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className="form-group">
            <InputText
              field={fields.email}
              id='login-email'
              label={this.state.msg.login_email_label}
              placeholder='joe@example.com'
            />
            <InputPassword
              field={fields.password}
              id='login-pwd'
              label={this.state.msg.login_password_label}
              placeholder=''
            />
          </div>
          <button type="submit">{this.state.msg.button_login}</button><br/><br/>
        </form>
        {this.props.loginData.error ? this.props.loginData.error.data.message:''}

      </div>
    )
  }
});

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = messages.error_email;
  }
  if (!values.password) {
    errors.password = messages.error_password;
  }
  return errors;
}

Login.propTypes = {
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
Login = reduxForm({
  form: 'LoginForm', //name of the form, doesn't have to be same as component
  fields: ['email', 'password'],
  validate
},
state => ({ // mapStateToProps
  loginData: state.login
}),
{ loginUser, requestToken })(Login)

export default Login;
