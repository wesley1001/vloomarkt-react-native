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

import * as myActions from '../actions/actions';
import { connect } from 'react-redux';

var Icon = require('react-native-vector-icons/Ionicons');
import TabBarNavigator from 'react-native-tabbar-navigator';

import AdvancedSearch from '../components/AdvancedSearch';

import Discover from '../components/Discover';
import Sell from '../components/Sell'
import News from '../components/News';
import Search from '../components/Search';

import LogInEmail from '../components/Authentication/LogInEmail';
import LogInMain from '../components/Authentication/LogInMain';
import RegisterEmail from '../components/Authentication/RegisterEmail';





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
        <Router {...this.props}  initial="profile" >
          <Schema name="default" {...defaultSchema}/>
          <Route name="login" component={LogInEmail} />
          <Route name="register" component={RegisterEmail} />
          <Route name="advanced" component={AdvancedSearch} hideNavBar={true}/>
          <TabRoute name="tabBar" barTint='#FFFFFF' tint="#32DEAF">
            <Route name="discover" component={Discover} title="Discover" tabItem={{title: 'Discover'}} hideNavBar={true}/>
            <Route name="search" component={Search} title="Search" tabItem={{title: 'Search'}} hideNavBar={true}/>
            <Route name="sell" component={Sell} title="Discover" tabItem={{title: 'Sell'}} hideNavBar={true}/>
            <Route name="news" component={News} title="News" tabItem={{title: 'News'}} hideNavBar={true}/>
            <Route name="profile" component={LogInMain} title="Profile" tabItem={{title: 'Profile'}} hideNavBar={true}/>

          </TabRoute>

        </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VlooApp);
