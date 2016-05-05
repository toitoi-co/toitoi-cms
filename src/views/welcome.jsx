'use strict';

import React from 'react'
import classnames from 'classnames';

const classes = classnames('welcome', {});

require ('./styles/welcome.scss');

const Welcome = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h1>Welcome page</h1>
        {this.props.children}
      </div>
    );
  }
});

export default Welcome;
