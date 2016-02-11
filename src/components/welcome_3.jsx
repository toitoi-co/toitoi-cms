import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

export default class Welcome_3 extends Component {
  constructor(props) {
    super(props)
    // this.onInputChange = this.onInputChange.bind(this)
    // this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  render() {
    return (
      <div className={classes}>
        <h1>Step 3</h1>
        <h3>Enter your bio!</h3>
        <Link to="/" className="btn btn-primary">
          Finish
        </Link>
      </div>
    )
  }
}
