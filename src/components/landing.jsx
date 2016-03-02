import React, { Component } from 'react'
import Login from './login'
import classnames from 'classnames'

require ('./styles/landing.scss')
//
const classes = classnames('landing', {})
//
// export default class Landing extends Component {
//   render() {
//     return (
//       <div className={classes}>
//         Landing page
//         <Login />
//       </div>
//     )
//   }
// }
//
//
// 'use strict';
//
// const React = require('react');
// const Login = require('./login');
// const classnames = require('classnames');
// const classes = classnames('landing', {});

// require ('./styles/landing.scss');


const Landing = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Landing page
        <Login />
      </div>
    )
  }
});

export default Landing;
