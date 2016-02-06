import React, { Component } from 'react'
import classnames from 'classnames'

require('../styles/es6-component.scss')

let classes = classnames('sample-component', {
  // no conditional classes yet - docs at https://www.npmjs.com/package/classnames
});

class SampleComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    return (
      <p className={classes}>
        Sample ES6 component
      </p>
    )
  }
}

export default SampleComponent
