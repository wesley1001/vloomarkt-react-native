'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  AlertIOS,
  Image,
  PickerIOS,
  Modal,
} from 'react-native';


var Icon = require('react-native-vector-icons/Ionicons');
var LinearGradient = require('react-native-linear-gradient');
var AwesomeButton = require('react-native-awesome-button');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var Banner = require("react-native-admob");
var PickerItemIOS = PickerIOS.Item;

var InterstitialAdUnitId = 'ca-app-pub-0032051710031187/7410341872';


var CATEGORIES = {
  Everythin: {
    name: 'Everything',
  },
  Fashion: {
    name: 'Fashion and Accessories',
  },
  Automobile: {
    name: 'Motors and Cars',
  },
  Home: {
    name: 'Home and Garden',
  },
};




var options = {
  title: null, // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  quality: 0.2, // photos only
  allowsEditing: true, // Built in functionality to resize/reposition the image
  noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images' // will save image at /Documents/images rather than the root
  }
};



class Sell extends Component {

	constructor(props) {
      super(props);
      this.state = {
        currency: 'BHD',
        buttonState: 'idle',
        firstImageSource: undefined,
        secondImageSource: undefined,
        thirdImageSource: undefined,
        cateG: 'Everything',
      };
  	}

  showInterstitial(){
     AdMob.showInterstitial();
   }

  _onFirstCameraPressButton() {
    UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          firstImageSource: source,
        });
        console.log(this.state.firstImageSource);
      }
    });
  }

  _onSecondCameraPressButton(){
    UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          secondImageSource: source,
        });
      }
    });
  }

  _onThirdCameraPressButton(){
    UIImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('UIImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        this.setState({
          thirdImageSource: source,
        });
      }
    });
  }

	render(){

    var imageHolder;

    if (this.state.firstImageSource && !this.state.secondImageSource && !this.state.thirdImageSource) {
      imageHolder =
      <View style={{backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap',}}>
        <TouchableWithoutFeedback onPress={this._onFirstCameraPressButton.bind(this)}>
        <Image source={this.state.firstImageSource} style={styles.oneImage} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.secondImageUploadButton} onPress={this._onSecondCameraPressButton.bind(this)}>
          <View style={styles.secondImageUploadButton}>
            <Icon name="ios-plus-empty" size={60} style={styles.plusUploadIcon}/>
          </View>
        </TouchableWithoutFeedback>

      </View>
    ;}
    else if (this.state.firstImageSource && this.state.secondImageSource && !this.state.thirdImageSource) {
      imageHolder =
      <View style={{backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap',}}>

        <TouchableWithoutFeedback onPress={this._onFirstCameraPressButton.bind(this)}>
          <Image source={this.state.firstImageSource} style={styles.oneImage} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this._onSecondCameraPressButton.bind(this)}>
          <Image source={this.state.secondImageSource} style={styles.oneImage} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.secondImageUploadButton} onPress={this._onThirdCameraPressButton.bind(this)}>
          <View style={styles.secondImageUploadButton}>
            <Icon name="ios-plus-empty" size={60} style={styles.plusUploadIcon}/>
          </View>
        </TouchableWithoutFeedback>

      </View>
    ;}
    else if (this.state.firstImageSource && this.state.secondImageSource && this.state.thirdImageSource) {
      imageHolder =
      <View style={{backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap',}}>

        <TouchableWithoutFeedback onPress={this._onFirstCameraPressButton.bind(this)}>
          <Image source={this.state.firstImageSource} style={styles.oneImage} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this._onSecondCameraPressButton.bind(this)}>
          <Image source={this.state.secondImageSource} style={styles.oneImage} />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this._onThirdCameraPressButton.bind(this)}>
          <Image source={this.state.thirdImageSource} style={styles.oneImage} />
        </TouchableWithoutFeedback>

      </View>
    ;}
    else { imageHolder =
      <TouchableOpacity activeOpacity={0.6} style={styles.cameraButton} onPress={this._onFirstCameraPressButton.bind(this)}>
          <View style={{backgroundColor: 'rgba(0,0,0,0)'}}>
          <Icon name="ios-camera" size={60} style={styles.cameraIcon}/>
      </View>
      </TouchableOpacity>
    ;}

		return(
      <View style={styles.container}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
              {imageHolder}
          </LinearGradient>

        <View style={styles.formContainer}>

          <TextInput
            style={styles.titleInput}
            placeholder='What you are selling...'
            placeholderTextColor='#c5c5c5'
          />

          <View style={styles.divider}></View>

          <TextInput
            style={styles.descriptionInput}
            placeholder='Describe it...'
            placeholderTextColor='#c5c5c5'
            maxLength={400}
            multiline={true}
          />
          <View style={styles.divider}></View>

          <View style={styles.categorySelectionHolder}>
            <TouchableWithoutFeedback>
              <View style={styles.categoryBar}>

                <Text style={styles.categoryText}>Select a category</Text>

                <Icon name="ios-arrow-down" size={20} style={styles.categoryDownIcon}/>

              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.priceSelectionContainer}>
            <View style={styles.priceSelectionHolder}>
              <View style={styles.currentCurrency}>
                <Text style={styles.currentCurrencyText}>{this.state.currency}</Text>
              </View>
              <View style={styles.priceHolder}>
                <TextInput
                  style={styles.priceInput}
                  placeholder='Price'
                  placeholderTextColor='#c5c5c5'
                  keyboardType='numbers-and-punctuation'
                />
              </View>
            </View>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.sellButtonHolder}>
            <TouchableOpacity style={styles.sellButton}
            activeOpacity={0.8}>
              <Text style={styles.sellButtonText}>SELL IT</Text>
            </TouchableOpacity>
          </View>


        </View>
      </View>
		);
	}
}


var styles = StyleSheet.create({
	container:{
		flex: 1,
    backgroundColor: '#eee',
	},
  linearGradient: {
    alignItems: 'center',
    height: 220,
  },
  cameraContainer: {
  },
  cameraButton: {
    borderRadius: 29,
    backgroundColor: 'transparent',
  },
  cameraIcon: {
    width: 70,
    height: 70,
    borderRadius: 34,
    marginTop: 75,
    backgroundColor: '#c8c8c8',
    textAlign:'center',
    paddingTop: 3,
    color: '#4c669f'
  },
  plusUploadIcon: {
    color: '#3e5485',
    alignItems: 'center',
    marginLeft: 28,
    marginTop: 15,
  },
  oneImage: {
    height: 90,
    width: 90,
    borderColor: 'rgba(225,255,225,0.5)',
    borderWidth: 1,
    marginTop: 70,
    marginLeft: 10,
  },
  firstImageSource: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  firstImageSecondUploadHolder: {
  },
  secondImageUploadButton: {
    height: 90,
    width: 90,
    borderWidth: 1,
    borderColor: '#c8c8c8',
    backgroundColor: 'rgba(174, 174, 174, 0.3)',
    marginTop: 70,
    marginLeft: 10,
  },
  formContainer: {
  },
  divider: {
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
  },
  titleInput: {
    height: 30,
    color: '#bcbcbc',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    paddingLeft: 3,
    paddingTop: 1,
    fontSize: 15,
  },
  descriptionInput: {
    height: 100,
    color: '#bcbcbc',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    paddingLeft: 3,
    fontSize: 15,
  },
  categorySelectionHolder: {
    backgroundColor: 'white',
    height: 30,
    paddingLeft: 3,
    flex: 1,
  },
  categoryText: {
    color: '#bcbcbc',
    marginTop: 5,
    fontSize: 15,
  },
  categoryBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryDownIcon: {
    marginTop: 5,
    color: '#bcbcbc',
    marginLeft: 225,
  },
  priceSelectionContainer: {
    flex: 1,
    height: 30,
    backgroundColor: 'white',
  },
  priceSelectionHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  priceHolder:{
    height: 10,
    backgroundColor: 'white',
  },
  priceInput: {
    backgroundColor: 'white',
    height: 30,
    width: 200,
    paddingLeft: 4,

    color: '#bcbcbc',
  },
  currentCurrency: {
    width: 50,
    backgroundColor: 'white',
    borderRightWidth: 1,
    borderColor: '#cfcfcf',
    height: 30,
  },
  currentCurrencyText: {
    marginTop: 5,
    marginLeft: 6,
    fontSize: 17,
    color: '#7f7f7f',

  },
  sellButtonHolder: {
    marginTop: 50,
    alignItems: 'center',
    borderRadius: 3,
    marginBottom: 70,
  },
  sellButton: {
    backgroundColor: '#6656c8',
    borderRadius: 8,
  },
  sellButtonText: {
    textAlign:'center',
    paddingLeft: 150,
    paddingRight: 150,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    color: 'white',
    fontWeight: '600',
  },
  adMob: {
    marginTop: 100,
  }


});


module.exports = Sell;
