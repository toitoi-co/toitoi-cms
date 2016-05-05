'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__gallery', {});

require ('./styles/dashboard_gallery.scss');

const DashboardGallery = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Gallery page
      </div>
    )
  }
});

export default DashboardGallery;
