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

var Icon = require('../../node_modules/react-native-vector-icons/Ionicons');

var regionText = {
	  latitude: '0',
	  longitude: '0',
	  latitudeDelta: '0',
	  longitudeDelta: '0',
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


  	_onPressButton(){
        console.log(regionText.latitude, regionText.longitude)

        this.setState({
	      region: {
	        latitude: parseFloat(regionText.latitude),
	        longitude: parseFloat(regionText.longitude),
	        latitudeDelta: 0.4,
	        longitudeDelta: 0.4,
	      },
	    });
	    console.log(this.state.region, "region state");
  	}

	render(){
		
		return(
			<View style={styles.container}>
			<View style={styles.mapTextLocationHolder}>
				<TouchableWithoutFeedback
                  onPress={this._onPressButton.bind(this)}
                >
					<Text style={styles.mapCurrentLocationTextHelper}>
						<Icon name="ios-location" size={20} style={{color:'#6656c8'}}/>
						<Text style={styles.mapCurrentLocationText}>  Current Location                                        <Icon name="ios-arrow-forward" size={15} style={{color:'#8b8b8b', opacity: 0.4,}}/></Text>
						 {"\n"}Tap on the map to change the location. 
					 </Text>
				</TouchableWithoutFeedback>
			</View>	

				  <MapView
			          style={styles.map}
			          region={this.state.region}
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
	    width: 400,
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
