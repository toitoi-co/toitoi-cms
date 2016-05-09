'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__about', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');


require ('./styles/dashboard_mediarelations.scss');

const DashboardMediaRelations = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.mediarelations_page_label}</h2>
      </div>
    )
  }
});

export default DashboardMediaRelations;
