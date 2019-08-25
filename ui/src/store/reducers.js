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

const user = (state = '', action) => {
  switch (action.type) {
    case routines.getUserRoutine.SUCCESS:
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
    case routines.deleteTopicRoutine.SUCCESS:
      return Object.keys(state).filter(
        key => key !== action.payload
      ).reduce(
        (result, current) => ({ ...result, [current]: state[current] }), {}
      );
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  switch (action.type) {
    case routines.fetchTopicMessagesRoutine.SUCCESS:
    case routines.createTopicMessageRoutine.SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const errors = (state = [], action) => {
  switch (action.type) {
    case routines.signUpRoutine.FAILURE:
      return [...state, { routine: 'signUpRoutine', error: action.payload }];
    case routines.logInRoutine.FAILURE:
      return [...state, { routine: 'logInRoutine', error: action.payload }];
    case routines.getUserRoutine.FAILURE:
      return [...state, { routine: 'getUserRoutine', error: action.payload }];
    case routines.fetchTopicRoutine.FAILURE:
      return [...state, { routine: 'fetchTopicRoutine', error: action.payload }];
    case routines.createTopicRoutine.FAILURE:
      return [...state, { routine: 'createTopicRoutine', error: action.payload }];
    case routines.updateTopicRoutine.FAILURE:
      return [...state, { routine: 'updateTopicRoutine', error: action.payload }];
    case routines.deleteTopicRoutine.FAILURE:
      return [...state, { routine: 'deleteTopicRoutine', error: action.payload }];
    case routines.fetchTopicPageRoutine.FAILURE:
      return [...state, { routine: 'fetchTopicPageRoutine', error: action.payload }];
    case routines.fetchTopicFeedRoutine.FAILURE:
      return [...state, { routine: 'fetchTopicFeedRoutine', error: action.payload }];
    case routines.createTopicMessageRoutine.FAILURE:
      return [...state, { routine: 'createTopicMessageRoutine', error: action.payload }];
    case routines.fetchTopicMessagesRoutine.FAILURE:
      return [...state, { routine: 'fetchTopicMessagesRoutine', error: action.payload }];
    default:
      return state;
  }
};

export default combineReducers({
  token,
  user,
  topics,
  messages,
  errors,
  router: connectRouter(history),
});
