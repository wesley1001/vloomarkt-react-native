'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  MapView,

} from 'react-native';

var Icon = require('../node_modules/react-native-vector-icons/Ionicons');
var Maps = require('./advanced_search/Maps');
var Categories = require('./advanced_search/Categories');
var RNGeocoder = require('react-native-geocoder');



var regionText = {
  latitude: '0',
  longitude: '0',
  latitudeDelta: '0',
  longitudeDelta: '0',
};

var COUNTRY = {
	latitude: 0,
	longitude: 0
};


class AdvancedSearch extends Component {

	constructor(props) {
      super(props);
      this.state = {
      		searchCategory: this.props.searchCategory,
        	searchTerm: this.props.searchTerm,
        	region: this.props.region,
        	dataSource: undefined,
        	loaded: false,
    	};
  	}

  	componentWillMount() {
	    navigator.geolocation.getCurrentPosition(
	      (position) => {

	        var userLongitude = JSON.stringify(position.coords.longitude);
	        this.setState({userLongitude});
	        regionText.longitude = this.state.userLongitude;

	        var userLatitude = JSON.stringify(position.coords.latitude);
	        this.setState({userLatitude});
	        regionText.latitude = this.state.userLatitude;

	        this.setState({
		      region: {
		        latitude: parseFloat(regionText.latitude),
		        longitude: parseFloat(regionText.longitude),
		        latitudeDelta: 0.4,
		        longitudeDelta: 0.4,
		      },
		    });


	        
	      },
	      (error) => alert(error.message),
	      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
	    );

	    
  	}	



  	_GoBackToSearchPress(){
    	this.props.navigator.pop();
  	}

  	_SearchPress(){

  	}

	render(){
		return(
			<View style={styles.container}>

				<View style={styles.header}></View> 

				<View style={styles.mainNav}>
	                <View style={styles.goBackToSearchButton}>
		            	<TouchableWithoutFeedback
		                	onPress={this._GoBackToSearchPress.bind(this)}
		            	>
			            	<View>
			            		<Text style={styles.searchCancelButtonText}>
			            			<Icon name="ios-arrow-left" size={30} style={{color:'#fff', marginTop: 10}}/>
			            		</Text>
			            	</View>
		            	</TouchableWithoutFeedback>
	              	</View>
	              	<Text style={styles.mainNavHeader}> Advanced Search</Text>

	              	<TouchableWithoutFeedback
		                	onPress={this._SearchPress.bind(this)}
		            	>
			            	<View>
			            		<Text style={styles.searchButton}>
			            			Search
			            		</Text>
			            	</View>
		            	</TouchableWithoutFeedback>
		        </View>


		        <View style={styles.searchBarSection}>
		        	<Icon name="ios-search-strong" size={25} style={{color:'#6656c8'}}/>
		        	<TextInput style={styles.searchBar}
		                placeholder={'What are you searching for?'}
		                placeholderTextColor = '#808080'
		                returnKeyType='search'
		                keyboardAppearance='light'
		                onChangeText={(searchTerm) => this.setState({searchTerm})}
		                value={this.state.searchTerm}
		                clearButtonMode='always'
		              />
		             
		        </View>

		        <View style={styles.divider}></View>

		        <View style={styles.location}> 
		        	<Maps region={this.state.region}/>
		        </View>

		        <View style={styles.divider}></View>

		        <Categories />

	        </View>
		);
	}
  }


var styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#f5f5f8',
	},
	header: {
	    backgroundColor: '#6656c8',
	    height: 20,
	    width: 400,
	},
	goBackToSearchButtonText:{
		fontSize: 25,
		color: 'red'
	},
	mainNav: {
		backgroundColor: '#6656c8',
	    height: 40,
	    width: 400,
	    position: 'relative',
	    flexDirection:'row',
	    alignItems: 'center'
	},
	goBackToSearchButton: {
		margin: 5,
		marginLeft: 9,
	},
	mainNavHeader: {
		color: '#fff',
		fontWeight: '500',
		fontSize: 17,
		textAlign: 'center',
		marginLeft: 90,
		marginTop: -3,
	},
	searchButton: {
		color: '#fff',
		fontWeight: '700',
		marginLeft: 60,
	},
	searchBarSection: {
		height: 40,
	    position: 'relative',
	    flexDirection:'row',
	    margin: 5,
	    marginBottom: -9,
	},
	searchBar: {
		width: 300,
	    height: 25,
	    fontSize: 16,
	    color: '#808080',
	    fontWeight: '900',
	    marginLeft: 5,
	    marginTop: 5,
	},
	divider: {
		borderBottomColor: '#808080',
		borderBottomWidth: 1,
		height: 1,
		width: 350,
		opacity: 0.2,
		marginLeft: 11,
		marginTop: 5,
		alignItems: 'center'
	},
	maps: {
		
	}

});


module.exports = AdvancedSearch;
