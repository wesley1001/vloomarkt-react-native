'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import News from '../components/News';

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


class NewsApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <News
        {...actions} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsApp);
