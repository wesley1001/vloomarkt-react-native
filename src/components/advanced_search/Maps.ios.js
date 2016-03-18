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



class Maps extends Component {
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

	    

	    
  	}	


  	_onPressButton(){
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
	      		userCountryName: data[0].locality + ", " + data[0].country,
	    	});
		});
  	}

	render(){

		var countyName;

    if (this.state.userCountryName) { 
      countyName = 
      <Text>{this.state.userCountryName}</Text>

    ;}

    else { countyName = 
    	<Text>Current Location</Text>

    ;}
		

		return(
			<View style={styles.container}>
			<View style={styles.mapTextLocationHolder}>
				<TouchableWithoutFeedback
                  onPress={this._onPressButton.bind(this)}
                >
					<Text style={styles.mapCurrentLocationTextHelper}>
						<Icon name="ios-location" size={20} style={{color:'#6656c8'}}/>
						<Text style={styles.mapCurrentLocationText}>  {countyName} <Icon name="ios-arrow-forward" size={15} style={{color:'#8b8b8b', opacity: 0.4, marginLeft: 100,}}/></Text>
						 {"\n"}Tap here the to change to your current location. 
					 </Text>
				</TouchableWithoutFeedback>
			</View>	

				  <MapView
			          style={styles.map}
			          showsUserLocation={true}
			          followUserLocation={true}
			          scrollEnabled={true}
			          rotateEnabled={true}
			          pitchEnabled={true}
			          minDelta={0}
			          maxDelta={3}
			          showsPointsOfInterest={false}
			          region={this.props.region}
			        />
			</View>
		);
	}
}


var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
	    height: 150,
	    width: 380,
	    marginTop: 5,
	},
	mapTextLocationHolder: {
		marginTop: 5,
		position: 'relative',
	    flexDirection:'row',
	},
	mapCurrentLocationText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#535354',
		marginLeft: 8,
		
	},
	mapCurrentLocationTextHelper: {
		marginLeft: 10,
		fontSize: 8,
	}

});


module.exports = Maps;
