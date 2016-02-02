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

var currentRegion = {
				    latitude: 37.484419,
				    longitude: -122.1499859,
				    latitudeDelta: 0.04,
				    longitudeDelta: 0.04,
				}


class Maps extends Component {

	constructor(props){
		super(props);
    	this.state = {
      		currentRegion: undefined,
      		mapRegionInput: undefined,
    	};
	}

	_getUserLocation(){
		AlertIOS.alert(
		 'Sync Complete',
		 'All your data are belong to us.'
		);
	}

	_OpenMap(){
		AlertIOS.alert(
		 'Sync Complete',
		 'All your data are belong to us.'
		);
	}

	render(){
		return(
			<View style={styles.container}>
			<View style={styles.mapTextLocationHolder}>
				<TouchableWithoutFeedback
			    	onPress={this._OpenMap.bind(this)}
			    >
					<Text style={styles.mapCurrentLocationTextHelper}>
						<Icon name="ios-location" size={25} style={{color:'#6656c8'}}/>
						<Text style={styles.mapCurrentLocationText}>  Current Location                                        <Icon name="ios-arrow-forward" size={15} style={{color:'#8b8b8b', opacity: 0.4,}}/></Text>
						 {"\n"}Tap on the map to change the location. 
					 </Text>
				</TouchableWithoutFeedback>
			</View>	
				<MapView
				  style={styles.map}
				  region={currentRegion}
				  renderRow={-122.1499859} />
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
