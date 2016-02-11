import React, { Component } from 'react'
import Login from '../containers/login'
import classnames from 'classnames'

require ('./styles/landing.scss')

const classes = classnames('landing', {})

export default class Landing extends Component {
  render() {
    return (
      <div className={classes}>
        Landing page
        <Login />
      </div>
    )
  }
}
