import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

export const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
