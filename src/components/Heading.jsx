'use strict';

import React from 'react';
import classnames from 'classnames';

const classes = classnames('heading', {});

require ('../scss/components/heading.scss');

let Heading = React.createClass({

  render: function() {
    return(
      <header className={classes}>
        {/*<h1 class="branding">toitoi.co - site in a box for classical musicians and opera performers</h1>*/}
        {/*<nav>
          <h2>Primary Navigation</h2>
          <a href="#about" class="skip">Skip to content</a>
          <ul>
            <li><a href="">Login</a></li>
            <!-- <li><a href="">Sign up</a></li> -->
          </ul>
        </nav>*/}
      </header>
    )
  }

});

export default Heading;
