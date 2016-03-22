const CST = require('../shared/constants');
const INITIAL_STATE = {
  published: null,
  error: null,
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case CST.PUBLISH_REQUEST:
      return { state }
    case CST.PUBLISH_SUCCESS:
      return { ...state, published: action.payload }
    case CST.PUBLISH_ERROR:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
