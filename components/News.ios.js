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

var FBLogin = require('react-native-facebook-login');


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
      <FBLogin />
		);
	}
}


var styles = StyleSheet.create({
	container:{
		flex: 1,
	}
});


module.exports = News;
