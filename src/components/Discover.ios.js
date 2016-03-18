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
// var Icon = require('../../node_modules/react-native-vector-icons/Ionicons');
var Banner = require("react-native-admob");
var SGListView = require('react-native-sglistview');

var Location = require('../components/helpers/Location');


var ALL_ITEMS_URL = 'http://dev.ondernemer.io/api/item/';

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
      imageHeight: 160,
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
    fetch('http://ondernemer.io/api/item/')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }



  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }


    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerLocation}>OFFERS AROUND <Location /></Text>
        </View>
          <SGListView style={{marginBottom: 45,}}
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            initialListSize={1}
            pageSize={2}
            showsVerticalScrollIndicator={false}
          />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View>
      <View style={styles.header}>
            <Text style={styles.headerTitle}>Discover</Text>
            <Text style={styles.headerLocation}>OFFERS AROUND <Location /></Text>
        </View>
        <View style={styles.loadingView}>
          <Text style={styles.loadingText}> Please wait while we fetch offers near you! </Text>
          <Progress.Pie
              style={styles.progress}
              progress={this.state.progress}
              size={190}
              color={'#6656c8'}
              borderWidth={2}
            />
          </View>
      </View>

    );
  }

  renderItem(item) {
      return (
      <View style={styles.row}>
        <View style={styles.thumbContainer}>
          <Image style={{width: 193, height: 165}} source={{uri: item.image_set[0].image}} />
        </View>
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
    fontSize: 19,
    letterSpacing: -1,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginBottom: 9,
  },
  container: {
    flex: 1,

  },
  thumbContainer: {
    borderTopWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  row: {
    justifyContent: 'center',
    margin: 18,
    marginTop: 23,
    marginBottom: 26,
    padding: 0,
    width: 150,
    height: 150,
    alignItems: 'center',
  },
  thumb: {
    width: 200,
    height: 164,
  },
  imageTextBackground: {
    alignItems: 'center',
    width: 210,
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 2,
    borderTopColor: '#eee',
    borderTopWidth: 1,

  },
  imageText: {
    color: '#6656c8',
    textAlign: 'center',
    fontSize: 10,
  },
  loadingView: {
    alignItems: 'center',
    marginTop: 100,
  },
});

module.exports = Discover;