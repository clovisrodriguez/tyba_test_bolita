import store from '../index';
import { UPDATE_USER } from '../types';

export default function updateUser(user) {
  store.dispatch({
    type: UPDATE_USER,
    payload: user
  });
}
