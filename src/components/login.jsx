import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { loginUser } from '../actions/index'
import { Link } from 'react-router'
import classnames from 'classnames'
require('./styles/login.scss')

const classes = classnames('login', {})

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: PropTypes.object
  };

  formSubmit(creds) {
    event.preventDefault()

    //test api call to local node jwt server
    // this.props.loginUser(creds)
    //   .then(() => {
    //     // console.log('props:',this.props)
    //     if (this.props.loginData.success) {
    //       // enable the following when rest of page is ready
    //       this.context.router.push('/dashboard')
    //     }
    //   })

    this.context.router.push('/dashboard')
  }

  render() {
    const { fields: { username, password }, handleSubmit, loginData } = this.props;
    return (
      <div className={classes}>
        <form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
          <div className="form-group">
            <label><input
              type="text"
              placeholder="joe@example.com"
              onChange={this.handleUsernameInputChange}
              {...username} /></label>
            <div className="text-help">
              {username.touched ? username.error:''}
            </div>
            <label><input
              type="password"
              placeholder="password"
              onChange={this.handlePasswordInputChange}
              {...password} /></label>
              <div className="text-help">
                {password.touched ? password.error:''}
              </div>
          </div>
          {/*
          First time here?<br/>
          <label><input type="radio" name="newUser" value="yes" defaultChecked/><span>Yes</span></label><br/>
          <label><input type="radio" name="newUser" value="no"/><span>No</span></label><br/>*/}
          <button type="submit">login</button>
        </form>
        {/*{this.renderSuccess(this.props)}*/}
        {this.props.loginData.token}

      </div>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.username) {
    errors.username = 'Enter your username'
  }
  if (!values.password) {
    errors.password = 'Enter your password.'
  }

  return errors
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'LoginForm', //name of the form, doesn't have to be same as component
  fields: ['username', 'password'],
  validate
},
state => ({ // mapStateToProps
  loginData: state.login
}),
{ loginUser })(Login)
