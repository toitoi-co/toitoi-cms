'use strict';

const CST = require('../shared/constants');
import React from 'react';
import { connect } from 'react-redux';
import { getFirebaseData } from '../actions/index';
import classnames from 'classnames';
import auth from '../shared/auth';

require ('./styles/dashboard.scss');
const classes = classnames('dashboard', {});


const Dashboard = React.createClass({
  getInitialState: function() {
    return {};
    this.updateData = this.updateData.bind(this);
  },

  updateData: function(event) {
    event.preventDefault;
    this.props.getFirebaseData();
  },

  componentWillUpdate: function() {
    console.log('dashboardData:', this.props.dashboardData);
  },

  render: function() {
    console.log('props:', this.props);
    console.log('dashboardData:', this.props.dashboardData);
    if (!this.props.error && !this.props.dashboardData) {
      return (
        <div>
          Loading...<br/>
        <button onClick={this.updateData}>Get Data</button>
        </div>
      )
    }
    if (this.props.error) {
      return (
        <div className={classes}>
          Dashboard page
          <div>{this.state.error}</div>
        </div>
      );
    } else {
      return (
        <div className={classes}>
          Dashboard page<br/>
          {/*<div>{auth.getToken()}</div>*/}
          <div>{JSON.stringify(this.props.dashboardData)}</div>
        </div>
      );
    }
  }
});


function mapStateToProps(state) {
  console.log('state:', state);
  return { dashboardData: state.firebase.dashboardData };
}

export default connect(mapStateToProps, { getFirebaseData })(Dashboard);
