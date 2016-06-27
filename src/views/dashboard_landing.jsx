'use strict';

import React from 'react';
import classnames from 'classnames';

require ('../scss/views/dashboard_landing.scss');

const classes = classnames('dashboard__landing', {});

const DashboardLanding = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>Dashboard Landing page</h2>
      </div>
    )
  }
});

export default DashboardLanding;
