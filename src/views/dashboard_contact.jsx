'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('dashboard__about', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');


require ('./styles/dashboard_contact.scss');

const DashboardContact = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h2>{MSG.contact_page_label}</h2>
      </div>
    )
  }
});

export default DashboardContact;
