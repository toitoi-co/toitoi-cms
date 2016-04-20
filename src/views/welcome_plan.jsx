import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

const WelcomePlan = React.createClass({
  // constructor(props) {
  //   super(props)
  //   // this.onInputChange = this.onInputChange.bind(this)
  //   // this.onFormSubmit = this.onFormSubmit.bind(this)
  // }

  render: function() {
    return (
      <div className={classes}>
        <h1>Step 3</h1>
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
