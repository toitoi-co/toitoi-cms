import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './reducer_login';
import firebaseReducer from './reducer_firebase';
import imagesReducer from './reducer_images';
import publishReducer from './reducer_publish';
import themesReducer from './reducer_themes';
import welcomeReducer from './reducer_welcome';

const rootReducer = combineReducers({
  form:     formReducer,
  firebase: firebaseReducer,
  images:   imagesReducer,
  login:    loginReducer,
  publish:  publishReducer,
  themes:   themesReducer,
  welcome:  welcomeReducer
});

export default rootReducer;
