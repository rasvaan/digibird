import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import blog from './blog.js';
import platforms from './platforms.js';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  blog,
  platforms
});
