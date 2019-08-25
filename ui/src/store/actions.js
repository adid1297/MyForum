import { createRoutine } from 'redux-saga-routines';

export const signUpRoutine = createRoutine('SIGN_UP');
export const logInRoutine = createRoutine('LOGIN');
export const getUserRoutine = createRoutine('GET_USER');
export const logOutRoutine = createRoutine('LOGOUT');
export const fetchTopicRoutine = createRoutine('FETCH_TOPIC');
export const createTopicRoutine = createRoutine('CREATE_TOPIC');
export const updateTopicRoutine = createRoutine('UPDATE_TOPIC');
export const deleteTopicRoutine = createRoutine('DELETE_TOPIC');
export const fetchTopicPageRoutine = createRoutine('FETCH_TOPIC_PAGE');
export const fetchTopicFeedRoutine = createRoutine('FETCH_TOPIC_FEED');
export const createTopicMessageRoutine = createRoutine('CREATE_TOPIC_MESSAGE');
export const fetchTopicMessagesRoutine = createRoutine('FETCH_TOPIC_MESSAGES');

export default {
  signUpRoutine,
  logInRoutine,
  fetchTopicRoutine,
  createTopicRoutine,
  updateTopicRoutine,
  deleteTopicRoutine,
  fetchTopicPageRoutine,
  fetchTopicFeedRoutine,
  createTopicMessageRoutine,
  fetchTopicMessagesRoutine,
  getUserRoutine,
  logOutRoutine,
};
