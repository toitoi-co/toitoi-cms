'use strict';

const CST = require('../shared/constants');
const Firebase = require('firebase');
let firebaseRef = null;
// import auth from '../shared/auth';


export function getFirebaseData(user) {
  let hostname = encodeURIComponent((user.site.subdomainName + '.toitoi.co').replace(/\./g, ',1'));
  let firebaseURL = CST.FIREBASE_URL + hostname + '/' + user.site.bucketKey + '/dev/previewData';
  firebaseRef = new Firebase(firebaseURL);

  return function(dispatch) {
    /* checks for firebase auth state */
    // let authData = firebaseRef.getAuth();
    // if (authData) {
    //   console.log("User " + authData.uid + " is logged in with " + authData.provider);
    // } else {
    //   console.log("User is logged out");
    // }

    dispatch(requestFirebase());
    firebaseRef.on('value', function(snapshot) {
      // console.log('snapshot', snapshot.val());
      dispatch(receiveFirebase(snapshot.val()));
    }, function (errorObject) {
      dispatch(firebaseError(errorObject));
      console.log('The read failed: ' + errorObject.code);
    });
  }
}

function requestFirebase() {
  return {
    type: CST.FIREBASE_REQUEST,
    isFetching: true
  }
}

function receiveFirebase(response) {
  return {
    type: CST.FIREBASE_RECEIVE,
    isFetching: false,
    payload: response
  }
}

function firebaseError(response) {
  return {
    type: CST.FIREBASE_FAILURE,
    isFetching: false,
    payload: response
  }
}

export function updateSingleFirebaseData(entry, user, entryPath) {
  let hostname = encodeURIComponent((user.site.subdomainName + '.toitoi.co').replace(/\./g, ',1'));
  let entryRef = firebaseRef.child(entryPath);
  return function(dispatch) {
    /* get firebase-generated key from object */
    let childRef = entryRef.child(entry.key);
    /* store attributes into object for passing into Firebase */
    let updateObj = { };
    for (var prop in entry) {
      if (prop != 'key') {
        updateObj[prop] = entry[prop];
      }
    }
    childRef.update(updateObj, function(error){
      if (error) {
        console.log('Data could not be saved.', error);
        dispatch(firebaseError(error));
      } else {
        dispatch(updateFirebase());
      }
    });
  }
}

export function updateFirebaseEntry(path, entry) {
  /* writing this simpler function to replace updateSingleFirebaseData */
  return function(dispatch) {
    let childRef = firebaseRef.child(path);
    childRef.update(entry, function(error){
      if (error) {
        console.log('Data could not be saved.', error);
        dispatch(firebaseError(error));
      } else {
        dispatch(updateFirebase({message: 'success'}));
      }
    });
  }
}

function updateFirebase(response) {
  return {
    type: CST.FIREBASE_UPDATE,
    isFetching: false,
    payload: response
  }
}



export function addDataSkeleton(user) {
  /* Add data skeleton for populating content */
  let hostname = encodeURIComponent((user.site.subdomainName + '.toitoi.co').replace(/\./g, ',1'));
  let firebaseURL = CST.FIREBASE_URL + hostname + '/' + user.site.bucketKey + '/dev/previewData';
  firebaseRef = new Firebase(firebaseURL);
  return function(dispatch) {
    // dispatch(requestFirebase());
    // firebaseRef.on('value', function(snapshot) {
    //   // console.log('snapshot', snapshot.val());
    //   dispatch(receiveFirebase(snapshot.val()));
    // }, function (errorObject) {
    //   dispatch(firebaseError(errorObject));
    //   console.log('The read failed: ' + errorObject.code);
    // });
  }
}
