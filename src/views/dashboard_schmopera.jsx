'use strict';

import React from 'react';
import classnames from 'classnames';

require ('../scss/views/dashboard_schmopera.scss');

const classes = classnames('dashboard__schmopera', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');

const DashboardSchmopera = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.schmopera_page_label}</h2>
      </div>
    )
  }
});

export default DashboardSchmopera;
