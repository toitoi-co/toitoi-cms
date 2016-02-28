import React, { Component } from 'react'
import classnames from 'classnames'

require ('./styles/dashboard.scss')

const classes = classnames('dashboard', {})

export default class Landing extends Component {

  componentWillMount() {
    console.log('will props:', this.props)
  }

  componentDidMount() {
    console.log('did props:', this.props)
  }

  render() {
    return (
      <div className={classes}>
        Dashboard page
      </div>
    )
  }
}
