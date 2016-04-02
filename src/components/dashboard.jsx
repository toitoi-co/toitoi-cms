'use strict';

// const CST = require('../shared/constants');
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { getFirebaseData, updateSingleFirebaseData, publishSite, addImage } from '../actions/index';
import classnames from 'classnames';
import auth from '../shared/auth';
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

  formSubmit: function(entry) {
    // event.preventDefault();
    this.props.updateSingleFirebaseData(entry);
  },

  getDataHandler: function(event) {
    event.preventDefault;
    this.props.getFirebaseData();
  },

  dropHandler: function(files) {
    console.log('received:', files);
    let site = this.props.user.site.subdomainName + '.toitoi.co';
    this.props.addImage(files, site);
  },

  publishSiteHandler: function(event) {
    event.preventDefault;
    let site = this.props.user.site.subdomainName + '.toitoi.co';
    this.props.publishSite(site);
  },

  logoutHandler: function(event) {
    event.preventDefault;
    auth.logout();
    this.context.router.push('/');
  },

  componentDidMount: function() {
  },

  componentWillUpdate: function() {
  },

  componentWillReceiveProps: function() {
  },

  render: function() {
    const { fields: { key, name, description }, handleSubmit, dashboardData, entryKey, error, published, updated, user } = this.props;

    if (!this.props.error && !this.props.dashboardData) {
      return (
        <div>
          {/*Loading...<br/>*/}
        <button onClick={this.getDataHandler}>Get Data</button><br/><br/>
        <button onClick={this.logoutHandler}>Logout</button><br/><br/>
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
                  {dashboardData.error}
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
  return {
    initialValues: state.firebase.dashboardData,
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
{ getFirebaseData, updateSingleFirebaseData, publishSite, addImage })(Dashboard)

export default Dashboard;
