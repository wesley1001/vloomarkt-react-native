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
} from 'react-native';

var Progress = require('react-native-progress');
var Icon = require('../node_modules/react-native-vector-icons/Ionicons');

var Discover = require('./Discover');
var News = require('./News');
var AdvancedSearch = require('./AdvancedSearch')
var RecentSearch = require('./utils/RecentSearch')

var API_CATEGORY_MAIN_URL = 'http://localhost:8000/api/category/'


class Search extends Component {

  constructor(props) {
      super(props);
      this.state = {
        searchCategory: 'all',
        searchTerm: 'SEARCH TERM',
      };
  }

  _handleAdvanceSearchPress(){
      this.props.navigator.push({
          title: "AdvancedSearch",
          component: AdvancedSearch,
          passProps: { searchTerm: this.state.searchTerm },
      });
    }

  _handCancelSearchPress(){
    this.props.navigator.popToTop();
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
              />
              <View style={styles.searchCancelButton}>
              <TouchableWithoutFeedback
                  onPress={this._handCancelSearchPress.bind(this)}
                >
              <View>
                <Text style={styles.searchCancelButtonText}>Cancel</Text>
              </View>
              </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={styles.advanceSearchHolder}>
              <View style={styles.advanceSearchButton}>
                <TouchableWithoutFeedback
                    onPress={this._handleAdvanceSearchPress.bind(this)}
                  >
                <View>
                  <Text style={styles.advanceSearchButtonText}>
                    <Icon name="ios-settings-strong" size={15}/>  ADVANCED SEARCH                                                   <Icon name="chevron-right" size={18}/>
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
    marginTop: 10,
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
    flex:1    
  },
  focused: {
    borderColor: 'blue'
  },
  searchCancelButton: {
    marginTop: 11,
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
  },


})


module.exports = Search;