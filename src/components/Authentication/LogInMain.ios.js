'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';


const FBLogin = require('react-native-facebook-login');
const FBLoginManager = require('NativeModules').FBLoginManager;
var Actions = require('react-native-router-flux').Actions;
var Modal   = require('react-native-modalbox');




class LogInMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: null,
      userId: null,
      token: null,
      photo: null,
      info: {
        name: null,
        email: null,
        birthday: null,
      },
    }
  }

  componentWillMount(){
  }


  getUserFacebookCredintials(){
    var _this = this;
    // Gets users facebook credintials and sets them in their states.
    FBLoginManager.getCredentials(function(error, data){
      if (!error ) {
        _this.setState(
          { user : data.credentials,
            userId: data.credentials.userId,
            token: data.credentials.token,
            loggedIn: true,
          });
        console.log(_this.state.user);
        // gets users profile information such as profile picture, full name, email, birth-date
        _this.getUserFacebookProfileInformation()
      } else {
        _this.setState({ user : null, loggedIn: false });
      }
    });
  }

  getUserFacebookProfileInformation(){
    var _this = this;
    var FB_PHOTO_WIDTH = 200;
    var PHOTO_API = `https://graph.facebook.com/v2.3/${_this.state.user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${_this.state.user.token}`
    var PROFILE_INFO_API = `https://graph.facebook.com/v2.3/${_this.state.user.userId}?fields=name,email&access_token=${_this.state.user.token}`;

    // fetches profile picture
    fetch(PHOTO_API)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : responseData.data.url,
        });
      })
      .done();

    // fetches name, email, and birth-date.
    fetch(PROFILE_INFO_API)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
            birthday: responseData.birthday,
          },
        });
      })
      .done();
  }

  

  render() {
    var _this = this;
    return (
      <View style={styles.container}>
        <View style={styles.logInContainer}>
            <View style={styles.bgImageWrapper}>
              <Image source={{uri: 'https://s3.amazonaws.com/vlomrkt/bahrainBackground.jpg'}} style={styles.bgImageLogin} />
            </View>

            <View style={styles.logInHeader}>
              <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', marginBottom: 3, letterSpacing: 3,}}>JOIN NOW!</Text>
              <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold'}}>It's easier than ever to sell your items with Vloo</Text>
              <View style={{backgroundColor: 'white', width: 77, height: 3, marginTop: 15, marginBottom: 15}} />
              <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>Log in and discover beautiful things near you or start selling in seconds. </Text>
            </View>

            <View style={styles.authButtonsHolder}>


              <FBLogin 
              style={{backgroundColor: 'rgba(102, 86, 200, 0.0)',}}
              permissions={["email","user_friends"]}
              onLogin={function(data){
                console.log("Logged in!");
                _this.setState({ user : data.credentials });
                _this.getUserFacebookCredintials();
              }}
              onLogout={function(){
                console.log("Logged out.");
                _this.setState({ user : null, loggedIn: false, });
              }}
              onLoginFound={function(data){
                console.log("Existing login found.");
                _this.setState({ user : data.credentials });
                _this.getUserFacebookCredintials();
              }}
              onLoginNotFound={function(){
                console.log("No user logged in.");
                _this.setState({ user : null});
              }}
              onError={function(data){
                console.log("ERROR");
              }}
              onCancel={function(){
                console.log("User cancelled.");
              }}
              onPermissionsMissing={function(data){
                console.log("Check permissions!");
              }}
            />

            <TouchableOpacity
            style={styles.logInEmailButton}
            activeOpacity={0.8}>
                <Text style={styles.logInEmailButtonText}>Log in with E-mail</Text>
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
    backgroundColor: '#eeeeee',
  },
  mainHeader: {
    backgroundColor: 'rgba(102, 86, 200, 0.6)',
    height: 160,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  bgImage: {
    flex: 1,
    opacity: 0.1,
    height: 160,
    width: 400,
  },
  bgImageLogin: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0.7,
  },
  logInContainer: {
    flex: 1,
    alignItems: 'center',
    height: 700,
  },
  logInHeader: {
    marginTop: 90,
    marginLeft: 7,
    marginRight: 7,
    backgroundColor: 'transparent',
  },
  authButtonsHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: -100,
  },
  logInEmailButton: {
    height: 27,
    width: 170,
    marginTop: 6,
    marginLeft: -6,

    backgroundColor: '#f3f3f3',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ececec',

    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  logInEmailButtonText: {
    textAlign: 'center',
    margin: 5,
    color: '#a3a3a3',
    fontSize: 15,
  },
  mainHeaderContent: {
    marginTop: 70,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  userInformation: {
    fontSize: 13,
    fontWeight: 'normal',
    backgroundColor: 'transparent',
  },
  profilePicture: {
    marginTop: -20,
    width: 80,
    height: 80,
    backgroundColor: '#eee',
    marginRight: 10,
    borderRadius: 38,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 3,
  },
  optionsHolder: {
    flex: 1,
  },
  shareHolder: {
    marginTop: 0,
    alignItems: 'center',
  },
  shareTitle: {
    fontWeight: '500',
    fontSize: 13,
    marginBottom: 4,
    letterSpacing: 2,
  },
  shareIconsHolder: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainMenu: {
    flex: 1,
    paddingTop: -40,
    backgroundColor: '#fff',
    borderTopColor: '#c2c2c2',
    borderTopWidth: 1,
    height: 100,
  },
  userMenuHolder:{
    alignItems: 'center',
    backgroundColor: 'white',
    height: 178,
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#c2c2c2',
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2',
    flex: 1,
  },
  secondMenuHolder: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 58,
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#c2c2c2',
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2',
    flex: 1,
  },
  divider: {
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 1,
  },
  menuItemHolder: {
    height: 50,
    width: 380,
    marginBottom: 6,
  },
  menuItemButton: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  menuButtonTitle: {
    fontWeight: '500',
    fontSize: 14,
  },
  menuButtonSubtitle: {
    fontWeight: 'normal',
    fontSize: 11,
  },
  vlooMenuHolder: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 110,
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: '#c2c2c2',
    borderBottomWidth: 1,
    borderBottomColor: '#c2c2c2',
    flex: 1,
  },
  vlooMenuItemHolder: {
    height: 50,
    width: 380,
    marginBottom: 6,
  },
  vlooMenuItemButton: {
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 4,
  },
  vlooMenuText: {
    fontSize: 13,
    fontWeight: '600',
  },
  facebookAuthButton: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  logOutHolder: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logOutText: {
    fontWeight: '500',
    fontSize: 15,
  },
  

});

module.exports = LogInMain;
