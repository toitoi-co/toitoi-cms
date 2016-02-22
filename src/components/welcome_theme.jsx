import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

export default class WelcomeTheme extends Component {
  constructor(props) {
    super(props)
    // this.onInputChange = this.onInputChange.bind(this)
    // this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  render() {
    return (
      <div className={classes}>
        <h1>Step 2</h1>
        <h3>Choose a theme!</h3>
        <Link to="/welcome/bio" className="btn btn-primary">
          Next
        </Link>
      </div>
    )
  }
}
