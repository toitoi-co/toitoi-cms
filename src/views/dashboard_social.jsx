'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__social', {});

require ('./styles/dashboard_social.scss');

const DashboardSocial = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Social page
      </div>
    )
  }
});

export default DashboardSocial;
