import { UPDATE_USER } from '../types';

export default function storeUserReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER: {
      return action.payload;
    }
    default:
      return state;
  }
}
