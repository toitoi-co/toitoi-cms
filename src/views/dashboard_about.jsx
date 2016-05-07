'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { stateToHTML } from 'draft-js-export-html';
import { getFirebaseData, updateSingleFirebaseData, publishSite, uploadImage, updateFirebaseEntry } from '../actions/index';
import InputText from '../components/InputText';
import RichEditor from '../components/RichEditor';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';

require ('./styles/dashboard_about.scss');

const classes = classnames('dashboard__about', {});
const CST = require('../shared/constants');
const MSG = require('../shared/messages');


let DashboardAbout = React.createClass({

  getInitialState: function() {
    console.log('about props:', this.props);
    console.log('imageToken:', this.props.imageToken);

    // if (!this.props.preview && this.props.user) {
    //   console.log('okay now get firebase data');
    //   this.props.getFirebaseData(this.props.user);
    // }

    return {
      images: []
    }
  },

  componentWillMount: function() {
    if (!this.props.preview && this.props.user) {
      console.log('okay now get firebase data');
      this.props.getFirebaseData(this.props.user);
    }
  },

  componentWillReceiveProps: function() {
    // if (!this.props.preview && this.props.user) {
    //   console.log('okay now get firebase data');
    //   this.props.getFirebaseData(this.props.user);
    // }
  },

  dropHandler: function(images) {
    console.log('received:', images);
    this.props.uploadImage(images, this.props.user);
    this.setState({images: images});
  },

  formSubmit: function(entry) {
    // this.props.updateSingleFirebaseData(entry, this.props.user, '/data/notablework');
    console.log('props:', this.props);
    // console.log('refTagline', this.refs.editorTagline.state.getCurrentContent());
    // console.log('refTagline', this.refs.tagline);
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
    const { fields, handleSubmit, dashboardData, entryKey, error, published, updated, user } = this.props;

    if (!this.props.preview) {
      return (
        <div>
          <h2>{MSG.about_page_label}</h2>
          <p>Loading...</p>
        </div>
      )
    } else {
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
              <RichEditor ref="bio" contentState={this.props.preview.bio?this.props.preview.bio:''} />
              <p>{MSG.about_bio_help}</p>

              <h4>{MSG.about_tagline_label}</h4>
              <RichEditor ref="tagline" contentState={this.props.preview.tagline?this.props.preview.tagline:''} />
              <p>{MSG.about_tagline_help}</p>
            </div>
            {this.props.preview.photo ?
              <img src={CST.IMAGES_URL + this.props.preview.photo.resize_url + '?token=' + this.props.imageToken}/> : null
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
        </div>
      )
    }
  }
});

function validate(values) {
  const errors = {};

  return errors;
}

function MapStateToProps(state) {
  console.log('about state:', state);
  var contentType;
  var preview;
  preview = state.firebase.preview ? state.firebase.preview.aboutme : null;
  return {
    preview: preview,
    initialValues: preview,
    imageData: state.images.imageData,
    dashboardData: state.firebase.dashboardData,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    published: state.publish.published,
    updated: state.firebase.updated,
    uploadError: state.images.error
  };
}

DashboardAbout = reduxForm({
  form: 'AboutForm', //name of the form, doesn't have to be same as component
  fields: ['name'],
  validate
},
MapStateToProps,
{ getFirebaseData, updateSingleFirebaseData, publishSite, uploadImage, updateFirebaseEntry })(DashboardAbout)

export default DashboardAbout;
