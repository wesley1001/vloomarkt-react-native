'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  PickerIOS,
  Image,
} from 'react-native';

var Icon = require('../node_modules/react-native-vector-icons/Ionicons');
var LinearGradient = require('react-native-linear-gradient');
var AwesomeButton = require('react-native-awesome-button');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var options = {
  title: 'Select Picture', // specify null or empty string to remove the title
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  quality: 0.2, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
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
        avatarSource: undefined,
      };
  	}

  _onSellPressButton() {
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
      avatarSource: source
    });
  }
});
  }

	render(){
    
		return(
      
      <View style={styles.container}>

        <View styles={styles.cameraContainer}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
              <TouchableWithoutFeedback style={styles.cameraButton} onPress={this._onSellPressButton}>
                      <Icon name="ios-camera" size={60} style={styles.cameraIcon}/>
              </TouchableWithoutFeedback>
          </LinearGradient>
        </View>

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
                <Image source={this.state.avatarSource} />

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
            <TouchableHighlight style={styles.sellButton}>
              <Text style={styles.sellButtonText}>SELL IT</Text>
            </TouchableHighlight>
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
    flex: 1,
    alignItems: 'center',
    height: 220,
  },
  cameraButton: {
    borderRadius: 29,
  },
  cameraIcon: {
    width: 70,
    height: 70,
    borderRadius: 34,
    marginTop: 70,
    backgroundColor: '#c8c8c8',
    textAlign:'center',
    paddingTop: 3,
    color: '#4c669f'
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
    
    color: '#bcbcbc',
  },
  currentCurrency: {
    width: 50,
    backgroundColor: 'white',
  },
  currentCurrencyText: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 15,
    color: '#7f7f7f',

  },
  sellButtonHolder: {
    marginTop: 50,
    alignItems: 'center',
    borderRadius: 3,
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

  }

});


module.exports = Sell;
