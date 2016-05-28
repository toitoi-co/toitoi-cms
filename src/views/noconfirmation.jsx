'use strict';

import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

const classes = classnames('confirmation', {});
const settings = require('../shared/settings');

require ('./styles/confirmation.scss');

let NoConfirmation = React.createClass({
  render: function() {
    const { } = this.props;
    console.log('Launch phase:', settings.release);
    return (
      <div className={classes}>
        <h3>Unconfirmed</h3>
      <p>Looks like you haven't confirmed your account yet. Please check your e-mail again for the confirmation link. </p>
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, { })(NoConfirmation)
