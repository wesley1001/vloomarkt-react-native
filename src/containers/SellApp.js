'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import Sell from '../components/Sell';

import * as myActions from '../actions/actions';
import { connect } from 'react-redux';

import {
  actions as routerActions,
} from 'react-native-router-redux';

const mapStateToProps = state => ({
  router: state.router,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...routerActions,
    ...myActions,
  }, dispatch),
  dispatch,
});

class SellApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Sell
        {...actions} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellApp);
