'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';
import classnames from 'classnames';

const classes = classnames('heading', {});

require ('../scss/components/heading.scss');

let Heading = React.createClass({
  /* this.props.user coming from parent, App */

  logoutHandler: function(event) {
    this.props.logoutUser();
  },

  render: function() {
    return(
      <header className={classes}>
        {this.props.user ? <button onClick={this.logoutHandler}>Logout</button> : null}
      </header>
    )
  }

});

export default connect(null, { logoutUser })(Heading)
