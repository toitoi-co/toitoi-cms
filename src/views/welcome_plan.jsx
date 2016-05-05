import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

const WelcomePlan = React.createClass({

  render: function() {
    return (
      <div className={classes}>
        <h2>Step 3</h2>
        <h3>Select your plan</h3>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <Link to="/" className="btn btn-primary">
          Finish
        </Link>
      </div>
    )
  }
});

export default WelcomePlan;
