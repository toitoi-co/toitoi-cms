'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__testimonials', {});

require ('./styles/dashboard_testimonials.scss');

const DashboardTestimonials = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Testimonials page
      </div>
    )
  }
});

export default DashboardTestimonials;
