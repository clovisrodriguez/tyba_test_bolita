import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

const store: any = createStore(
  combineReducers({
    singUpForm: formReducer
  }),
  applyMiddleware(logger)
);

export default store;
