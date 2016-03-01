import React, { Component } from 'react'
import classnames from 'classnames'

require ('./styles/dashboard.scss')

const classes = classnames('dashboard', {})

export default class Landing extends Component {

  render() {
    return (
      <div className={classes}>
        Dashboard page
      </div>
    )
  }
}
