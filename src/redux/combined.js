import { combineReducers } from 'redux';
import reducer from './reducer';
import pageReducer from './pageReducer';

export default combineReducers({
  reducer,
  pageReducer
})