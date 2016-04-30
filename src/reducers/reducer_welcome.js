const CST = require('../shared/constants');

const INITIAL_STATE = { siteSaved: false, planSaved: false, themeSaved: false, error: null }

export default function(state = INITIAL_STATE, action) {
  // console.log('action:', action);
  switch(action.type){
    case CST.WELCOME_SITE_REQUEST:
      return { ...state, }
    case CST.WELCOME_SITE_SUCCESS:
      return { ...state, siteSaved: true}
    case CST.WELCOME_PLAN_REQUEST:
      return { ...state, }
    case CST.WELCOME_PLAN_SUCCESS:
      return { ...state, planSaved: true}
    case CST.WELCOME_THEME_REQUEST:
      return { ...state, }
    case CST.WELCOME_THEME_SUCCESS:
      return { ...state, themeSaved: true}
    case CST.WELCOME_FAILURE:
      return { ...state, error: action.payload}
    default:
      return state;
  }
}
