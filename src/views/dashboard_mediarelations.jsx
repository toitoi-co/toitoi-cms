'use strict';

import React from 'react';
import classnames from 'classnames';

require ('../scss/views/dashboard_mediarelations.scss');

const classes = classnames('dashboard__mediarelations', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');

const DashboardMediaRelations = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.mediarelations_page_label}</h2>
        <div className="help"></div>
      </div>
    )
  }
});

export default DashboardMediaRelations;
