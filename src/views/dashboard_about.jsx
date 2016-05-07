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

const classes = classnames('dashboard__about', {});
const CST = require('../shared/constants');

require ('./styles/dashboard_about.scss');

let DashboardAbout = React.createClass({

  getInitialState: function() {
    console.log('about props', this.props);
    console.log('imageToken:', this.props.imageToken);
    return {
      imageToken: this.props.imageToken,
      images: []
    }
  },

  componentWillReceiveProps: function() {
    if (!this.props.data && this.props.user) {
      console.log('okay now get firebase data');
      this.props.getFirebaseData(this.props.user);
    }
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
    this.props.updateFirebaseEntry('data/aboutme', entry);
  },



  render: function() {
    const { fields, handleSubmit, dashboardData, entryKey, error, published, updated, user } = this.props;

    // if (!this.props.error && !this.props.dashboardData) {
    //   return (
    //     <div className={classes}>
    //       About Me
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>Loading...</div>
    //   )
    // }

    if (!this.props.data) {
      return (
        <div>Loading...</div>
      )
    } else if (this.props.msg) {
      return (
        <div>
          <h2>About Me</h2>
          <form onSubmit={handleSubmit(this.formSubmit)}>
            <div className="form-group">
              <InputText
                field={fields.name}
                id='about-name'
                label={this.props.msg.about_name_label}
                placeholder=''
              />
              <p>{this.props.msg.about_name_help}</p>

              <h4>{this.props.msg.about_bio_label}</h4>
              <RichEditor ref="bio" contentState={this.props.data.bio?this.props.data.bio:''} />
              <p>{this.props.msg.about_bio_help}</p>

              <h4>{this.props.msg.about_tagline_label}</h4>
              <RichEditor ref="tagline" contentState={this.props.data.tagline?this.props.data.tagline:''} />
              <p>{this.props.msg.about_tagline_help}</p>
            </div>
            {/*<img src={CST.IMAGES_URL + '/images/demo.toitoi.co/ChPQj7vUUAAMbny.jpg?token=' + this.props.imageToken}/>*/}
            {this.props.data.photo ?
              <img src={CST.IMAGES_URL + this.props.data.photo.resize_url + '?token=' + this.props.imageToken}/> : null
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
  // console.log('state:', state);
  var contentType;
  var data;
  // contentType = state.firebase.contentType ? state.firebase.contentType.aboutme : null;
  data = state.firebase.data ? state.firebase.data.aboutme : null;
  return {
    // controlList: contentType,
    data: data,
    initialValues: data,
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
