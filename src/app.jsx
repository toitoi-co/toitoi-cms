// 'use strict';

// var React = require('react'); // apparently the babel-loader is broken and will not add this by itself
// var ReactDOM = require('react-dom');
//
// import Router from 'react-router';


import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import auth from './shared/auth'
import TestComponent from './components/jsx/test-component'

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
