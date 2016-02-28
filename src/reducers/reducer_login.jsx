import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/index'

const INITIAL_STATE = { token: null, success: null }

export default function(state = INITIAL_STATE, action) {
  // console.log('action:', action)
  //check for login request success/error
  if (action.type===LOGIN_REQUEST) {
    if (action.error && typeof action.error !== 'undefined') {
      // general server error
      action.type = LOGIN_FAILURE
    }
    if (typeof action.payload.data.success !== 'undefined') {
      if (!action.payload.data.success) {
        // authentication failure
        action.type = LOGIN_FAILURE
      } else {
        action.type = LOGIN_SUCCESS
      }
    }
  }


  // console.log('updated action:', action)
  switch(action.type){
    // case LOGIN_REQUEST:
    //   return { ...state, user:action.payload.data }
    case LOGIN_SUCCESS:
      return { ...state, token:action.payload.data.token, success:action.payload.data.success }
    default:
      return state;
  }
}
