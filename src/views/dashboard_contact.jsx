'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__contact', {});

require ('./styles/dashboard_contact.scss');

const DashboardContact = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Contact page
      </div>
    )
  }
});

export default DashboardContact;
