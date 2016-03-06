const CST = require('../shared/constants');
const INITIAL_STATE = { controls: null, dashboardData: null, error: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case CST.FIREBASE_REQUEST:
      return { state }
    case CST.FIREBASE_RECEIVE:
      return { ...state, dashboardData: action.payload }
    case CST.FIREBASE_SAVE:
      return { ...state, dashboardData: action.payload }
    case CST.FIREBASE_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
