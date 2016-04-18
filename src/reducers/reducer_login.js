const CST = require('../shared/constants');
const INITIAL_STATE = { auth: null, user: null, error: null, token: null }

export default function(state = INITIAL_STATE, action) {
  // console.log('action:', action);
  switch(action.type){
    case CST.LOGIN_REQUEST:
      return { ...state }
    case CST.LOGIN_SUCCESS:
      return { ...state, auth: true, user: action.payload.data }
    case CST.LOGIN_FAILURE:
      return { ...state, error: action.payload }
    case CST.TOKEN_REQUEST:
      return { ...state }
    case CST.TOKEN_SUCCESS:
      return { ...state, token: action.payload.token }
    case CST.TOKEN_FAILURE:
      return { ...state, error: action.payload }
    case CST.RETURN_USER:
      return { auth: true, user: action.payload.data }
    default:
      return state;
  }
}
