'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__landing', {});

require ('./styles/dashboard_landing.scss');

const DashboardLanding = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Dashboard Landing page
      </div>
    )
  }
});

export default DashboardLanding;
