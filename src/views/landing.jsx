'use strict';

import React from 'react';
import Login from './login';
import classnames from 'classnames';

const classes = classnames('landing', {});

require ('./styles/landing.scss');

const Landing = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h1>Landing page</h1>
        <Login />
      </div>
    )
  }
});

export default Landing;
