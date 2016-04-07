'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('input-password', {});

require ('./styles/input.scss');

const InputPassword = React.createClass({
  componentDidMount: function() {
    console.log(this.props);
  },

  render: function() {
    return (
      <div className={classes}>
        <input type='password' placeholder={this.props.placeholder} value={this.props.value}/>
      </div>
    )
  }
});

export default InputPassword;
