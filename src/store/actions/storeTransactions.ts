import store from '../index';
import { UPDATE_TRANSACTIONS } from '../types';
import { UpdateTransactionInput } from '../../API';

export default function updateTransactions(trasactions: Array<UpdateTransactionInput>) {
  store.dispatch({
    type: UPDATE_TRANSACTIONS,
    payload: trasactions
  });
}
