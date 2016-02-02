'user strict';

import React, {
  Component,
  StyleSheet,
  ProgressViewIOS,
  View,
} from 'react-native';

var Icon = require('../../node_modules/react-native-vector-icons/Ionicons');
var Progress = require('react-native-progress');

class LoadingIcon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
    };
  }
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rotateCard: {
    width:35,
    height:35,
    justifyContent:'center',
    backgroundColor:'transparent'
  }
});


module.exports = LoadingIcon;

