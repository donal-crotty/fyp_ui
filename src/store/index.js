import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';

function reduxStore(initalState) {
  const composeEnhancers = compose;
  // eslint-disable-line window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  const store = createStore(reducers, initalState, composeEnhancers(
      applyMiddleware(routerMiddleware(hashHistory), thunk)));
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require(reducers); // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }
  return store;
}

export default reduxStore;
