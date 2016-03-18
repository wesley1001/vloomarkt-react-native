import * as types from './actionTypes';

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}

export function updateToken(token) {
  return {
    type: types.UPDATE_TOKEN,
    value: token
  };
}
