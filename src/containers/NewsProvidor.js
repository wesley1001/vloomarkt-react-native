import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import NewsApp from './NewsApp';

import store from './store';



export default class NewsProvidor extends Component {
  render() {
    return (
      <Provider store={store}>
        <NewsApp />
      </Provider>
    );
  }
}
