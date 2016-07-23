'use strict';

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { stateToHTML } from 'draft-js-export-html';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import { getFirebaseData, requestImageToken, publishSite, uploadImage, updateFirebaseEntry } from '../actions/index';
import InputText from '../components/InputText';
import RichEditor from '../components/RichEditor';

export const fields = ['name'];

require ('../scss/views/dashboard_about.scss');

const classes = classnames('dashboard__about', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');


let DashboardAbout = React.createClass({
  /* the following comes from parent, Dashboard:
    this.props.imageToken,
    this.props.token,
    this.props.user */

  getInitialState: function() {
    return {
      images: []
    }
  },

  componentWillMount: function() {
    if (!this.props.data && this.props.user) {
      console.log('No data but user detected; will now get firebase data');
      console.log('user:', this.props.user);
      this.props.getFirebaseData(this.props.user);
    }
    if (this.props.login && this.props.user) {
      if (!this.props.login.imageToken) {
        console.log('get imageToken');
        this.props.requestImageToken(this.props.user);
      }
    }
  },

  dropHandler: function(images) {
    console.log('received:', images);
    this.props.uploadImage(images, this.props.user);
    this.setState({images: images});
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
    this.props.updateFirebaseEntry('aboutme', entry);
  },

  render: function() {
    const { fields, handleSubmit, initialValues, data, dashboardData, entryKey, error, published, updated, user } = this.props;

    if (!this.props.data) {
      return (
        <div>
          <h2>{MSG.about_page_label}</h2>
          <p>Loading...</p>
        </div>
      )
    } else {
      // console.log('fields:', fields);
      return (
        <div>
          <h2>{MSG.about_page_label}</h2>
          <form onSubmit={handleSubmit(this.formSubmit)}>
            <div className="form-group">
              <InputText
                field={fields.name}
                id='about-name'
                label={MSG.about_name_label}
                placeholder=''
              />
              <p>{MSG.about_name_help}</p>

              <h4>{MSG.about_bio_label}</h4>
              <RichEditor ref="bio" contentState={this.props.data.bio?this.props.data.bio:''} />
              <p>{MSG.about_bio_help}</p>

              <h4>{MSG.about_tagline_label}</h4>
              <RichEditor ref="tagline" contentState={this.props.data.tagline?this.props.data.tagline:''} />
              <p>{MSG.about_tagline_help}</p>
            </div>
            {this.props.data.photo ?
              <img src={CST.IMAGES_URL + this.props.data.photo.cms_thumbnail_url + '?token=' + this.props.imageToken}/> : null
            }

            <div>
              <label>Profile picture</label>
            {/*<button onClick={this.props.addImage}>Check images</button>*/}
              <Dropzone ref="dropzone" onDrop={this.dropHandler}>
                <div>Drop your image here!</div>
              </Dropzone>
              {/*{this.state.image ? <img src={this.state.image.preview} /> : null}*/}
              {(this.state.images.length > 0 && !this.props.uploadError) ? <div>
              <div>{this.state.images.map((image) => <img src={image.preview} width="100"/> )}</div>
              </div> : null}
              {this.props.uploadError ? this.props.uploadError.data.message : null}
            </div>
            <br/>
            <button type="submit">Save updates</button>
          </form>
          <div className="help"></div>
        </div>
      )
    }
  }
});

function validate(values) {
  const errors = {}

  return errors;
}

function mapStateToProps(state) {
  let data = state.firebase.data ? state.firebase.data.aboutme : null;
  console.info('data', data);
  console.info('login', state.login);
  return {
    data: data,
    initialValues: data,
    imageData: state.images.imageData,
    dashboardData: state.firebase.dashboardData,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    published: state.publish.published,
    updated: state.firebase.updated,
    uploadError: state.images.error
  }
}

DashboardAbout.propTypes = {
  fields: PropTypes.object.isRequired
}

DashboardAbout = reduxForm({
  form: 'AboutForm', //name of the form, doesn't have to be same as component
  // fields: ['name'],
  fields,
  validate
},
mapStateToProps,
{ getFirebaseData, requestImageToken, publishSite, uploadImage, updateFirebaseEntry })(DashboardAbout)

export default DashboardAbout;
