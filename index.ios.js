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

var Discover = require('./components/Discover');
var Search = require('./components/Search');
var News = require('./components/News');
var Sell = require('./components/Sell');
var Profile = require('./components/Profile');

var Icon = require('./node_modules/react-native-vector-icons/Ionicons');

class vloomarkt extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'ProfileTab',
      initialPosition: 'unkown',
    }
  }
  setTab(tabId){
    this.setState({selectedTab: tabId})
  }


  render(){
    return(
      <TabBarIOS tintColor="darkslateblue">

        <Icon.TabBarItem
        title="Discover"
        iconName="ios-star"
        selected={this.state.selectedTab === 'DiscoverTab'}
        onPress={() => this.setTab('DiscoverTab')}>

        <NavigatorIOS
          style={{flex: 1}}
          navigationBarHidden={true}
          initialRoute={{
            title: 'Discover',
            component: Discover
        }} />

        </Icon.TabBarItem>
        
        <Icon.TabBarItem
        selected={this.state.selectedTab === 'SearchTab'}
        onPress={() => this.setTab('SearchTab')}
        title="Search"
        iconName="ios-search-strong">
        
        <NavigatorIOS
          style={{flex: 1}}
          navigationBarHidden={true}
          initialRoute={{
            title: 'Search',
            component: Search
          }} />
        </Icon.TabBarItem>

        <Icon.TabBarItem
        selected={this.state.selectedTab === 'SellTab'}
        onPress={() => this.setTab('SellTab')}
        title="Sell"
        iconName="ios-camera">
        
        <NavigatorIOS
          style={{flex: 1}}
          navigationBarHidden={true}
          initialRoute={{
            title: 'Sell',
            component: Sell
        }} />

        </Icon.TabBarItem>

        <Icon.TabBarItem
        selected={this.state.selectedTab === 'NewsTab'}
        onPress={() => this.setTab('NewsTab')}
        iconName="ios-bell"
        title="News"
        badge={0}>

        <NavigatorIOS
          style={{flex: 1}}
          navigationBarHidden={true}
          initialRoute={{
            title: 'News',
            component: News
        }} />
        

        </Icon.TabBarItem>

        <Icon.TabBarItem
        selected={this.state.selectedTab === 'ProfileTab'}
        onPress={() => this.setTab('ProfileTab')}
        title="My Vloo"
        iconName="ios-person">
        
        <NavigatorIOS
          style={{flex: 1}}
          navigationBarHidden={true}
          initialRoute={{
            title: 'Profile',
            component: Profile
        }} />


        </Icon.TabBarItem>
      </TabBarIOS>
      );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin: 50,
    fontSize: 45
  }
});

AppRegistry.registerComponent('vloomarkt', () => vloomarkt);
