import React, { Component } from 'react'
import classnames from 'classnames'

require ('./styles/welcome.scss')

const classes = classnames('welcome', {})

export default class Welcome extends Component {
  constructor(props) {
    super(props)

    this.state = { step: 1 }

    // this.onInputChange = this.onInputChange.bind(this)
    // this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  render() {
    return (
      <div className={classes}>
        Welcome page
        {this.props.children}
      </div>
    )
  }
}
