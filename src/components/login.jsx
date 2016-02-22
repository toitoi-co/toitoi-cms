import React, { Component } from 'react'
import classnames from 'classnames'
import auth from '../shared/auth'

require('./styles/login.scss')

const classes = classnames('login', {})

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: false
    }

    this.onUsernameInputChange = this.onUsernameInputChange.bind(this)
    this.onPasswordInputChange = this.onPasswordInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onUsernameInputChange(event) {
    this.setState({ username: event.target.value })
  }

  onPasswordInputChange(event) {
    this.setState({ password: event.target.value })
  }

  onFormSubmit(event) {
    event.preventDefault()
    // We need to go and fetch weather data
    // this.props.fetchWeather(this.state.term)
    // Now, let's clear out the input field to clean up the UI
    // this.setState({term: ''})
    console.log('password:', this.state.password)


    // from react-router example:
    // const email = this.refs.email.value
    // const pass = this.refs.pass.value

    auth.login(this.state.username, this.state.password, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    })
  }

  render() {
    return (
      <div className={classes}>
        <form ref="loginForm" onSubmit={this.onFormSubmit}>
          <div className="form-group">
          <label><input
            type="text"
            placeholder="joe@example.com"
            ref="email"
            value={this.state.username}
            onChange={this.onUsernameInputChange}/></label>
            <label><input
              type="password"
              placeholder="password"
              ref="pass"
              value={this.state.password}
              onChange={this.onPasswordInputChange}/></label>
            {/*(hint: password1)<br />*/}
          </div>
          {/*
          First time here?<br/>
          <label><input type="radio" name="newUser" value="yes" defaultChecked/><span>Yes</span></label><br/>
          <label><input type="radio" name="newUser" value="no"/><span>No</span></label><br/>*/}
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
}
