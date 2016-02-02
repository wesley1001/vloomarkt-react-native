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
			<Text style={styles.text}>Testingg hey</Text>
		);
	}
}


var styles = StyleSheet.create({
	text:{
		fontSize: 25,
		marginTop: 100,
		color: 'black'
	}
});


module.exports = News;
