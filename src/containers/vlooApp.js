'use strict';

import React, { Component } from 'react-native';

import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux';


import {bindActionCreators} from 'redux';
import News from '../components/News';

import * as myActions from '../actions/actions';
import { connect } from 'react-redux';

var Icon = require('react-native-vector-icons/Ionicons');
import TabBarNavigator from 'react-native-tabbar-navigator';

import DiscoverProvider from '../containers/DiscoverProvider';
import SellProvider from '../containers/SellProvider'
import NewsProvider from '../containers/NewsProvider';
import SearchProvider from '../containers/SearchProvider';

import LogInEmailProvider from '../containers/Authentication/LogInEmailProvider'
import LogInMainProvider from '../containers/Authentication/LogInMainProvider'




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

const defaultSchema = {
  navBar: NavBar,
  navLeftColor: '#FFFFFF',
  navTint: '#224655',
  navTitleColor: '#FFFFFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
  },
  statusStyle: 'light-content',
  tabBar: TabBar,
};


class VlooApp extends Component {
    constructor(props){
      super(props);
    }

    render() {
      return (
        <Router {...this.props} >
          <Schema name="default" {...defaultSchema} />
          <TabRoute name="tabBar" barTint='#FFFFFF' tint="#32DEAF">
            <Route name="discover" component={DiscoverProvider} title="Discover" tabItem={{title: 'Discover'}} hideNavBar={true}/>
            <Route name="search" component={SearchProvider} title="Search" tabItem={{title: 'Search'}} hideNavBar={true}/>
            <Route name="sell" component={SellProvider} title="Discover" tabItem={{title: 'Sell'}} hideNavBar={true}/>
            <Route name="news" component={NewsProvider} title="News" tabItem={{title: 'News'}} hideNavBar={true}/>
            <Route name="profile" component={LogInMainProvider} title="Profile" tabItem={{title: 'Profile'}} hideNavBar={true}/>
          </TabRoute>
        </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VlooApp);
