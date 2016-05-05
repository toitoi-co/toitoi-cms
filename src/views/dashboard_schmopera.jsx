'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__schmopera', {});

require ('./styles/dashboard_schmopera.scss');

const DashboardSchmopera = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Schmopera page
      </div>
    )
  }
});

export default DashboardSchmopera;
