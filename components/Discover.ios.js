'user strict';


import React, {
  Component,
  Animated,
  StyleSheet,
  Text,
  ScrollView,
  ListView,
  Image,
  View,
  TouchableHighlight,
  StatusBarIOS,
} from 'react-native';

var Progress = require('react-native-progress');
var Icon = require('../node_modules/react-native-vector-icons/Ionicons');
var ALL_ITEMS_URL = 'http://localhost:8000/api/item';
var LoadingIcon = require('./helpers/LoadingIcon');

class Discover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      progress: 1,
      indeterminate: true,
    };
  }

  componentDidMount() {
    this.animate();
    this.fetchData();
  }

  animate() {
    var progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random()/5;
        if(progress > 1) {
          progress = 1;
        }
        this.setState({ progress });
      }, 500);
    }, 1500);
  }

  fetchData() {
    fetch(ALL_ITEMS_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerLocation}>OFFERS AROUND MANAMA</Text>
        </View>
        <ScrollView>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
      <View style={styles.header}>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerLocation}>OFFERS AROUND MANAMA</Text>
        </View>
        <Text style={styles.loadingText}> Please wait while we fetch offers near you! </Text>
        <Progress.Pie
            style={styles.progress}
            progress={this.state.progress}
            size={150}
            color={'#6656c8'}
            borderWidth={2}
          />
      </View>
      
    );
  }

  renderItem(item) {
    return (
      <View style={styles.row}>
          <Image style={styles.thumb} source={{uri: item.image_set[0].image}} />
          <View style={styles.imageTextBackground}>
            <Text style={styles.imageText}>
            {item.title}
            {"\n"}
            {item.price} <Text style={{fontWeight: 'bold'}}> BHD</Text>
            </Text>
          </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#6656c8',
    justifyContent: 'center',
    paddingTop: 18,
  },
  headerTitle: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  headerLocation: {
    fontSize: 13,
    color: '#fff',
    paddingTop: 0,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#6656c8',
    letterSpacing: -1,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  thumbContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'center',
    margin: 18,
    marginBottom: 26,
    padding: 0,
    width: 150,
    height: 150,
    alignItems: 'center',
    position: 'relative',

  },
  thumb: {
    width: 210,
    height: 164,
    maxHeight: 200,

  },
  imageTextBackground: {
    alignItems: 'center',
    width: 210,
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#6656c8',
    borderBottomWidth: 2,
    padding: 2,

  },
  imageText: {
    color: '#6656c8',
    textAlign: 'center',
    fontSize: 10,
    

  },
});

module.exports = Discover;