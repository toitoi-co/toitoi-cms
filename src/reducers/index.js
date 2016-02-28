import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
// import authReducer from './reducer_auth'
import loginReducer from './reducer_login'

const rootReducer = combineReducers({
  form: formReducer,
  // auth: authReducer,
  login: loginReducer
});

export default rootReducer;
