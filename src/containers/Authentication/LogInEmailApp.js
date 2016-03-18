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
      <LogInEmail reducer={state.token}
        {...actions} />
    );
  }
}

export default connect(state => ({
    state: state.reducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(myActions, dispatch)
  })
)(LogInEmailApp);
