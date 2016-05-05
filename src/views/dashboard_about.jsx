'use strict';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { stateToHTML } from 'draft-js-export-html';
import { getFirebaseData, updateSingleFirebaseData, publishSite, addImage, updateFirebaseEntry } from '../actions/index';
import InputText from '../components/InputText';
import RichEditor from '../components/RichEditor';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';

const classes = classnames('dashboard__about', {});
const CST = require('../shared/constants');

require ('./styles/dashboard_about.scss');

let DashboardAbout = React.createClass({

  getInitialState: function() {
    console.log('imageToken:', this.props.imageToken);
    return {
      imageToken: this.props.imageToken,
      images: []
    }
  },

  dropHandler: function(images) {
    console.log('received:', images);
    this.props.addImage(images, this.props.user);
    this.setState({images: images});
  },

  formSubmit: function(entry) {
    // this.props.updateSingleFirebaseData(entry, this.props.user, '/data/notablework');
    console.log('entry:', entry);
    console.log('props:', this.props);
    // console.log('refTagline', this.refs.editorTagline.state.getCurrentContent());
    // console.log('refTagline', this.refs.tagline);
    /* entry props need to match up to the params that will be updated in firebase */
    /* regular form fields will be populated but rich text fields need to be assigned */
    entry.tagline = stateToHTML(this.refs.tagline.state.editorState.getCurrentContent());
    entry.photo = this.props.imageData;
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

    return (
      <div>
        <div>About Me</div>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className="form-group">
            <InputText
              field={fields.name}
              id='about-name'
              label={this.props.controlList.controls[1].label}
              placeholder=''
            />
          <h5>{this.props.controlList.controls[0].label}</h5>
          <p>{this.props.controlList.controls[0].help}</p>
          <h5>{this.props.controlList.controls[7].label}</h5>
          <RichEditor ref="bio" contentState={this.props.data.bio?this.props.data.bio:''} />
          <p>{this.props.controlList.controls[7].help}</p>
          <h5>{this.props.controlList.controls[6].label}</h5>
          <RichEditor ref="tagline" contentState={this.props.data.tagline?this.props.data.tagline:''} />
          <p>{this.props.controlList.controls[6].help}</p>
          </div>
          {/*<img src={CST.IMAGES_URL + '/images/demo.toitoi.co/ChPQj7vUUAAMbny.jpg?token=' + this.props.imageToken}/>*/}
          {this.props.data.photo ?
            <img src={CST.IMAGES_URL + this.props.data.photo.thumbnailUrl + '?token=' + this.props.imageToken}/> : null
          }

          <div>
            <label>Upload files</label>
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
});

function validate(values) {
  const errors = {};

  return errors;
}

function MapStateToProps(state) {
  // console.log('state:', state);
  return {
    controlList: state.firebase.contentType.aboutme,
    data: state.firebase.data.aboutme,
    initialValues: state.firebase.data.aboutme,
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
{ getFirebaseData, updateSingleFirebaseData, publishSite, addImage, updateFirebaseEntry })(DashboardAbout)

export default DashboardAbout;
