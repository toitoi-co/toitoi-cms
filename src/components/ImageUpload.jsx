'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import DropzoneComponent from 'react-dropzone-component';
import Dropzone from 'toitoi-dropzone';
import classnames from 'classnames';

require ('./styles/imageupload.scss');

const CST = require('../shared/constants');
const auth = require('../shared/auth');
const classes = classnames('image-upload', {});




let ImageUpload = React.createClass({
  getInitialState: function() {
    let base = this;
    Dropzone.autoDiscover = false;
    Dropzone.options.dropzone = {
      init: function() {
        this.on('addedfile', function(file) {
          base.addedFile(file);
        });
        this.on('drop', function(evt) {
          console.info('event:', evt);
        });
        // this.on('sending', function(file, xhr, data) {
        //   console.info('xhr:', xhr);
        //   data.append('image', file);
        // });
        this.on('success', function(file, response) {
          console.info('success file:', file);
          console.info('success response:', response);
        },
        )
      },
      acceptedFiles: '.jpeg,.jpg,.png,.gif',
      addRemoveLinks: true,
      headers: {
        'X-Token': auth.getToken(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/plain, */*'
      },
      method: 'put',
      url: function(files) {
        let hostname = base.props.user.site.subdomainName + '.toitoi.co';
        return (`${CST.GENERATE_URL}/images/${hostname}/${files[0].name}`);
      }
      // url: 'http://google.com/upload'
    };
    return ({
      images: []
    });
  },

  addedFile: function(file) {
    console.info('Added:', file);
    let image = {
      name: file.name
    }
  },

  simpleCallBack: function () {
      console.log('I\'m a simple callback');
  },

  imageUploadUrl: function(files) {
    console.log('files:', files);
    let hostname = this.props.user.site.subdomainName + '.toitoi.co';
    return (`${CST.GENERATE_URL}/images/${hostname}/${files[0].name}`);
    // return (`http://google.com/upload/${files[0].name}`);
  },

  thumbnailTemplate: function() {
    return(
      {}
    )
  },

  componentDidMount: function() {


    let myDropzone = new Dropzone('div#dropzone');

    // let componentConfig = {
    //
    //     iconFiletypes: ['.jpg', '.png', '.gif'],
    //     showFiletypeIcon: true,
    //     postUrl: `${CST.GENERATE_URL}/images/${hostname}/${images[0].name}`
    // };
    // let eventHandlers = {
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
    // let callbackArray = [
    //     function () {
    //         console.log('Look Ma, I\'m a callback in an array!');
    //     },
    //     function () {
    //         console.log('Wooooow!');
    //     }
    // ];
    // let djsConfig = {
    //     addRemoveLinks: true,
    //     method: 'put',
    //     params: {
    //         myParameter: "I'm a parameter!",
    //         'X-Token': auth.getToken(),
    //     }
    // };
  },

  render: function() {
    return (
      <div className={classes}>
        {/*<form action="/api/upload" className="dropzone" id="dropzone">
             <div className="dz-default dz-message text-center"></div>
         </form>*/}
        <div id="dropzone" className="dropzone"></div>
        {/*<DropzoneComponent config={componentConfig}
                        eventHandlers={eventHandlers}
                        djsConfig={djsConfig} />*/}
      </div>
    );
  }
});

export default connect(null, null)(ImageUpload)
