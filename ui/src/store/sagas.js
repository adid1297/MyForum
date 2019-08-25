import { push } from 'connected-react-router';
import { call, put, all, apply, select, takeLatest } from 'redux-saga/effects';
import {
  signUpRoutine,
  logInRoutine,
  createTopicRoutine,
  updateTopicRoutine,
  deleteTopicRoutine,
  fetchTopicRoutine,
  fetchTopicPageRoutine,
  fetchTopicFeedRoutine,
  createTopicMessageRoutine,
  fetchTopicMessagesRoutine,
} from './actions';

class StatusCodeError extends Error {
  constructor(message, code) {
   super(message);
   this.code = code;
  }
}

function* apiCall(endpoint, method = 'GET', payload = null) {
  const uri = `http://localhost:5000/${endpoint}`;
  const headers = {};
  let init = { method };

  const token = yield select(state => state.token);
  console.log(token);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  };

  if (payload && method !== 'GET') {
    init['body'] = JSON.stringify(payload);
    headers['Content-Type'] = 'application/json';
  };

  init = { ...init, headers };

  try {
    console.log('Requesting', uri, init);
    const response = yield call(fetch, uri, init);
    console.log('Response', response);
    if (response.status > 201) {
      throw new StatusCodeError(
        `Failed API request: [${method}] "${endpoint}"`,
        response.status
      );
    };

    const responseBody = yield apply(response, response.json);
    console.log('Response Body', responseBody);
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
    const { password, email } = action.payload;
    const { token } = yield call(apiCall, 'user/login', 'POST', { password, email });
    yield put(logInRoutine.success(token));
    yield put(push('/feed'));
  } catch (error) {
    yield put(logInRoutine.failure(error));
  }
}

function* fetchTopicFeedSaga() {
  try {
    const { data } = yield call(apiCall, `topics`, 'GET');
    const topicFeed = data.reduce((feed, topic) => ({
      ...feed, [topic.id]: topic
    }), {});
    yield put(fetchTopicFeedRoutine.success(topicFeed));
  } catch (error) {
    yield put(fetchTopicFeedRoutine.failure(error));
  }
}

function* fetchTopicSaga(action) {
  try {
    const { topicId } = action.payload;
    const topicData = yield call(apiCall, `topic/${topicId}`, 'GET');
    yield put(fetchTopicRoutine.success({ [topicId]: topicData }));
  } catch (error) {
    yield put(fetchTopicRoutine.failure(error));
  }
}

function* fetchTopicMessagesSaga(action) {
  try {
    const { topicId } = action.payload;
    const { data } = yield call(apiCall, `topic/${topicId}/messages`, 'GET');
    const topicMessages = data.reduce((messages, message) => ({
      ...messages, [message.id]: message
    }), {});
    yield put(fetchTopicMessagesRoutine.success(topicMessages));
  } catch (error) {
    yield put(fetchTopicMessagesRoutine.failure(error));
  }
}

function* fetchTopicPageSaga(action) {
  try {
    const { topicId } = action.payload;
    yield all([
      put(fetchTopicRoutine.trigger({ topicId })),
      put(fetchTopicMessagesRoutine.trigger({ topicId })),
    ]);
    yield put(fetchTopicPageRoutine.success());
  } catch (error) {
    yield put(fetchTopicPageRoutine.failure(error));
  }
}

function* createTopicSaga(action) {
  try {
    const { subject, description } = action.payload;
    const newTopic = yield call(apiCall, `topic`, 'POST', { subject, description });
    yield put(createTopicRoutine.success(newTopic));
  } catch (error) {
    yield put(createTopicRoutine.failure(error));
  }
}

function* createTopicMessageSaga(action) {
  try {
    const { message, topicId } = action.payload;
    const topicMessage = yield call(
      apiCall, `topic/${topicId}/message`, 'POST', { message }
    );
    yield put(createTopicMessageRoutine.success(
      { [topicMessage.id]: topicMessage }
    ));
  } catch (error) {
    yield put(createTopicMessageRoutine.failure(error));
  }
}

function* updateTopicSaga(action) {
  try {
    const { subject, description, topicId } = action.payload;
    const patchedTopic = yield call(
      apiCall, `topic/${topicId}`, 'PATCH',
      { subject, description }
    );
    yield put(updateTopicRoutine.success({ topicId: patchedTopic }));
  } catch (error) {
    yield put(updateTopicRoutine.failure(error));
  }
}

function* deleteTopicSaga(action) {
  try {
    const { topicId } = action.payload;
    const deletedTopic = yield call(apiCall, `topic/${topicId}`, 'DELETE');
    yield put(deleteTopicRoutine.success(deletedTopic));
    yield put(push('/feed'));
  } catch (error) {
    yield put(deleteTopicRoutine.failure(error));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(signUpRoutine.TRIGGER, signUpSaga),
    takeLatest(logInRoutine.TRIGGER, logInSaga),
    takeLatest(createTopicRoutine.TRIGGER, createTopicSaga),
    takeLatest(updateTopicRoutine.TRIGGER, updateTopicSaga),
    takeLatest(deleteTopicRoutine.TRIGGER, deleteTopicSaga),
    takeLatest(fetchTopicRoutine.TRIGGER, fetchTopicSaga),
    takeLatest(createTopicMessageRoutine.TRIGGER, createTopicMessageSaga),
    takeLatest(fetchTopicMessagesRoutine.TRIGGER, fetchTopicMessagesSaga),
    takeLatest(fetchTopicFeedRoutine.TRIGGER, fetchTopicFeedSaga),
    takeLatest(fetchTopicPageRoutine.TRIGGER, fetchTopicPageSaga),
  ]);
}

export default rootSaga;