const CST = require('../shared/constants');
const INITIAL_STATE = {
  imageUploaded: null,
  error: null,
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case CST.IMAGE_UPLOAD_REQUEST:
      return { state }
    case CST.IMAGE_UPLOAD_SUCCESS:
      return { ...state, imageUploaded: true }
    case CST.IMAGE_UPLOAD_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
