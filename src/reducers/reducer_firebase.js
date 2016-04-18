const CST = require('../shared/constants');
const INITIAL_STATE = { controls: null, key: null, dashboardData: null, error: null, updated: false }

export default function(state = INITIAL_STATE, action) {
  let key = null;
  // // if (typeof action.payload !== 'undefined') {
  // if (action.payload && typeof action.payload.data !== 'undefined') {
  //   // key = Object.keys(action.payload)[0];
  //   key = Object.keys(action.payload.data.notablework)[0];
  // }
  switch(action.type){
    case CST.FIREBASE_REQUEST:
      return { state }
    case CST.FIREBASE_RECEIVE:
    // return { dashboardData: action.payload[key], key: key }
      key = Object.keys(action.payload.data.notablework)[0];
      // return { dashboardData: action.payload.data.notablework[key], path: '/data/notablework', key: key }
      return { contentType:action.payload.contentType, data: action.payload.data, dashboardData: action.payload.data.notablework[key], path: '', key: key }
    case CST.FIREBASE_SAVE:
      return { dashboardData: action.payload.data.notablework[key], key: key }
    case CST.FIREBASE_UPDATE:
      // console.log('state:', state);
      // return { dashboardData: action.payload[key], key: key, updated: true }
      return { contentType:action.payload.contentType, data: action.payload.data, dashboardData: state.dashboardData, key: state.key, updated: true }
    case CST.FIREBASE_FAILURE:
      return { error: action.payload }
    default:
      return state;
  }
}
