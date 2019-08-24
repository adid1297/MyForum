import React from 'react';
import { Provider } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store from './store/';
import history from './store/history';

import Landing from './components/Landing/';
import Feed from './components/Feed/';
import TopicPage from './components/TopicPage';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={withRouter(Landing)} />
        <Route path="/feed" component={withRouter(Feed)} />
        <Route path="/topic/:id" component={withRouter(TopicPage)} />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
