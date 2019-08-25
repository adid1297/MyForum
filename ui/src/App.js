import React from 'react';
import { Provider } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import store from './store/';
import history from './store/history';

import Landing from './components/LandingPage';
import FeedPage from './components/FeedPage';
import TopicPage from './components/TopicPage';
import ErrorSnackbar from './components/Errors';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={withRouter(Landing)} />
        <Route path="/feed" component={withRouter(FeedPage)} />
        <Route path="/topic/:id" component={withRouter(TopicPage)} />
      </ConnectedRouter>
      <ErrorSnackbar />
    </Provider>
  );
}

export default App;
