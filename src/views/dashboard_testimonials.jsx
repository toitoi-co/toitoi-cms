'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__testimonials', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');


require ('./styles/dashboard_testimonials.scss');

const DashboardTestimonials = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.testimonials_page_label}</h2>
      </div>
    )
  }
});

export default DashboardTestimonials;
