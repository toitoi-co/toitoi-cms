import { AUTH_SET_TOKEN, AUTH_DISCARD_TOKEN, AUTH_SET_USER } from '../actions/index'

const INITIAL_STATE = { token: null, user: null }

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    // save the token into the state
    case AUTH_SET_TOKEN:
      return { ...state, token: action.token }
    // discards the current token (logout)
    case AUTH_DISCARD_TOKEN:
      return { }
    // saves the current user
    case AUTH_SET_USER:
      return { ...state, user: user }
    default:
      return state;
  }
}
