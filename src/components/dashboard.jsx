'use strict';

// const CST = require('../shared/constants');
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getFirebaseData, updateSingleFirebaseData, publishSite, addImage, checkAuth, logoutUser } from '../actions/index';
import classnames from 'classnames';
import auth from '../shared/auth';
// import auth2 from '../shared/auth2';
import Dropzone from 'react-dropzone';

require ('./styles/dashboard.scss');
const classes = classnames('dashboard', {});


let Dashboard = React.createClass({
  contextTypes: {
    router: PropTypes.object
  },

  getInitialState: function() {
    // this.updateData = this.updateData.bind(this);
    return {
      images: []
    };
  },

  componentWillMount: function() {
    // console.log('props:', this.props);
    if (!this.props.user) {
      // Could have lost current login info due to loss of connectivity or page refresh
      // auth2.checkAuth();
      console.log('no props!')
      this.props.checkAuth();
    } else {
      this.props.getFirebaseData(this.props.user);
    }
  },

  componentWillUpdate: function() {
  },

  componentWillReceiveProps: function() {
  },

  formSubmit: function(entry) {
    this.props.updateSingleFirebaseData(entry, this.props.user, '/data/notablework');
  },

  getDataHandler: function(event) {
    this.props.getFirebaseData(this.props.user);
  },

  dropHandler: function(files) {
    console.log('received:', files);
    this.props.addImage(files, this.props.user);
  },

  publishSiteHandler: function(event) {
    this.props.publishSite(this.props.user);
  },

  logoutHandler: function(event) {
    this.props.logoutUser();
    this.context.router.push('/');
  },

  render: function() {
    const { fields: { key, name, description }, contentType, data, handleSubmit, dashboardData, entryKey, error, published, updated, user } = this.props;

    if (!this.props.error && !this.props.dashboardData) {
      return (
        <div>
          {/*Loading...<br/>*/}
        <button onClick={this.getDataHandler} disabled={!this.props.user}>Get Data</button><br/><br/>
        <button onClick={this.logoutHandler}>Logout</button><br/><br/>
        {this.props.children}
        </div>
      )
    }
    if (this.props.error) {
      return (
        <div className={classes}>
          Dashboard page
          <div>{this.props.error}</div>
          {this.props.children}
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
                onChange=''
                {...name} /></label>
              <div className="text-help">
                {/*{name.touched ? name.error:''}*/}
              </div>
              <label>Description<br/><textarea
                type="text"
                onChange=''
                {...description} /></label>
                <div className="text-help">
                  {/*{description.touched ? description.error:''}*/}
                  {error}
                </div>
            </div>
            <button type="submit">Update Data</button><br/><br/>
          </form>
          <button onClick={this.publishSiteHandler}>Publish Site</button><br/><br/>
          <button onClick={this.logoutHandler}>Logout</button><br/><br/>
          <div>{ this.props.updated ? 'Saved!' : '' }</div>
          <div>{ this.props.published }</div>
          <div>
            <label>Upload files</label>
          {/*<button onClick={this.props.addImage}>Check images</button>*/}
            <Dropzone onDrop={this.dropHandler}>
              <div>Drop your files here!</div>
            </Dropzone>
            {this.state.images.length > 0 ? <div>
                <h2>Uploading {this.state.images.length} files...</h2>
              <div>{this.state.images.map((image) => <img src={image.preview} /> )}</div>
                </div> : null}
          </div>
          {this.props.children}
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
  return {
    initialValues: state.firebase.dashboardData,
    contentType: state.firebase.contentType,
    data: state.firebase.data,
    dashboardData: state.firebase.dashboardData,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    published: state.publish.published,
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
{ getFirebaseData, updateSingleFirebaseData, publishSite, addImage, checkAuth, logoutUser })(Dashboard)

export default Dashboard;
