import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as routines from './actions';
import history from './history';

const defaultToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjY2MzI4NjMsIm5iZiI6MTU2NjYzMjg2MywianRpIjoiZWVhZTA1OWYtOGM4MC00MjNjLTk2NWMtZDFjMmQ4YWE0YWJmIiwiaWRlbnRpdHkiOiI3MTEzYWNlMC04YWE4LTRiZGQtOGUzMS02M2RmYTRhNzE5ZWEiLCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MifQ.8gbvvw0boGS3Ie4WuVg6MMaeUEjPvDnbGl0Et88BPHY';
const token = (state = defaultToken, action) => {
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
    case routines.updateTopicRoutine.SUCCESS:
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
