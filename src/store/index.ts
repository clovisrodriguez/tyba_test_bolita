import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import storeUserReducer from './reducers/storeUser';
import storeTransactionsReducer from './reducers/storeTransactions'

const store: any = createStore(
  combineReducers({
    user: storeUserReducer,
    transactions: storeTransactionsReducer
  }),
  applyMiddleware(logger)
);

export default store;
