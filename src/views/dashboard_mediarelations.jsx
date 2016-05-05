'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__mediarelations', {});

require ('./styles/dashboard_mediarelations.scss');

const DashboardMediaRelations = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Media Relations page
      </div>
    )
  }
});

export default DashboardMediaRelations;
