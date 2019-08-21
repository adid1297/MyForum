import { createRoutine } from 'redux-saga-routines';

export const signUpRoutine = createRoutine('SIGN_UP');
export const logInRoutine = createRoutine('LOGIN');
export const createTopicRoutine = createRoutine('CREATE_TOPIC');
export const updateTopicRoutine = createRoutine('UPDATE_TOPIC');
export const deleteTopicRoutine = createRoutine('DELETE_TOPIC');
export const fetchTopicPageRoutine = createRoutine('FETCH_TOPIC_PAGE');
export const fetchTopicsFeedRoutine = createRoutine('FETCH_TOPICS_FEED');
export const createTopicMessageRoutine = createRoutine('CREATE_TOPIC_MESSAGE');
export const fetchTopicMessagesRoutine = createRoutine('FETCH_TOPIC_MESSAGES');
