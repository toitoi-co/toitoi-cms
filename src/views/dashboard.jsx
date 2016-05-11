'use strict';

// const CST = require('../shared/constants');
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { getFirebaseData, requestImageToken, updateSingleFirebaseData, publishSite, logoutUser, reloadUser } from '../actions/index';
import classnames from 'classnames';
import auth from '../shared/auth';
// import auth2 from '../shared/auth2';
// import Dropzone from 'react-dropzone';

require ('./styles/dashboard.scss');
const classes = classnames('dashboard', {});
const MSG = require('../shared/messages');

let Dashboard = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    // this.updateData = this.updateData.bind(this);
    // this.props.getFirebaseData(this.props.user);
    // this.props.requestImageToken(this.props.user);
    return {
      images: []
    };
  },

  componentWillMount: function() {
    // console.log('props:', this.props);

    //TODO check if user and if onboardingflowcompleted otherwise return to login page

    if (!this.props.user) {
      // Could have lost current login info due to loss of connectivity or page refresh
      console.log('No data, get User and tokens')
      // this.props.checkAuth();
      this.props.reloadUser();
    }
    // if (this.props.token) {
    //   this.props.getFirebaseData(this.props.user);
    //   this.props.requestImageToken(this.props.user);
    // }
  },

  componentWillUpdate: function() {
  },

  componentWillReceiveProps: function() {
    // if (this.props.user && !this.props.preview) {
    //   this.props.getFirebaseData(this.props.user);
    //   this.props.requestImageToken(this.props.user);
    // }
  },

  formSubmit: function(entry) {
    console.log('entry:', entry);
    // this.props.updateSingleFirebaseData(entry, this.props.user, '/data/notablework');
  },

  getDataHandler: function(event) {
    this.props.getFirebaseData(this.props.user);
  },

  publishSiteHandler: function(event) {
    this.props.publishSite(this.props.user);
  },

  logoutHandler: function(event) {
    this.props.logoutUser();
    this.context.router.push('/');
  },

  render: function() {
    var links = (
      <div>
        <h4>Dashboard Nav:</h4>
        <ul>
          <li><Link to="/dashboard/about">About</Link></li>
          <li><Link to="/dashboard/social">Social Links</Link></li>
          <li><Link to="/dashboard/gallery">Gallery</Link></li>
          <li><Link to="/dashboard/mediarelations">Media Relations</Link></li>
          <li><Link to="/dashboard/testimonials">Testimonials</Link></li>
          <li><Link to="/dashboard/contact">Public Contact Information</Link></li>
          <li><Link to="/dashboard/schmopera">Schmopera</Link></li>
        </ul>
        <br/>
      </div>
    );

    const { fields: { key, name, description }, contentType, preview, handleSubmit, dashboardData, entryKey, error, published, updated, user } = this.props;

    if (!this.props.error && !this.props.user && !this.props.token && !this.props.imageToken) {
      return (
        <div className={classes}>
          <h1>Dashboard page</h1>
          <p>Loading...</p>
          {/*{links}*/}
          {/*<button onClick={this.getDataHandler} disabled={!this.props.user}>Get Data</button><br/><br/>*/}
          <br/><br/>
          {this.props.children}
        </div>
      )
    }
    if (this.props.error) {
      return (
        <div className={classes}>
          <h1>Dashboard page</h1>
          {links}
          <div>{this.props.error}</div>
          <br/><br/>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className={classes}>
          <h1>Dashboard page</h1>
          {links}
          {/*<div>{JSON.stringify(this.props.dashboardData)}</div>
        <form onSubmit={handleSubmit(this.formSubmit)} onFocus={() => {
            this.props.fields.key.onChange(this.props.entryKey);
          }}>
            <div className="form-group">
              <label>Name<br/><input
                type="text"
                onChange=''
                {...name} /></label>
              <div className="text-help">
                {name.touched ? name.error:''}
              </div>
              <label>Description<br/><textarea
                type="text"
                onChange=''
                {...description} /></label>
                <div className="text-help">
                  {description.touched ? description.error:''}
                  {error}
                </div>
            </div>
            <button type="submit">Update Data</button><br/><br/>
          </form>*/}
          <button onClick={this.publishSiteHandler}>Publish Site</button><br/><br/>
          {/*<button onClick={this.logoutHandler}>Logout</button><br/><br/>*/}
          <div>{ this.props.updated ? 'Saved!' : '' }</div>
          <div>{ this.props.published }</div>
          <br/><br/>
          {/*{this.props.children}*/}
          {React.cloneElement(this.props.children, {
            imageToken: this.props.imageToken,
            token: this.props.token,
            user: this.props.user
           })
          }
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

function MapStateToProps(state) {
  // console.log('key:', state.firebase.key);
  // console.log('state:', state);
  if (state.images.error) {
    console.log('images:', state.images);
  }
  return {
    initialValues: state.firebase.dashboardData,
    contentType: state.firebase.contentType,
    preview: state.firebase,
    dashboardData: state.firebase.dashboardData,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    imageToken: state.login.imageToken,
    published: state.publish.published,
    token: state.login.token,
    uploadError: state.images.error,
    updated: state.firebase.updated,
    user: state.login.user
  };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
Dashboard = reduxForm({
  form: 'DashboardForm', //name of the form, doesn't have to be same as component
  fields: ['key', 'name', 'description'],
  // validate
},
MapStateToProps,
{ getFirebaseData, requestImageToken, updateSingleFirebaseData, publishSite, logoutUser, reloadUser })(Dashboard)

export default Dashboard;
