const CST = require('../shared/constants');
const INITIAL_STATE = {
  imageUploaded: null,
  imageData: null,
  error: null,
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case CST.IMAGE_UPLOAD_REQUEST:
      return { state }
    case CST.IMAGE_UPLOAD_SUCCESS:
      return { ...state, imageUploaded: true, imageData: action.payload, error: null }
    case CST.IMAGE_UPLOAD_FAILURE:
      if (action.payload.status === 409) {
        action.payload.data.message = 'The file already exists.'
      } else {
        action.payload.data.message = 'There was a problem with the upload.'
      }
      return { ...state, error: action.payload }
    case CST.ADD_TO_GALLERY_QUEUE:
      return { ...state, queueAddition: action.payload, queueConfirmation: null, queueRemoval: null }
    case CST.CONFIRM_GALLERY_QUEUE:
      return { ...state, queueAddition: null, queueConfirmation: action.payload, queueRemoval: null }
    case CST.REMOVE_FROM_GALLERY_QUEUE:
      return { ...state, queueAddition: null, queueConfirmation: null, queueRemoval: action.payload }
    default:
      return state;
  }
}
