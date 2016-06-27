'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames';

require ('../scss/views/nomatch.scss');

const classes = classnames('no-match', {});

let NoMatch = React.createClass({
  clickHandler: function() {
    browserHistory.push('/');
  },

  render: function() {
    return (
      <div className={classes}>
        <h1>Page not found.</h1>
        <p>
          <button onClick={this.clickHandler}>Go to the main page.</button>
        </p>
      </div>
    );
  }
});

export default connect(null, null)(NoMatch)
