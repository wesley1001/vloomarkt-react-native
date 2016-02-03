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

var GeoLocation = require('../components/helpers/GeoLocation');

class News extends Component {


	constructor(props) {
      super(props);
      this.state = {};
  	}

	_CancelSearchPress(){
    	this.refs.news.push(Search);
  	}

	render(){
		return(
			<View style={styles.container}><GeoLocation /></View>
			
		);
	}
}


var styles = StyleSheet.create({
	container:{
		flex: 1,
	}
});


module.exports = News;
