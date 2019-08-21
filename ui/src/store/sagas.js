import { call, put, all, apply, takeLatest } from 'redux-saga/effects'
import {
  signUpRoutine,
  logInRoutine,
  createTopicRoutine,
  updateTopicRoutine,
  deleteTopicRoutine,
  fetchTopicPageRoutine,
  fetchTopicsFeedRoutine,
  createTopicMessageRoutine,
  fetchTopicMessagesRoutine,
} from './actions';

class StatusCodeError extends Error {
  constructor(message, code) {
   super(message);
   this.code = code;
  }
}

function* apiCall(endpoint, method = 'GET', body = null) {
  const uri = `http://localhost:5000/${endpoint}`;
  let init = { method };
  if (body) {
    init = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
  };

  try {
    const response = yield call(fetch, uri, init);
    if (response.status > 201) {
      throw new StatusCodeError(
        `Failed API request: [${method}] "${endpoint}"`,
        response.status
      );
    };

    const responseBody = yield apply(response, response.json);
    console.log(responseBody);
    return responseBody;
  } catch (error) {
    throw error;
  }
}

function* signUpSaga(action) {
  try {
    const { name, password, email } = action.payload;
    yield call(apiCall, 'user/register', 'POST', { name, password, email });
    yield put(logInRoutine.trigger({ password, email }));
    yield put(signUpRoutine.success());
  } catch (error) {
    yield put(signUpRoutine.failure(error));
  }
}

function* logInSaga(action) {
  try {
    const { token } = yield call(apiCall, 'user/login', 'POST', action.payload);
    yield put(signUpRoutine.success(token));
  } catch (error) {
    yield put(logInRoutine.failure(error));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(signUpRoutine.TRIGGER, signUpSaga),
    takeLatest(logInRoutine.TRIGGER, logInSaga),
  ]);
}

export default rootSaga;