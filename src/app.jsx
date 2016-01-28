import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import TestComponent from './components/jsx/test-component'
import auth from './shared/auth'

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/password-reset'>Password Reset</Link></li>
          <li><Link to='/test-view'>Test View</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const Login = React.createClass({
  render() {
    return <h3>Login</h3>
  }
})

const PasswordReset = React.createClass({
  render() {
    return <h3>Password Reset</h3>
  }
})

const TestView = React.createClass({
  render() {
    return <TestComponent/>
  }
})



render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={Login} />
      <Route path='password-reset' component={PasswordReset} />
      <Route path='test-view' component={TestView} />
    </Route>
  </Router>
), document.getElementById('app'))
