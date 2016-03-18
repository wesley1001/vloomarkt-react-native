import * as types from '../actions/actionTypes';

const initialState = {
  token: 'none!',
};



export default function reducer(state = initialState, action = {}) {
  var key;
  switch (action.type) {
    case types.UPDATE_TOKEN:
      return {
        ...state,
        token: action.value
      }
    default:
      return state;
  }
}
