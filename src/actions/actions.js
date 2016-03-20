import * as types from './actionTypes';
import axios from 'axios';

const ROOT_URL = 'http://dev.ondernemer.io/api/'

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

export function checkLoginStatus(status) {
  return {
    type: types.CHECK_LOGIN_STATUS,
    value: status
  };
}

export function selectCategory(selected_category){
  return {
    type: types.SELECT_CATEGORY,
    value: selected_category
  }
}

export function getItemsByCategory(title='',category='') {
  const url = `${ROOT_URL}item/?title=${title}&category=${category}`
  var request;
  axios.get(url)
  .then(function (response) {
    request = response.data;
    console.log(response);
  })
  .catch(function (response) {
    if (response instanceof Error) {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', response.message);
    } else {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.log(response.data);
      console.log(response.status);
      console.log(response.headers);
      console.log(response.config);
    }
  });
  return {
    type: types.GET_ITEM_BY_CATEGORY,
    value: request
  };
}
