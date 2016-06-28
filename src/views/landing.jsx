'use strict';

import React from 'react';
import Login from './login';
import classnames from 'classnames';

require ('../scss/views/landing.scss');

const classes = classnames('landing', {});

const Landing = React.createClass({
  render: function() {
    return (
      <section className={classes}>
        {/*<div  className={classes}>*/}
        {/*<h1>Landing page</h1>*/}
          <Login />
        {/*</div>*/}
      </section>
    )
  }
});

export default Landing;
