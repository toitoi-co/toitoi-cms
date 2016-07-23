'use strict';

import React from 'react';
import classnames from 'classnames';

require ('../scss/views/dashboard_social.scss');

const classes = classnames('dashboard__social', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');

const DashboardSocial = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.social_page_label}</h2>
        <div className="help"></div>
      </div>
    )
  }
});

export default DashboardSocial;
