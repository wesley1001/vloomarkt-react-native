'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';


var Mapbox = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var BackgroundGeolocation = require('react-native-background-geolocation');


class GeoLocation extends Component {

  constructor(props) {
      super(props);
      this.state = {
        initialPosition: 'unkown'
      };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.initialPosition}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  }
});


module.exports = GeoLocation;
