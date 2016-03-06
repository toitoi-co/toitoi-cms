'use strict';

const CST = require('../shared/constants');
import React from 'react';
import { connect } from 'react-redux';
import { getFirebaseData } from '../actions/index';
import classnames from 'classnames';
import auth from '../shared/auth';

require ('./styles/dashboard.scss');
const classes = classnames('dashboard', {});

function getData(base) {
  // let ref = new Firebase('https://toitoidev.firebaseio.com/buckets/sites/test%2C1example%2C1com/somebucketsecretkey/dev/contentType');
  //
  // // Attach an asynchronous callback to read the data
  // ref.on('value', function(snapshot) {
  //   // console.log('contentType:', snapshot.val());
  //   base.setState({dashboardData: snapshot.val()});
  // }, function (errorObject) {
  //   // console.log('The read failed: ' + errorObject.code);
  //   base.setState({error: 'The read failed: ' + errorObject.code});
  // });
}


function setData(base) {
  // let ref = new Firebase('https://toitoidev.firebaseio.com/buckets/test%2C1example%2C1com/somebucketsecretkey/dev/contentType/aboutme/controls');
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

  // ref.push(
  //   {
  //     "controlType": "image",
  //     "help": "Use as large a photo as possible. Image should be taller vertically than horizontally. A classic profile shot.",
  //     "hidden": false,
  //     "label": "Photo",
  //     "locked": false,
  //     "name": "photo",
  //     "required": true,
  //     "showInCms": true
  //   }
  // );

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

const Dashboard = React.createClass({


  getInitialState: function() {
    return {};
    this.updateData = this.updateData.bind(this);
  },

  updateData: function(event) {
    event.preventDefault;
    this.props.getFirebaseData();
  },

  componentWillMount: function() {
    // this.firebaseRef = new Firebase('https://l5zx9dwl7rd.firebaseio-demo.com');
  },

  componentWillUpdate: function() {
    console.log('dashboardData:', this.props.dashboardData);
    // loginToFirebase(this);
    // this.props.getFirebaseData();
  },

  componentWillUnmount: function() {
    // this.firebaseRef.off();
  },

  render: function() {
    console.log('props:', this.props);
    console.log('dashboardData:', this.props.dashboardData);
    if (!this.props.error && !this.props.dashboardData) {
      return (
        <div>
          Loading...<br/>
        <button onClick={this.updateData}>Get Data</button>
        </div>
      )
    }
    if (this.props.error) {
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
          <div>{JSON.stringify(this.props.dashboardData)}</div>
        </div>
      );
    }
  }
});

// export default Dashboard;


function mapStateToProps(state) {
  console.log('state:', state);
  return { dashboardData: state.firebase.dashboardData };
}


// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getFirebaseData }, dispatch);
// }

export default connect(mapStateToProps, { getFirebaseData })(Dashboard);
