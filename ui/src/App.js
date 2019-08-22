import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import store, { sagaMiddleware } from './store/';
import sagas from './store/sagas';

import Landing from './components/Landing/';
import Feed from './components/Feed/Feed';

sagaMiddleware.run(sagas);
const isAuthenticated = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Landing} />
        <PrivateRoute path="/feed" component={Feed} />
      </Router>
    </Provider>
  );
}

export default App;
