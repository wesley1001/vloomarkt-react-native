'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

var Icon = require('../../node_modules/react-native-vector-icons/Ionicons');

class Categories extends Component {

	constructor(props) {
      super(props);
      this.state = {
      	chosenCategory: 'everything',
      };
  	}

  	_everythingCategoryPress(){
		this.setState({chosenCategory: 'everything'});
  	}

  	_newCategoryPress(){
  		this.setState({chosenCategory: 'new'});
  	}

  	_fashionCategoryPress(){
		this.setState({
    		chosenCategory: 'fashion',
    	});
  	}

  	_homeCategoryPress(){
  		this.setState({
    		chosenCategory: 'home',
    	});	
  	}

  	_electronicsCategoryPress(){
  		this.setState({
    		chosenCategory: 'electronics',
    	});
  	}

  	_moviesCategoryPress(){
  		this.setState({
    		chosenCategory: 'movies',
    	});
  	}

  	_babyCategoryPress(){
  		this.setState({
    		chosenCategory: 'baby',
    	});
  	}

  	_sportsCategoryPress(){
  		this.setState({
    		chosenCategory: 'sports',
    	});
  	}

  	_carsCategoryPress(){
  		this.setState({
    		chosenCategory: 'cars',
    	});
  	}

  	_servicesCategoryPress(){
  		this.setState({
    		chosenCategory: 'services',
    	});
  	}

	render(){
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<Icon name="ios-pricetag" size={20} style={{color:'#6656c8', }}/>
					<Text style={styles.chooseText}>Choose a category</Text>
				</View>
				<View style={styles.categoriesList}>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._everythingCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Everything</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._newCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> New near you</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._fashionCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Fashion</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._homeCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Home & Garden</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._electronicsCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Electronics</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._moviesCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Movies & Books</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._babyCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Baby & Child</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._sportsCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Sports & Games</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._carsCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Cars & Motors</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._servicesCategoryPress.bind(this)}
					>
						<Text style={styles.categoryText}><Icon name="ios-circle-outline" size={20}/> Services</Text>
					</TouchableHighlight>
					<Text> {this.state.chosenCategory} </Text>
				</View>
			</View>
		);
	}
}


var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'relative',
    	flexDirection:'row',
    	marginLeft: 10,
    	marginTop: 5,
	},
	chooseText: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#535354',
		marginLeft: 3,
		marginTop: 3,
	},
	categoriesList: {
		flexWrap: 'wrap',
    	flexDirection:'row',
    	marginLeft: 10,
    	marginTop: 5,
    	alignItems: 'center',
    	justifyContent: 'center',
	},
	categoryButton: {
		height: 35,
		width: 140,
		backgroundColor: '#ababab',
		margin: 5,
		padding: 3,
		borderRadius: 10,
		
	},
	categoryText: {
		color: '#636363',
		textAlign: 'left',
		marginTop: 5,
		fontSize: 11,
	}


});


module.exports = Categories;
