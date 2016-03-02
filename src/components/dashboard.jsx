'use strict';

const React = require('react');
const classnames = require('classnames');
const classes = classnames('dashboard', {});

require ('./styles/dashboard.scss');


const Dashboard = React.createClass({
  render: function() {
    return (
      <div className={classes}>
        Dashboard page
      </div>
    );
  }
});

export default Dashboard;
