const CST = require('../shared/constants');
const INITIAL_STATE = {
  imageUploaded: null,
  error: false,
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case CST.IMAGE_UPLOAD_REQUEST:
      return { state }
    case CST.IMAGE_UPLOAD_SUCCESS:
      return { ...state, imageUploaded: true }
    case CST.IMAGE_UPLOAD_FAILURE:
      if (action.payload.status === 409) {
        action.payload.data.message = 'The file already exists.'
      } else {
        action.payload.data.message = 'There was a problem with the upload.'
      }
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
