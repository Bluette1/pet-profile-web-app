
import { combineReducers } from 'redux';
import auth from './auth';
import pet from './pet';
import message from './message';

export default combineReducers({
  auth,
  pet,
  message,
});