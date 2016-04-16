'use strict';

import React from 'react';
import Login from '../components/login';
import classnames from 'classnames';

const classes = classnames('dashboard--landing', {});

require ('./styles/landing.scss');

const DashboardLanding = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        DashboardLanding page
      </div>
    )
  }
});

export default DashboardLanding;
