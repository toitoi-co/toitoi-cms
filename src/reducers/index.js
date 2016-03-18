import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import authReducer from './reducer_auth'
import loginReducer from './reducer_login';
import firebaseReducer from './reducer_firebase';
import publishReducer from './reducer_publish';
import themesReducer from './reducer_themes';

const rootReducer = combineReducers({
  form: formReducer,
  // auth: authReducer,
  login: loginReducer,
  firebase: firebaseReducer,
  publish: publishReducer,
  themes: themesReducer
});

export default rootReducer;
