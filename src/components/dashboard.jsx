'use strict';

import React from 'react';
import Firebase from 'firebase';
import classnames from 'classnames';
import auth from '../shared/auth';

const classes = classnames('dashboard', {});

require ('./styles/dashboard.scss');

function loginToFirebase(base) {
  let ref = new Firebase('https://toitoidev.firebaseio.com');
  // ref.authWithCustomToken("AUTH_TOKEN", function(error, authData) {
  ref.authWithCustomToken(auth.getToken(), function(error, authData) {
    if (error) {
      console.log("Authentication Failed!", error);
      base.setState({error: error});
    } else {
      console.log("Authenticated successfully with payload:", authData);
      getData(base);
    }
  });
}

function getData(base) {
  let ref = new Firebase('https://toitoidev.firebaseio.com/buckets/sites/test%2C1example%2C1com/somebucketsecretkey/dev/contentType');

  // Attach an asynchronous callback to read the data
  ref.on('value', function(snapshot) {
    // console.log('contentType:', snapshot.val());
    base.setState({dashboardData: snapshot.val()});
  }, function (errorObject) {
    // console.log('The read failed: ' + errorObject.code);
    base.setState({error: 'The read failed: ' + errorObject.code});
  });
}


function setData(base) {
  let ref = new Firebase('https://toitoidev.firebaseio.com/buckets/test%2C1example%2C1com/somebucketsecretkey/dev/contentType/aboutme/controls');
  let controlsRef = ref.child('controls');
  ref.on('value', function(snapshot) {
    console.log('controls:', snapshot.val());

    // controlsRef.push(
      // {
      //   "controlType": "datetime",
      //   "hidden": true,
      //   "label": "Create Date",
      //   "locked": true,
      //   "name": "create_date",
      //   "required": true,
      //   "showInCms": false
      // }
    // );

    // let controlsList = [];

    // console.log('controlsList:', controlsList);
    // controlsRef.set(controlsList)
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

  ref.push(
    {
      "controlType": "image",
      "help": "Use as large a photo as possible. Image should be taller vertically than horizontally. A classic profile shot.",
      "hidden": false,
      "label": "Photo",
      "locked": false,
      "name": "photo",
      "required": true,
      "showInCms": true
    }
  );

  // let ref= new Firebase('https://l5zx9dwl7rd.firebaseio-demo.com');
  // ref.on('value', function(snapshot) {
  //   // console.log(snapshot.val());
  //   ref.set({
  //     'name':'Depeche Mode',
  //     'text':'Personal Jesus'
  //   });
  // }, function (errorObject) {
  //   console.log('The read failed: ' + errorObject.code);
  // });

}

function updateData2(event) {
  let ref= new Firebase('https://l5zx9dwl7rd.firebaseio-demo.com');
  ref.on('value', function(snapshot) {
    // console.log(snapshot.val());
    ref.set({
      'name':'Depeche Mode3',
      'text':'Personal Jesus'
    });
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });
  console.log('update');
}

const Dashboard = React.createClass({
  getInitialState: function() {
    setData(this);
    return {
      dashboardData: null,
      error: null
    };
    this.updateData = this.updateData.bind(this);
  },

  updateData: function(event) {
    event.preventDefault;
    let base = this;
    base.firebaseRef= new Firebase('https://l5zx9dwl7rd.firebaseio-demo.com');
    base.firebaseRef.on('value', function(snapshot) {
      // console.log(snapshot.val());
      base.firebaseRef.set({
        'name':'Depeche Mode1',
        'text':'Personal Jesus'
      });
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    });
    console.log('test');
  },

  componentWillMount: function() {
    // this.firebaseRef = new Firebase('https://l5zx9dwl7rd.firebaseio-demo.com');
  },

  componentDidMount: function() {
    // loginToFirebase(this);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.id !== this.props.id;
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  render: function() {

    if (!this.state.error && !this.state.dashboardData) {
      return (
        <div>
          Loading...<br/>
          <button onClick={this.updateData}>Update</button>
        </div>
      )
    }
    if (this.state.error) {
      return (
        <div className={classes}>
          Dashboard page
          <div>{this.state.error}</div>
        </div>
      );
    } else {
      return (
        <div className={classes}>
          Dashboard page<br/>
          {/*<div>{auth.getToken()}</div>*/}
          <div>{JSON.stringify(this.state.dashboardData)}</div>
        </div>
      );
    }
  }
});

export default Dashboard;
