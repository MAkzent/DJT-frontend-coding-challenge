import { combineReducers } from 'redux';

import issuesReducer from './issuesReducer';
import pullRequestsReducer from './pullRequestsReducer';

const rootReducer = combineReducers({
  issues: issuesReducer,
  pullRequests: pullRequestsReducer,
});

export default rootReducer;
