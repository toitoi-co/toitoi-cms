'use strict';

const CST = require('../shared/constants');
import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { loginUser, requestToken } from '../actions/login';
import { Link } from 'react-router';
import classnames from 'classnames';
import auth from '../shared/auth';
import { FormattedMessage } from 'react-intl';
// import { IntlMixin } from 'react-intl';

require('./styles/login.scss');
const classes = classnames('login', {});

let Login = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  formSubmit: function(creds) {
    // event.preventDefault();
    this.props.loginUser(creds);
  },

  getTokenHandler: function() {
    // event.preventDefault();
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

  componentWillMount: function() {
    // console.log(IntlProvider('messages'));
  },

  render: function() {
    const { fields: { email, password }, handleSubmit, loginData } = this.props;
    return (
      <div className={classes}>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className="form-group">
            <label><input
              type="text"
              placeholder="joe@example.com"
              onChange={this.handleUsernameInputChange}
              {...email} /></label>
            <div className="text-help">
              {email.touched ? email.error:''}
            </div>
            <label><input
              type="password"
              placeholder="password"
              onChange={this.handlePasswordInputChange}
              {...password} /></label>
              <div className="text-help">
                {password.touched ? password.error:''}
                {loginData.error}
              </div>
          </div>
          {/*
          First time here?<br/>
          <label><input type="radio" name="newUser" value="yes" defaultChecked/><span>Yes</span></label><br/>
          <label><input type="radio" name="newUser" value="no"/><span>No</span></label><br/>*/}
          <button type="submit"><FormattedMessage id={'label_login'}/></button><br/><br/>
        </form>
        {/*{this.props.loginData.token}*/}

      </div>
    )
  }
});

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Enter your email';
  }
  if (!values.password) {
    errors.password = 'Enter your password.';
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
