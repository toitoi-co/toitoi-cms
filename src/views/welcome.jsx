'use strict';

import React from 'react'
import { connect } from 'react-redux';
import classnames from 'classnames';

const classes = classnames('welcome', {});

require ('./styles/welcome.scss');

let Welcome = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        <h1>Welcome page</h1>
        {/*{this.props.children}*/}
        {React.cloneElement(this.props.children, {
          imageToken: this.props.imageToken,
          token: this.props.token,
          user: this.props.user
        })}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps, {})(Welcome)
