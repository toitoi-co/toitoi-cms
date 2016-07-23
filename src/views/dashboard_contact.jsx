'use strict';

import React from 'react';
import { reduxForm } from 'redux-form';
import { stateToHTML } from 'draft-js-export-html';
import { getFirebaseData, updateSingleFirebaseData, publishSite, uploadImage, updateFirebaseEntry } from '../actions/index';
import InputText from '../components/InputText';
import RichEditor from '../components/RichEditor';
import classnames from 'classnames';

require ('../scss/views/dashboard_contact.scss');

const classes = classnames('dashboard__contact', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');

let DashboardContact = React.createClass({
  componentWillMount: function() {
    if (!this.props.data && this.props.user) {
      console.log('okay now get firebase data');
      this.props.getFirebaseData(this.props.user);
    }
  },

  formSubmit: function(entry) {
    /* entry props need to match up to the params that will be updated in firebase */
    /* regular form fields will be populated but rich text fields need to be assigned */
    entry.bio = stateToHTML(this.refs.bio.state.editorState.getCurrentContent());
    entry.tagline = stateToHTML(this.refs.tagline.state.editorState.getCurrentContent());
    if (this.props.imageData) {
      entry.photo = this.props.imageData
    }
    console.log('entry:', entry);
    this.props.updateFirebaseEntry('contact', entry);
  },


  render: function() {
    const { fields, handleSubmit, entryKey, error, published, updated, user } = this.props;

    if (!this.props.data) {
      return (
        <div>
          <h2>{MSG.contact_page_label}</h2>
          <p>Loading...</p>
        </div>
      )
    } else {
      return (
        <div>
          <h2>{MSG.contact_page_label}</h2>
            <form onSubmit={handleSubmit(this.formSubmit)}>
              <div className="form-group">
                <InputText
                  field={fields.email}
                  id='contact-email'
                  label={MSG.contact_email_label}
                  placeholder=''
                />

                <h4>{MSG.contact_greeting_label}</h4>
                {/*<RichEditor ref="greeting" contentState={this.props.data.contact?this.props.data.contact.greeting:''} />*/}
              </div>
            </form>
            <div className="help"></div>
        </div>
      )
    }
  }
});

function validate(values) {
  const errors = {};

  return errors;
}

function mapStateToProps(state) {
  let data = state.firebase.data ? state.firebase.data : null;
  return {
    data: data,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    initialValues: data,
    imageData: state.images.imageData,
    updated: state.firebase.updated
  };
}

DashboardContact = reduxForm({
  form: 'AboutForm', //name of the form, doesn't have to be same as component
  fields: ['name'],
  validate
},
mapStateToProps,
{ getFirebaseData, updateSingleFirebaseData, publishSite, uploadImage, updateFirebaseEntry })(DashboardContact)

export default DashboardContact;
