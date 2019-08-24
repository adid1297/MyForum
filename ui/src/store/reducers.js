import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as routines from './actions';
import history from './history';

const token = (state = '', action) => {
  switch (action.type) {
    case routines.logInRoutine.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const topics = (state = {}, action) => {
  switch (action.type) {
    case routines.fetchTopicFeedRoutine.SUCCESS:
    case routines.createTopicRoutine.SUCCESS:
    case routines.fetchTopicRoutine.SUCCESS:
        return { ...state, ...action.payload };
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  switch (action.type) {
    case routines.fetchTopicMessagesRoutine.SUCCESS:
    case routines.createTopicMessageRoutine.SUCCESS:
      return {...state, ...action.payload };
    default:
      return state;
  }
};

const errors = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  token,
  topics,
  messages,
  errors,
  router: connectRouter(history),
});
