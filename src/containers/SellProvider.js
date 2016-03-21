import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import SellApp from './SellApp';
import store from './store';



export default class SellProvidor extends Component {
  render() {
    return (
      <Provider store={store}>
        <SellApp />
      </Provider>
    );
  }
}
