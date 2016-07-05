'use strict';

import React from 'react';
import { connect } from 'react-redux';
// import DropzoneComponent from 'react-dropzone-component';
// import Dropzone from 'dropzone';
import ImageUpload from '../components/ImageUpload';
import classnames from 'classnames';
// import Dropzone from 'react-dropzone';
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
  getInitialState: function() {
    return {
      queue: [],
      disableSave: true
    }
  },

  dropHandler: function(images) {
    console.log('received:', images);
    // this.props.uploadImage(images, this.props.user);
    // this.setState({images: images});
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
    /* now that image has successfully uploaded, swap file information with
    response information */
    if (nextProps.confirmation) {
      let queue = base.state.queue;
      let objIndex = queue.map(function(el) {return el.name}).indexOf(nextProps.confirmation.filename);
      if (objIndex !== -1) {
        queue.splice(objIndex, 1, nextProps.confirmation);
        base.setState( {queue: queue} );
      }
      console.info('queue:', base.state.queue);
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
      console.log(objIndex);
      console.info('updated queue:', base.state.queue);
    }

  },

  disableSave: function(bool) {
    this.setState({ disableSave: bool });
  },

  queueCompleteHandler: function() {
    let objects = 0;
    for (var i = 0; i < this.state.queue.length; i++) {
      if (this.state.queue[i].siteUrl) {
        // canceled or error images do not have a siteUrl
        objects++;
      }
    }
    if (objects > 0) {
      this.disableSave(false);
    }
  },

  saveImagesHandler: function(event) {
    let firebaseQueue = this.state.queue;
    let index = firebaseQueue.length - 1;
    while (index >= 0) {
      if (firebaseQueue[index].status === 'error' || firebaseQueue[index].status === 'canceled') {
        firebaseQueue.splice(index, 1);
      }
      index -= 1;
    }
    console.info(firebaseQueue);
  },

  render: function() {
    let base = this;
    let props = {
      disableSave: this.disableSave,
      queueCompleteHandler: this.queueCompleteHandler,
      user: this.props.user
    };

    return (
      <div className={classes}>
        <h2>{MSG.gallery_page_label}</h2>
        {/*<Dropzone ref="dropzone" onDrop={base.dropHandler}>
          <div>Drop your images here!</div>
        </Dropzone>*/}
        {/*<Dropzone ref="dropzone" onDrop={this.dropHandler}>
          <div>Drop your image here!</div>
        </Dropzone>*/}

        {/*<form action="/file-upload" class="dropzone" id='imageDropzone'>
          <div class="fallback">
            <input name="file" type="file" multiple />
          </div>
        </form>*/}
        {/*<div id='imageDropzone'></div>*/}

        {/*<DropzoneComponent config={componentConfig}
                        action='/fakeendpoint'
                        onDrop={this.dropHandler}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />*/}
        <ImageUpload {...props} />
        <button disabled={this.state.disableSave} onClick={this.saveImagesHandler}>Save Images</button><br/><br/>
      </div>
    )
  },

});

function mapStateToProps(state) {
  let data = state.firebase.data ? state.firebase.data : null;
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

export default connect(mapStateToProps, {})(DashboardGallery);
