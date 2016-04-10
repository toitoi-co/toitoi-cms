'use strict';

import React from 'react';
import Login from '../components/login';
import classnames from 'classnames';

const classes = classnames('landing', {});

require ('./styles/landing.scss');

const Landing = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Landing page
        <Login />
      </div>
    )
  }
});

export default Landing;
