'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import MyApp from '../components/MyApp';
import News from '../components/News';

import * as myActions from '../actions/actions';
import { connect } from 'react-redux';


// @connect(state => ({
//   state: state.counter
// }))
class NewsApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <News token={state.token}
            username={state.username}
            category={state.selectedCategory}
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.authReducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(myActions, dispatch)
  })
)(NewsApp);
