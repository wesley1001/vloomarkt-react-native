import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import DiscoverApp from './DiscoverApp';
import store from './store';



export default class DiscoverProvidor extends Component {
  render() {
    return (
      <Provider store={store}>
        <DiscoverApp />
      </Provider>
    );
  }
}
