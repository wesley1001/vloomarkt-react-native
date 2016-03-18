'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TabBarIOS,
  NavigatorIOS,
  View,
  Navigator,
  AlertIOS
} from 'react-native';

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin: 50,
    fontSize: 45
  },
  container: {
    flex: 1,
  }
});

var Icon = require('react-native-vector-icons/Ionicons');
var Discover = require('../components/Discover');
var Search = require('../components/Search');
var AdvancedSearch = require('../components/AdvancedSearch');
// var News = require('../components/News');
var Sell = require('../components/Sell');
var Profile = require('../components/Profile');
var LogInEmail = require('../components/Authentication/LogInEmail');


import NewsProvidor from '../containers/NewsProvidor';
import LogInEmailProvider from '../containers/Authentication/LogInEmailProvider'
import {Scene, Router, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'


class TabIcon extends React.Component {
    render(){
    return (
      <View></View>
    );
  }
}

class MyApp extends React.Component {
    constructor(props){
      super(props);
      this.state = {
      selectedTab: 'news',
     }
    }

     discoverHandleChange(){
        this.setState({
        selectedTab: 'discover',
       })
      };

    searchHandleChange(){
      this.setState({
        selectedTab: 'search',
       })
     };

     newsHandleChange(){
      this.setState({
        selectedTab: 'news',
       })
     };

    render() {
      const { reducer, token, increment, decrement, savetoken } = this.props;
      return (
        <View style={styles.container}>
            <TabBarIOS tintColor="white"
        barTintColor="darkslateblue">
            <Icon.TabBarItem
                iconName="ios-star-outline"
                selectedIconName="ios-star"
                title="Discover"
                selected={this.state.selectedTab === "discover"}
                onPress={this.discoverHandleChange.bind(this)} >
                <View style={styles.main}>
                  <Discover />
                </View>
              </Icon.TabBarItem>

              <Icon.TabBarItem
                iconName="ios-search"
                selectedIconName="ios-search-strong"
                title="Search"
                selected={this.state.selectedTab === "search"}
                onPress={this.searchHandleChange.bind(this)} >
                <View style={styles.main}>

                  <NewsProvidor />
                </View>
              </Icon.TabBarItem>

            <Icon.TabBarItem
              iconName="ios-bell-outline"
              selectedIconName="ios-bell"
              title="News"
              selected={this.state.selectedTab === "news"}
              onPress={this.newsHandleChange.bind(this)} >
              <View style={styles.main}>
                <LogInEmailProvider />
              </View>
            </Icon.TabBarItem>
           </TabBarIOS>
      </View>
      );
    }
}

module.exports = MyApp;
