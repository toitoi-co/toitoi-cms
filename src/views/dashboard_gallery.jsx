'use strict';

import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import InputText from '../components/InputText';
import ImageUpload from '../components/ImageUpload';
import classnames from 'classnames';
import { getFirebaseData, updateSingleFirebaseData, publishSite, uploadImage, updateFirebaseEntry } from '../actions/index';

require ('../scss/views/dashboard_gallery.scss');

const _result = require('lodash/fp/result');
const collection = require('lodash/fp/collection');
const classes = classnames('dashboard__gallery', {});
const settings = require('../shared/settings');
const CST = require('../shared/constants');
const MSG = require('../shared/messages');

// let imageDropzone = null;

let DashboardGallery = React.createClass({
  /* the following comes from parent, Dashboard:
    this.props.imageToken,
    this.props.token,
    this.props.user */

  getInitialState: function() {
    return {
      images: [],
      queue: [],
      disableSave: true
    }
  },

  componentWillMount: function() {
    if (!this.props.data && this.props.user) {
      // console.log('No data but user detected; will now get firebase data');
      this.props.getFirebaseData(this.props.user);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    let base = this;
    /* Add file object as a placeholder in the queue */
    if (nextProps.addition) {
      /* if placeholder is not already in queue (search by filename), add it */
      // console.log(this.props.addition);
      let queue = base.state.queue;
      let dupe = queue.filter(function (el) {
          return el.filename === nextProps.addition.name;
      });
      if (dupe.length === 0) {
        queue.push(nextProps.addition);
        base.setState( {queue: queue} );
      }
    }
    /* now that image has successfully uploaded, replace File object with
    upload response object that will be stored in database */
    if (nextProps.confirmation) {
      let queue = base.state.queue;
      let objIndex = queue.map(function(el) {return el.name}).indexOf(nextProps.confirmation.filename);
      if (objIndex !== -1) {
        queue.splice(objIndex, 1, nextProps.confirmation);
        base.setState( {queue: queue} );
      }
    }
    /* remove Object (ignores File since saveImagesHandler will skip it anyway) from the queue when user clicks 'Remove file', */
    if (nextProps.removal) {
      let queue = base.state.queue;
      /* if image is not already in queue (search by filename), add it */
      let objIndex = queue.map(function(el) {return el.filename}).indexOf(nextProps.removal.name);
      if (objIndex !== -1) {
        queue.splice(objIndex, 1);
        base.setState( {queue: queue} );
      }
      /* check to see whether Save Images button should be disabled */
      this.queueCompleteHandler();
      // console.log(objIndex);
      // console.info('updated queue:', base.state.queue);
    }
    if (nextProps.data) {
      if (nextProps.data.photos) {
        this.setState({
          images: nextProps.data.photos
        })
        // console.log('photos:', this.state.images);
      }
    }

  },

  disableSave: function(bool) {
    this.setState({ disableSave: bool });
  },

  queueCompleteHandler: function() {
    let objects = 0;
    for (var i = 0; i < this.state.queue.length; i++) {
      if (this.state.queue[i].siteUrl) {
        /* canceled or error images do not have a siteUrl */
        objects++;
      }
    }
    if (objects > 0) {
      this.disableSave(false);
    } else {
      this.disableSave(true);
    }
  },

  formSubmit: function(entry) {
    let newImages = this.state.queue;
    let index = newImages.length - 1;
    while (index >= 0) {
      if (newImages[index].status === 'error' || newImages[index].status === 'canceled') {
        newImages.splice(index, 1);
      }
      index -= 1;
    }
    entry.photos = this.state.images.concat(newImages);
    // console.log('updated entry:', entry);
    this.props.updateFirebaseEntry('gallery', entry);
  },

  generateThumbs() {
    var thumbs = [];
    for (var i = 0; i < this.props.data.photos.length; i++) {
      thumbs.push(
        <li key={this.props.data.photos[i].filename}>
          <img src={CST.IMAGES_URL + this.props.data.photos[i].thumbnailUrl + '?token=' + this.props.imageToken} width="100" />
        </li>
      )
    }
    return thumbs;
  },

  render: function() {
    const { fields, handleSubmit, initialValues, data, entryKey, error, published, updated, user } = this.props;

    let childProps = {
      disableSave: this.disableSave,
      queueCompleteHandler: this.queueCompleteHandler,
      user: this.props.user
    }


    var galleryThumbs;
    if (this.props.data && this.props.imageToken) {
      if (this.props.data.photos) {
        // console.info('gallery photos:', this.props.data.photos);
        galleryThumbs = (
          <ul>
            {this.generateThumbs()}
          </ul>
        )
      }
    }
    // {(this.state.images.length > 0 && !this.props.uploadError) ? <div>
    // <div>{this.state.images.map((image) => <img src={image.preview} width="100"/> )}</div>
    // </div> : null}

    return (
      <div className={classes}>
        <h2>{MSG.gallery_page_label}</h2>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <div className="form-group">
            <InputText
              field={fields.name}
              id='gallery-name'
              label={MSG.gallery_name_label}
              placeholder=''
            />
            <p>{MSG.gallery_name_help}</p>
            {galleryThumbs}
            <ImageUpload {...childProps} />
            <button disabled={this.state.disableSave} type="submit">Save updates &amp; Images</button>
          </div>
        </form>
        {/*<button disabled={this.state.disableSave} onClick={this.saveImagesHandler}>Save Images</button><br/><br/>*/}
        <div className="help"></div>
      </div>
    )
  },

});

function validate(values) {
  const errors = {}

  return errors;
}

function mapStateToProps(state) {
  let data = state.firebase.data ? state.firebase.data.gallery : null;

  return {
    data: data,
    initialValues: data,
    imageData: state.images.imageData,
    entryKey: state.firebase.key,
    error: state.firebase.error,
    published: state.publish.published,
    updated: state.firebase.updated,
    uploadError: state.images.error,
    addition: state.images.queueAddition,
    confirmation: state.images.queueConfirmation,
    removal: state.images.queueRemoval
  }
}

DashboardGallery.propTypes = {
  fields: PropTypes.object.isRequired
}

DashboardGallery = reduxForm({
  form: 'GalleryForm', //name of the form, doesn't have to be same as component
  // fields,
  fields: ['name'],
  validate
},
mapStateToProps,
{ getFirebaseData, updateFirebaseEntry })(DashboardGallery)

export default DashboardGallery;
