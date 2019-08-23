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
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  };

  if (payload && method !== 'GET') {
    init['body'] = JSON.stringify(payload);
    headers['Content-Type'] = 'application/json';
  };

  init = { ...init, headers };

  try {
    const response = yield call(fetch, uri, init);
    if (response.status > 201) {
      throw new StatusCodeError(
        `Failed API request: [${method}] "${endpoint}"`,
        response.status
      );
    };

    const responseBody = yield apply(response, response.json);
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
    console.log(password, email);
    const { token } = yield call(apiCall, 'user/login', 'POST', { password, email });
    yield put(logInRoutine.success(token));
  } catch (error) {
    yield put(logInRoutine.failure(error));
  }
}

function* fetchTopicFeedSaga(action) {
  try {
    // const { token, count = 5, offset = 0 } = action.payload;
    // const uri = `topics?count=${count}&offset=${offset}`;
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
        },
        {
          "created_at": "2019-08-21T12:20:29.730922+00:00",
          "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
          "description": "Lover",
          "id": "5d867c9c-6a1e-4a7f-a82f-ecf60a96209f",
          "subject": "By Taylor Swift",
          "updated_at": "2019-08-21T12:20:29.730929+00:00",
          "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
        },
        {
          "created_at": "2019-08-21T12:20:29.730922+00:00",
          "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
          "description": "To hoodlums and hoodwinks",
          "id": "5d867c9c-6a1e-4a7f-a82f-ecf60a96209g",
          "subject": "Bedtime stories for the child at heart",
          "updated_at": "2019-08-21T12:20:29.730929+00:00",
          "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
        },
        {
          "created_at": "2019-08-21T12:20:29.730922+00:00",
          "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
          "description": "Das roflor",
          "id": "5d867c9c-6a1e-4a7f-a82f-ecf60a96209h",
          "subject": "Was that a meme",
          "updated_at": "2019-08-21T12:20:29.730929+00:00",
          "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
        },
        {
          "created_at": "2019-08-21T12:20:29.730922+00:00",
          "created_by": "90631436-d036-45cd-8241-38b06409bc6a",
          "description": "Penis",
          "id": "5d867c9c-6a1e-4a7f-a82f-ecf60a96209i",
          "subject": "Thank you for coming to my ted talk",
          "updated_at": "2019-08-21T12:20:29.730929+00:00",
          "updated_by": "90631436-d036-45cd-8241-38b06409bc6a"
        }
      ]
    };

    const topicFeed = data.reduce((feed, topic) => ({
      ...feed, [topic.id]: topic
    }), {});
    yield put(fetchTopicFeedRoutine.success(topicFeed));
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
    yield put(fetchTopicRoutine.success({ [topicId]: topicData }));
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
    yield put(createTopicMessageRoutine.success({ [topicMessage.id]: topicMessage }));
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