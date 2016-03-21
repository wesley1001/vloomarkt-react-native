import React, { Component, TouchableOpacity,Text, AlertIOS } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import SearchApp from './SearchApp';
import AdvancedSearch from '../components/AdvancedSearch';
import store from './store';



export default class SearchProvidor extends Component {
  render() {
    return (
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
  }
}
