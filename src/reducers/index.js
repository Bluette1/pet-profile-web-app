
import { combineReducers } from 'redux';
import auth from './auth';
import pet from './pet';
import own_pet from './own_pet';
import message from './message';

export default combineReducers({
  auth,
  pet,
  message,
  own_pet
});