'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import LogInEmail from '../../components/Authentication/LogInEmail';

import * as myActions from '../../actions/actions';
import { connect } from 'react-redux';


class LogInEmailApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <LogInEmail token={state.token}
                  username={state.username}
                  selectedCategory={state.selectedCategory}
                  searchTitle={state.searchTitle}
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
)(LogInEmailApp);
