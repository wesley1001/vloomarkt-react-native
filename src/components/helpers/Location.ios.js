'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TouchableWithoutFeedback,
  View,
  MapView,
  AlertIOS,
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');
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



class Location extends Component {
	constructor(props){
		super(props);
    	this.state = {
    		userLongitude: 0,
      		userLatitude: 0,
      		region: {
		        latitude: 0,
		        longitude: 0,
		        latitudeDelta: 0,
		        longitudeDelta: 0,
		    },
		    userCountryName: undefined,
		};
	}

	componentWillMount() {
	    navigator.geolocation.getCurrentPosition(
	      (position) => {

	        var userLongitude = JSON.stringify(position.coords.longitude);
	        this.setState({userLongitude});
	        regionText.longitude = this.state.userLongitude;
	        COUNTRY.longitude = this.state.userLongitude;

	        var userLatitude = JSON.stringify(position.coords.latitude);
	        this.setState({userLatitude});
	        regionText.latitude = this.state.userLatitude;
	        COUNTRY.longitude = this.state.userLongitude;

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

	    this.setState({
	      region: {
	        latitude: parseFloat(regionText.latitude),
	        longitude: parseFloat(regionText.longitude),
	        latitudeDelta: 0.4,
	        longitudeDelta: 0.4,
	      },
	    });

	    COUNTRY.longitude = parseFloat(regionText.longitude);
	    COUNTRY.latitude = parseFloat(regionText.latitude);

	    RNGeocoder.reverseGeocodeLocation(COUNTRY, (err, data) => {
		  if (err) {
		    return;
		  }
		  this.setState({
	      		userCountryName: data[0].locality,
	    	});
		});

  	}

  	getUserLocationName(){
  		this.setState({
	      region: {
	        latitude: parseFloat(regionText.latitude),
	        longitude: parseFloat(regionText.longitude),
	        latitudeDelta: 0.4,
	        longitudeDelta: 0.4,
	      },
	    });

	    COUNTRY.longitude = parseFloat(regionText.longitude);
	    COUNTRY.latitude = parseFloat(regionText.latitude);

	    RNGeocoder.reverseGeocodeLocation(COUNTRY, (err, data) => {
		  if (err) {
		    return;
		  }
		  console.log(data);

		  this.setState({
	      		userCountryName: data[0].locality,
	    	});
		});

		return this.state.userCountryName;
  	}


	render(){
		var countyName;

	    if (this.state.userCountryName) {
	      countyName =
	      <Text>{this.state.userCountryName}</Text>

	    ;}

	    else { countyName =
	    	<Text>YOU</Text>

	    ;}
		return(
			<Text>{countyName}</Text>
		);
	}
}


var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});


module.exports = Location;
