'use strict';

import React from 'react';
import { connect } from 'react-redux';
import DropzoneComponent from 'react-dropzone-component';
import Dropzone from 'dropzone';
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

let imageDropzone = null;

let DashboardGallery = React.createClass({
  getInitialState: function() {
    return {
      queue: []
    }
  },

  componentWillMount: function() {

  },

  dropHandler: function(images) {
    console.log('received:', images);
    // this.props.uploadImage(images, this.props.user);
    // this.setState({images: images});
  },

  componentDidUpdate: function() {
    let base = this;
    if (this.props.addition) {
      console.log(this.props.addition);
      let queue = this.state.queue;
      /* if image is not already in queue (search by filename), add it */
      // if (!collection.find(queue, { 'name': this.props.addition.name })) {
      //   queue.push(this.props.addition);
      //   this.setState( {queue: queue} );
      // }

      let dupe = queue.filter(function (el) {
          return el.filename === base.props.addition.filename;
      });
      if (dupe.length == 0) {
        queue.push(this.props.addition);
        this.setState( {queue: queue} )
      }
      console.info('queue:', this.state.queue);
    }
  },

  render: function() {
    let base = this;
    // console.info('addition:', this.props.addition);
    if (this.props.addition) {
      let queue = this.state.queue;
      /* if image is not already in queue (search by filename), add it */
      // if (!collection.find(queue, { 'name': this.props.addition.name })) {
      //   queue.push(this.props.addition);
      //   this.setState( {queue: queue} );
      // }

      // let dupe = queue.filter(function (el) {
      //     return el.name === this.props.addition.name;
      // });
      // if (dupe.length == 0) {
      //   queue.push(this.props.addition);
      //   this.setState( {queue: queue} )
      // }
      // console.info('queue:', this.state.queue);

    }
    // const componentConfig = {
    //     iconFiletypes: ['.jpg', '.png', '.gif'],
    //     showFiletypeIcon: true
    // };
    // const eventHandlers = {
    //     // This one receives the dropzone object as the first parameter
    //     // and can be used to additional work with the dropzone.js
    //     // object
    //     init: null,
    //     // All of these receive the event as first parameter:
    //     drop: callbackArray,
    //     dragstart: null,
    //     dragend: null,
    //     dragenter: null,
    //     dragover: null,
    //     dragleave: null,
    //     // All of these receive the file as first parameter:
    //     addedfile: simpleCallBack,
    //     removedfile: null,
    //     thumbnail: null,
    //     error: null,
    //     processing: null,
    //     uploadprogress: null,
    //     sending: null,
    //     success: null,
    //     complete: null,
    //     canceled: null,
    //     maxfilesreached: null,
    //     maxfilesexceeded: null,
    //     // All of these receive a list of files as first parameter
    //     // and are only called if the uploadMultiple option
    //     // in djsConfig is true:
    //     processingmultiple: null,
    //     sendingmultiple: null,
    //     successmultiple: null,
    //     completemultiple: null,
    //     canceledmultiple: null,
    //     // Special Events
    //     totaluploadprogress: null,
    //     reset: null,
    //     queuecomplete: null
    // };
    // const djsConfig = {
    //     addRemoveLinks: true,
    //     params: {
    //       myParameter: "I'm a parameter!"
    //     }
    // };
    // const callbackArray = [
    //     function () {
    //         console.log('Look Ma, I\'m a callback in an array!');
    //     },
    //     function () {
    //         console.log('Wooooow!');
    //     }
    // ];
    // const simpleCallBack = function () {
    //     console.log('I\'m a simple callback');
    // };


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
        <ImageUpload user={this.props.user} />
      </div>
    )
  },

  componentDidMount: function() {
    // imageDropzone = new Dropzone('div#imageDropzone');
    // Dropzone.options.imageDropzone = {
    //   paramName: "file", // The name that will be used to transfer the file
    //   maxFilesize: 2, // MB
    //   accept: function(file, done) {
    //     if (file.name == "justinbieber.jpg") {
    //       done("Naha, you don't.");
    //     }
    //     else { done(); }
    //   },
    //   previewTemplate: function() {
    //     return (
    //       {}
    //     )
    //   }
    // };
  }

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
    addition: state.images.queueAddition
  }
}

export default connect(mapStateToProps, {})(DashboardGallery);
