const CST = require('../shared/constants');

// import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, TOKEN_SUCCESS } from '../actions/index'

const INITIAL_STATE = { logout: null, error: null }

export default function(state = INITIAL_STATE, action) {

  switch(action.type){
    case CST.LOGOUT_SUCCESS:
      return { ...state, logout: true }
    case CST.LOGOUT_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state;
  }
}
