'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { addToGalleryQueue, confirmGalleryQueue, removeFromGalleryQueue } from '../actions/index';
import Dropzone from 'toitoi-dropzone';
import classnames from 'classnames';

require ('../scss/components/imageupload.scss');

const auth = require('../shared/auth');
const classes = classnames('image-upload', {});
const CST = require('../shared/constants');


let ImageUpload = React.createClass({
  /* functions passed in from parent (DashboardGallery):
    props.disableSave(bool)
    props.queueCompleteHandler() */
  getInitialState: function() {
    let base = this;
    Dropzone.autoDiscover = false;
    Dropzone.options.dropzone = {
      init: function() {
        this.on('addedfile', function(file) {
          base.props.disableSave(true);
          base.props.addToGalleryQueue(file);
        });
        // this.on('drop', function(evt) {
        //   console.info('event:', evt);
        // });
        // this.on('sending', function(file, xhr, data) {
        //   console.info('xhr:', xhr);
        // });
        // this.on('uploadprogress', function(file, progress) {
        //   console.log('File progress', progress);
        // });
        this.on('success', function(file, response) {
          base.props.confirmGalleryQueue(response);
        });
        this.on('removedfile', function(file) {
          base.props.removeFromGalleryQueue(file);
        });
        this.on('queuecomplete', function(file) {
          base.props.queueCompleteHandler();
        });
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
    };
    return ({

    });
  },

  componentDidMount: function() {
    let myDropzone = new Dropzone('div#dropzone');
  },

  render: function() {
    return (
      <div className={classes}>
        <div id='dropzone' className='dropzone'></div>
      </div>
    );
  }
});

export default connect(null, { addToGalleryQueue, confirmGalleryQueue, removeFromGalleryQueue })(ImageUpload)
