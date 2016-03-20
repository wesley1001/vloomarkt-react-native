import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../../reducers';
import LogInEmailApp from './LogInEmailApp';

import store from '../store';

export default class LogInEmailProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <LogInEmailApp />
      </Provider>
    );
  }
}
