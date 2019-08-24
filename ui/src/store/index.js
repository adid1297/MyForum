import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';
import history from './history';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const store =  createStore(
  connectRouter(history)(reducers),
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(sagas);

export default store;
