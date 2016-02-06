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
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Everything</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._newCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>New near you</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._fashionCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Fashion</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._homeCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Home and Garden</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._electronicsCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Electronics</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._moviesCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Movies and Books</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._babyCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Baby and Child</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._sportsCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Sports and Games</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._carsCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Cars and Motors</Text>
					</View>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.categoryButton}
					onPress={this._servicesCategoryPress.bind(this)}
					>
					<View style={styles.categoryAndIconHolder}>
						<Icon style={styles.iconCategorySelection} name="ios-circle-outline" size={20}/> 
						<Text style={styles.categoryText}>Services</Text>
					</View>
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
		fontSize: 11,
		marginTop: 9,
		marginLeft: 5,
	},
	categoryAndIconHolder: {
		flexWrap: 'wrap',
    	flexDirection:'row',
	},
	iconCategorySelection: {
		marginTop: 5,
		marginLeft: 5,
		color: '#eee',
	}


});


module.exports = Categories;
