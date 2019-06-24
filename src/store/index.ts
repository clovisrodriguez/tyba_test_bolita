import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import storeUserReducer from './reducers/storeUser';

const store: any = createStore(
  combineReducers({
    user: storeUserReducer
  }),
  applyMiddleware(logger)
);

export default store;
