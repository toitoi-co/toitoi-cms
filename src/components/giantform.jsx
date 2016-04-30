'use strict';

import React from 'react'
import classnames from 'classnames';
const classes = classnames('giantform', {});

require ('./styles/welcome.scss');

const GiantForm = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <header>
          <h1>Page Layout</h1>
          <section>
            This section will let you customize a few things on your site. Don't go wild, we've already done a lot of work for you to make your site super pretty, so we're only giving you a few options.
          </section>
        </header>

        <form>
            <fieldset>
                <label>Much wow, big form</label>

            </fieldset>
        </form>
      </div>
    );
  }
});

export default GiantForm;
