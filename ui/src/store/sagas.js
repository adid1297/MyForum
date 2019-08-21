import { call, put, all, apply, takeLatest } from 'redux-saga/effects'
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

  console.log(uri, init);

  try {
    console.log(uri, init);
    const response = yield call(fetch, uri, init);
    console.log(response);
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
    const { password, email } = action.payload;
    const { token } = yield call(apiCall, 'user/login', 'POST', { password, email });
    console.log('token');
    yield put(fetchTopicFeedRoutine.trigger({ token }));
    yield put(signUpRoutine.success(token));
  } catch (error) {
    yield put(logInRoutine.failure(error));
  }
}

function* fetchTopicFeedSaga(action) {
  try {
    const { token, count = 5, offset = 0 } = action.payload;
    const uri = `topics?count=${count}&offset=${offset}`;
    // const { data } = yield call(apiCall, uri, 'GET', { token });
    const { data } = {
      "data": [
        {
          "created_at": "2019-08-21T12:20:29.730922+00:00",
          "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
          "description": "Sweet Creature",
          "id": "5d867c9c-6a1e-4a7f-a82f-ecf60a96209e",
          "subject": "Imma Put Messages Here",
          "updated_at": "2019-08-21T12:20:29.730929+00:00",
          "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
        }
      ]
    };
    yield put(fetchTopicFeedRoutine.success(data));
  } catch (error) {
    yield put(fetchTopicFeedRoutine.failure(error));
  }
}

// FETCH SINGLE TOPIC DOESN'T EXIST YET
function* fetchTopicSaga(action) {
  try {
    const { topicId } = action.payload;
    // const topicData = yield call(apiCall, `topic/${topicId}`, 'GET');
    const topicData = {
      "created_at": "2019-08-21T12:20:29.730922+00:00",
      "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
      "description": "Sweet Creature",
      "id": `${topicId}`,
      "subject": "Imma Put Messages Here",
      "updated_at": "2019-08-21T12:20:29.730929+00:00",
      "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
    };
    yield put(fetchTopicRoutine.success(topicData));
  } catch (error) {
    yield put(fetchTopicRoutine.failure(error));
  }
}

function* fetchTopicMessagesSaga(action) {
  try {
    const { topicId } = action.payload;
    // const { data } = yield call(apiCall, `topic/${topicId}/messages`, 'GET');
    const { data } = {
      "data": [
        {
          "created_at": "2019-08-21T22:37:55.084357+00:00",
          "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
          "id": "31a8d149-5e96-4dd3-a57a-537d6523c949",
          "message": "imma yeet you",
          "topic_id": `${topicId}`,
          "updated_at": "2019-08-21T22:37:55.084362+00:00",
          "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
        }
      ]
    };
    yield put(fetchTopicMessagesRoutine.success(data));
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
    // const { token, subject, description } = action.payload;
    const payload = {
      "token": "{{token}}",
      "subject": "Imma Put Messages Here",
      "description": "Sweet Creature"
    };
    const newTopic = yield call(apiCall, `topic`, 'POST', payload);
    yield put(createTopicRoutine.success(newTopic));
  } catch (error) {
    yield put(createTopicRoutine.failure(error));
  }
}

function* createTopicMessageSaga(action) {
  try {
    const { token, message, topicId } = action.payload;
    const topicMessage = yield call(apiCall, `topic/${topicId}/message`, 'POST', {
      token, message
    });
    yield put(createTopicMessageRoutine.success(topicMessage));
  } catch (error) {
    yield put(createTopicMessageRoutine.failure(error));
  }
}

function* updateTopicSaga(action) {
  try {
    const { token, subject, description, topicId } = action.payload;
    const payload = {
      "token": token,
      "subject": `${subject} EDIT`,
      "description": `${description} EDIT`
    };
    const patchedTopic = yield call(apiCall, `topic/${topicId}`, 'PATCH', payload);
    yield put(createTopicRoutine.success(patchedTopic));
  } catch (error) {
    yield put(createTopicRoutine.failure(error));
  }
}

function* deleteTopicSaga(action) {
  try {
    const { token, topicId } = action.payload;
    const payload = {
      "token": token
    };
    const deletedTopic = yield call(apiCall, `topic/${topicId}`, 'DELETE', payload);
    yield put(deleteTopicRoutine.success(deletedTopic));
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