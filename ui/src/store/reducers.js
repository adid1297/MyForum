import { combineReducers } from 'redux';
import * as routines from './actions';

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
      return { ...state, ...action.payload };
    case routines.createTopicRoutine.SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  switch (action.type) {
    case routines.fetchTopicMessagesRoutine.SUCCESS:
      return {...state, ...action.payload };
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
});
