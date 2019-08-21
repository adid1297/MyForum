import { combineReducers } from 'redux';

const token = (state = '', action) => {
  switch (action.type) {
    default:
      return state
  }
};

const topics = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
};

const messages = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
};

const errors = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  token,
  topics,
  messages,
  errors,
});
