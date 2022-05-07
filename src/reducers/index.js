import { combineReducers } from 'redux';

import alert from './alert';
import product from './product';

// adding the state variables
export default combineReducers({ alert, product });
