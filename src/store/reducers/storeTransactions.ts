import {  UPDATE_TRANSACTIONS } from '../types';

export default function storeTransactionsReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_TRANSACTIONS: {
      return action.payload;
    }
    default:
      return state;
  }
}
