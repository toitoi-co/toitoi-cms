'use strict';

const CST = require('../shared/constants');
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getFirebaseData, updateSingleFirebaseData } from '../actions/index';
import classnames from 'classnames';
import auth from '../shared/auth';

require ('./styles/dashboard.scss');
const classes = classnames('dashboard', {});


let Dashboard = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    return { };
    this.updateData = this.updateData.bind(this);
  },

  formSubmit: function(entry) {
    event.preventDefault();
    // this.props.loginUser(creds);
    console.log('entry:', entry);
    this.props.updateSingleFirebaseData(entry);
  },

  updateData: function(event) {
    event.preventDefault;
    this.props.getFirebaseData();
  },

  logout: function(event) {
    event.preventDefault;
    auth.logout();
    this.context.router.push('/');
  },

  componentWillUpdate: function() {
    // console.log('dashboardData:', this.props.dashboardData);
  },

  componentWillReceiveProps: function() {
  },


  render: function() {
    const { fields: { key, name, description }, entryKey, handleSubmit, dashboardData, error, updated } = this.props;

    if (!this.props.error && !this.props.dashboardData) {
      return (
        <div>
          {/*Loading...<br/>*/}
        <button onClick={this.updateData}>Get Data</button><br/><br/>
        <button onClick={this.logout}>Logout</button><br/><br/>
        </div>
      )
    }
    if (this.props.error) {
      return (
        <div className={classes}>
          Dashboard page
          <div>{this.props.error}</div>
        </div>
      );
    } else {
      return (
        <div className={classes}>
          Dashboard page<br/>
          <div>{JSON.stringify(this.props.dashboardData)}</div>
        <form onSubmit={handleSubmit(this.formSubmit)} onFocus={() => {
            this.props.fields.key.onChange(this.props.entryKey);
          }}>
            <div className="form-group">
              <label>Name<br/><input
                type="text"
                value={this.props.dashboardData.name}
                onChange=''
                {...name} /></label>
              <div className="text-help">
                {/*{name.touched ? name.error:''}*/}
              </div>
              <label>Description<br/><textarea
                type="text"
                value={this.props.dashboardData.description}
                onChange=''
                {...description} /></label>
                <div className="text-help">
                  {/*{description.touched ? description.error:''}*/}
                  {dashboardData.error}
                </div>
            </div>
            <button type="submit">Update Data</button><br/><br/>
          <div>{ this.props.updated ? 'Saved!' : '' }</div>
          </form>
        </div>
      );
    }
  }
});

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Enter a title';
  }
  if (!values.description) {
    errors.description = 'Enter a description.';
  }

  return errors;
}

function mapStateToProps(state) {
  // console.log('state:', state);
  if (state.firebase.updated) {
    let thisKey = Object.keys(state.firebase.dashboardData)[0];
    return { entryKey: thisKey, dashboardData: state.firebase.dashboardData[thisKey], updated: state.firebase.updated };
  }

  if (state.firebase.error) {
    return { error: state.firebase.error }
  }

  if (state.firebase.dashboardData) {
    let thisKey = Object.keys(state.firebase.dashboardData)[0];
    return { entryKey: thisKey, dashboardData: state.firebase.dashboardData[thisKey] };
  }
}
//
// export default connect(mapStateToProps, { getFirebaseData, updateSingleFirebaseData })(Dashboard);


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
Dashboard = reduxForm({
  form: 'DashboardForm', //name of the form, doesn't have to be same as component
  fields: ['key', 'name', 'description'],
  // validate
},
mapStateToProps,
{ getFirebaseData, updateSingleFirebaseData })(Dashboard)

export default Dashboard;
