const CST = require('../shared/constants');
const INITIAL_STATE = {
  selected: false,
  error: null
};

export default function(state = INITIAL_STATE, action) {
  // console.log('action:', action);
  switch(action.type){
    // case CST.LOGIN_SUCCESS:
    //   return { ...state, user: action.payload.data };
    case CST.PLANS_REQUEST:
      return state;
    case CST.PLANS_REQUEST_SUCCESS:
      return { ...state, list: action.payload };
    case CST.PLANS_REQUEST_FAILURE:
      return state;
    case CST.PLAN_SELECTION:
      return state;
    case CST.PLAN_SELECTION_SUCCESS:
      return { ...state, selected: true }
    case CST.PLAN_SELECTION_FAILURE:
      return { ...state, error: action.payload.message }
    default:
      return state;
  }
}
