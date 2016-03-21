'use strict';


import React, {
  Component,
  StyleSheet,
  Navigator,
  Text,
  ScrollView,
  ListView,
  Image,
  View,
  TextInput,
  NavigatorIOS,
  TouchableWithoutFeedback,
  AlertIOS,
  TouchableOpacity,
} from 'react-native';

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

const Progress = require('react-native-progress');
const Icon = require('react-native-vector-icons/Ionicons');
const BackgroundGeolocation = require('react-native-background-geolocation');
const Banner = require("react-native-admob");


const AdvancedSearch = require('../components/AdvancedSearch')
const RecentSearch = require('../components/advanced_search/RecentSearch')


class Search extends Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
      // navigator.geolocation.getCurrentPosition(
      //   (position) => {
      //     var userLongitude = JSON.stringify(position.coords.longitude);
      //     this.setState({userLongitude});
      //     regionText.longitude = this.state.userLongitude
      //     var userLatitude = JSON.stringify(position.coords.latitude);
      //     this.setState({userLatitude});
      //     regionText.latitude = this.state.userLatitude
      //
      //   },
      //   (error) => alert(error.message),
      //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      // );
    }

  render() {
    const { actions, loggedIn, token, router, auth } = this.props;
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.searchBarHolder}>

              <TextInput style={styles.searchBar}
                placeholder={'Search Vloo..'}
                placeholderTextColor = '#808080'
                returnKeyType='search'
                keyboardAppearance='light'
                clearButtonMode='always'
              />
              <View style={styles.searchCancelButton}>
              <TouchableOpacity>
              <View>
                <Text style={styles.searchCancelButtonText}>Cancel</Text>
              </View>
              </TouchableOpacity>
              </View>
            </View>

            <View style={styles.advanceSearchHolder}>
              <View style={styles.advanceSearchButton}>
                <TouchableWithoutFeedback onPress={actions.routes.advanced()}>
                <View>
                  <Text style={styles.advanceSearchButtonText}>
                    <Icon name="ios-settings-strong" size={20}/>  ADVANCED SEARCH                                     <Icon name="chevron-right" size={18}/>
                  </Text>
                </View>
                </TouchableWithoutFeedback>
                </View>
            </View>
            <RecentSearch />
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6656c8',
    height: 20,
    width: 400,
  },
  searchBarHolder: {
    backgroundColor: '#6656c8',
    height: 40,
    width: 400,
    position: 'relative',
    flexDirection:'row'
  },
  searchBar: {
    width: 300,
    height: 20,
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: 'white',
    fontSize: 13,
    color: '#808080',
    fontWeight: '900',
    marginLeft: 8,
    textAlign: 'center',
  },
  cancelSearch: {
    textAlign:'center',
    flex:1,
  },
  focused: {
    borderColor: 'blue'
  },
  searchCancelButton: {
    marginTop: 10,
    marginLeft: 9,
  },
  searchCancelButtonText: {
    color: 'white',
    opacity: 0.9,
  },
  advanceSearchHolder: {
    backgroundColor: '#6656c8',
    flexDirection:'row',
  },
  advanceSearchButton:{
    marginLeft: 8,
    marginBottom: 5,
  },
  advanceSearchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
})


module.exports = Search;
