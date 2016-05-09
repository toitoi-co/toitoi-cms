'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__gallery', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');


require ('./styles/dashboard_gallery.scss');

const DashboardGallery = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.gallery_page_label}</h2>
      </div>
    )
  }
});

export default DashboardGallery;
