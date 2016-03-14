'use strict';

const CST = require('../shared/constants');
const Firebase = require('firebase');
const firebaseRef = new Firebase(CST.FIREBASE_URL);
import auth from '../shared/auth';


export function getFirebaseData() {
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

export function updateSingleFirebaseData(entry) {
  return function(dispatch) {
    /* get firebase-generated key from object */
    let childRef = firebaseRef.child(entry.key);
    /* store attributes into object for passing into Firebase */
    let updateObj = { };
    for (var prop in entry) {
      if (prop != 'key') {
        updateObj[prop] = entry[prop];
      }
    }
    childRef.update(updateObj, function(error){
      if (error) {
        console.log('Data could not be saved.' + error);
        dispatch(updateFirebase(error));
      } else {
        dispatch(updateFirebase());
      }
    });

  }
}

function updateFirebase() {
  return {
    type: CST.FIREBASE_UPDATE,
    isFetching: false
  }
}
