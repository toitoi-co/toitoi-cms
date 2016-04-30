'use strict';

import React from 'react'
import classnames from 'classnames';

const classes = classnames('giantform', {});

require ('./styles/welcome.scss');

const GiantForm = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h1>1.0 Configure your account</h1>

          <h2>1.1 Set a password</h2>
            <ol>
              <li>
                <label for="param_password">Password</label>
                <input type="password" name="password" id="param_password" />
              </li>
              <li>
                <label for="param_password_confirm">Confirm Password</label>
                <input type="password" name="password_confirm" id="param_password_confirm" />
              </li>
              <li>
                <p>Password strength indicator here</p>
              </li>
            </ol>

          <h2>1.2 Confirm your site name</h2>
            <ol>
              <li>
                <label for="param_site_name">Site Name</label>
                <input type="text" name="site_name" id="param_site_name" /><span>.toitoi.co</span>
              </li>
            </ol>
      </div>
    );
  }
});

export default GiantForm;
