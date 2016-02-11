import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

export default class Welcome_1 extends Component {
  constructor(props) {
    super(props)
    // this.onInputChange = this.onInputChange.bind(this)
    // this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  render() {
    return (
      <div className={classes}>
        <h1>Step 1</h1>
        <h3>Welcome, set a password!</h3>
        <Link to="/welcome/2" className="btn btn-primary">
          Next
        </Link>
      </div>
    )
  }
}
