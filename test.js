'user strict';


import React, {
  Component,
  StyleSheet,
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

var Progress = require('react-native-progress');
var Icon = require('react-native-vector-icons/Ionicons');
var BackgroundGeolocation = require('react-native-background-geolocation');
var Banner = require("react-native-admob");
var Actions = require('react-native-router-flux').Actions;


var Discover = require('./Discover');
var News = require('./News');
var AdvancedSearch = require('./AdvancedSearch')
var RecentSearch = require('./advanced_search/RecentSearch')




var API_CATEGORY_MAIN_URL = 'http://localhost:8000/api/category/'

var regionText = {
    latitude: '0',
    longitude: '0',
    latitudeDelta: '0',
    longitudeDelta: '0',
};


class Search extends Component {

  constructor(props) {
      super(props);
      this.state = {
        searchCategory: 'all',
        searchTerm: undefined,
        initialPosition: 'unkown',
        userLongitude: 0,
          userLatitude: 0,
          region: {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
        }
      };
  }

  componentWillMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          var userLongitude = JSON.stringify(position.coords.longitude);
          this.setState({userLongitude});
          regionText.longitude = this.state.userLongitude
          var userLatitude = JSON.stringify(position.coords.latitude);
          this.setState({userLatitude});
          regionText.latitude = this.state.userLatitude

        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );

      this.setState({
        region: {
          latitude: parseFloat(regionText.latitude),
          longitude: parseFloat(regionText.longitude),
          latitudeDelta: 0.4,
          longitudeDelta: 0.4,
        },
      });

    }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <View style={styles.searchBarHolder}>

              <TextInput style={styles.searchBar}
                placeholder={'Search Vloo..'}
                placeholderTextColor = '#808080'
                returnKeyType='search'
                keyboardAppearance='light'
                onChangeText={(searchTerm) => this.setState({searchTerm})}
                value={this.state.searchTerm}
                clearButtonMode='always'
              />
              <View style={styles.searchCancelButton}>
              <TouchableOpacity
                  onPress={Actions.news}
                >
              <View>
                <Text style={styles.searchCancelButtonText}>Cancel</Text>
              </View>
              </TouchableOpacity>
              </View>
            </View>

            <View style={styles.advanceSearchHolder}>
              <View style={styles.advanceSearchButton}>
                <TouchableWithoutFeedback
                    onPress={Actions.advancedSearch}
                  >
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
