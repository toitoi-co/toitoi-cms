'use strict';

import React from 'react'
import classnames from 'classnames';
const classes = classnames('welcome', {});

require ('./styles/welcome.scss');

const Welcome = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Welcome page
        {this.props.children}
      </div>
    );
  }
});

export default Welcome;
