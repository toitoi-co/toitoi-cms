'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('input-email', {});

require ('../scss/components/input.scss');

const inputEmail = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <input type="text"/>
      </div>
    )
  }
});

export default inputEmail;
