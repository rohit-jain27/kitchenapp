import { combineReducers } from 'redux';
import PollReducer from './PollReducer';

const rootReducer = combineReducers({
  polls: PollReducer,
});

export default rootReducer;