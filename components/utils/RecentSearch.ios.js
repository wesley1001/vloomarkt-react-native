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


class RecentSearch extends Component {

	constructor(props) {
      super(props);
      this.state = {};
  	}

	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.RecentSearchHeader}> RECENT SEARCH TERMS </Text>
				<View style={styles.recentSearches}>
					<Text style={styles.recentSearchesTextHolder}>
						Your search history will be shown here 
					</Text>
				</View>
			</View>
		);
	}
}


var styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#f5f5f8',
	},
	RecentSearchHeader: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#6a6a6b',
		margin: 7,
	},
	recentSearchesTextHolder: {
		backgroundColor: '#f9f9ff',
		color: '#969799',
		padding: 10,
	}
});


module.exports = RecentSearch;
