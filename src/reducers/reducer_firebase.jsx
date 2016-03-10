const CST = require('../shared/constants');
const INITIAL_STATE = { controls: null, key: null, dashboardData: null, error: null, updated: false }

export default function(state = INITIAL_STATE, action) {
  console.log('action:', action);
  let key = null;
  if (action.payload) {
    key = Object.keys(action.payload)[0];
  }
  switch(action.type){
    case CST.FIREBASE_REQUEST:
      return { state }
    case CST.FIREBASE_RECEIVE:
      return { dashboardData: action.payload[key], key: key }
    case CST.FIREBASE_SAVE:
      return { dashboardData: action.payload[key], key: key }
    case CST.FIREBASE_UPDATE:
      // return { dashboardData: action.payload[key], key: key, updated: true }
      console.log('state: at reducer:', state);
      return { dashboardData: state.dashboardData, key: state.key, updated: true }
    case CST.FIREBASE_FAILURE:
      return { error: action.payload }
    default:
      return state;
  }
}
