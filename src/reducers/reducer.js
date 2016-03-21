import * as types from '../actions/actionTypes';

const initialState = {
  selectedTab: 'discover',
  token: 'NONE!',
  username: null,
  loggedIn: false,
  searchKeyword: '',
  selectedCategory: '',
  searchTitle: '',
  discoverResponse: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SELECT_TAB:
      return {
        ...state,
        selectedTab: action.value
      }
    case types.UPDATE_TOKEN:
      return {
        ...state,
        token: action.value
      }
    case types.CHANGE_LOGIN_STATUS:
      return {
        ...state,
        loggedIn: action.value
      }
    case types.SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: action.value
      }
    case types.GET_ITEM_BY_CATEGORY:
      return {
        ...state,
        discoverResponse: action.value
      }
    default:
      return state;
  }
}
