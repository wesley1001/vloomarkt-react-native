'user strict';

import React, {
  Component,
  StyleSheet,
  NavigatorIOS,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';


var Icon = require('react-native-vector-icons/Ionicons');
var Banner = require("react-native-admob");

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var FacebookAuthentication = require('./Authentication/FacebookAuthentication');
var News = require('./News');

var FB_PHOTO_WIDTH = 200;

var PHOTO_API;
var PROFILE_INFO_API;



class Profile extends Component {

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
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error ) {
        _this.setState(
          { user : data.credentials,
            userId: data.credentials.userId,
            userToken: data.credentials.token,
            loggedIn: true,
          });

        PHOTO_API = `https://graph.facebook.com/v2.3/${_this.state.user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${_this.state.user.token}`


            fetch(PHOTO_API)
          .then((response) => response.json())
          .then((responseData) => {
            _this.setState({
              photo : responseData.data.url,
            });
          })
          .done();

        PROFILE_INFO_API = `https://graph.facebook.com/v2.3/${_this.state.user.userId}?fields=name,email&access_token=${_this.state.user.token}`;

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

            console.log(_this.state.userId, _this.state.info.email, _this.state.info.name, _this.state.userToken,);
          })
          .done();


      } else {
        _this.setState({ user : null, loggedIn: false, });
      }
    });
  }

  createNewUserFromFacebook(){
   fetch('http://localhost:8000/api/user/create/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "username": _this.state.userId,
          "email": _this.state.info.email,
          "password": _this.state.userId,
          "name": _this.state.info.name,
          "facebookID": _this.state.userId,
          "facebookToken": _this.state.userToken
      })
    }).done();
  }


	render(){

    var _this = this;

    var whatToRender;

    if(_this.state.loggedIn){
      // _this.updateView();
      whatToRender =  <View style={styles.container}>
        {/* MAIN HEADER - USER INFO & PROFILE PICTURE */}
        <View style={styles.mainHeader}>
            <View style={styles.bgImageWrapper}>
              <Image source={{uri: _this.state.photo }} style={styles.bgImage} />
            </View>
            <View style={styles.mainHeaderContent}>
            <Image style={styles.profilePicture}  source={{uri: _this.state.photo }}/>
            <Text style={styles.fullName}>
              {_this.state.info.name}
              {"\n"}
              <Text style={styles.userInformation}>
              0 sales - 0 purchases - since 16/02/14
              </Text>
            </Text>
          </View>
        </View>



        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
           {/* SHARE HOLDER */}
        <View style={styles.optionsHolder}>
          <View style={styles.shareHolder}>
            <Text style={styles.shareTitle}>SHARE VLOO & INVITE YOUR FRIENDS</Text>
            <View style={styles.shareIconsHolder}>
              <Image source={{uri: 'facebook'}} style={{width:35,height:35,marginRight: 8,}}/>
              <Image source={{uri: 'twitter'}} style={{width:35,height:35,marginRight: 8,}}/>
              <Image source={{uri: 'instagram'}} style={{width:35,height:35,marginRight: 8,}}/>
              <Image source={{uri: 'whatsapp'}} style={{width:35,height:35,marginRight: 8,}}/>
              <Image source={{uri: 'email'}} style={{width:35,height:35,marginRight: 8,}}/>
            </View>
          </View>
        </View>

      {/* USER MENU */}

        <View style={styles.userMenuHolder}>

          <View style={styles.menuItemHolder}>
            <TouchableHighlight>
              <View style={styles.menuItemButton}>
                <Image source={{uri: 'cart'}} style={{width:45,height:45, marginRight: 10, marginTop: -4,}}/>
                <Text style={styles.menuButtonTitle}>
                  Items you are selling
                  {"\n"}
                  <Text style={styles.menuButtonSubtitle}>
                  A list of all items that you are offering to sell
                  </Text>
                </Text>
                <Icon name="ios-arrow-forward" size={26} style={{marginLeft: 50, marginTop: 5, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>
            <View style={styles.divider}></View>
          </View>

          <View style={styles.menuItemHolder}>
            <TouchableHighlight>
              <View style={styles.menuItemButton}>
                <Image source={{uri: 'review-star-menu-icon'}} style={{width:45,height:45, marginRight: 10, marginTop: -4,}}/>
                <Text style={styles.menuButtonTitle}>
                  Your reviews
                  {"\n"}
                  <Text style={styles.menuButtonSubtitle}>
                  You haven't got any reviews yet
                  </Text>
                </Text>
                <Icon name="ios-arrow-forward" size={26} style={{marginLeft: 115, marginTop: 5, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>
            <View style={styles.divider}></View>
          </View>

          <View style={styles.menuItemHolder}>
            <TouchableHighlight>
              <View style={styles.menuItemButton}>
                <Image source={{uri: 'settings-cog-icon'}} style={{width:45,height:45, marginRight: 10, marginTop: -4,}}/>
                <Text style={styles.menuButtonTitle}>
                  Settings
                  {"\n"}
                  <Text style={styles.menuButtonSubtitle}>
                  Change profile image & profile settings
                  </Text>
                </Text>
                <Icon name="ios-arrow-forward" size={26} style={{marginLeft: 75, marginTop: 5, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>

          </View>
        </View>

        {/* OTHER MENU */}

        <View style={styles.secondMenuHolder}>
          <View style={styles.menuItemHolder}>
            <TouchableHighlight>
              <View style={styles.menuItemButton}>
                <Image source={{uri: 'premium-icon'}} style={{width:45,height:45, marginRight: 10, marginTop: -4,}}/>
                <Text style={styles.menuButtonTitle}>
                  Premium features
                  {"\n"}
                  <Text style={styles.menuButtonSubtitle}>
                  Promote your item
                  </Text>
                </Text>
                <Icon name="ios-arrow-forward" size={26} style={{marginLeft: 163, marginTop: 5, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>
          </View>
        </View>


        {/* VLOO MENU */}

        <View style={styles.vlooMenuHolder}>
          <View style={styles.vlooMenuItemHolder}>
            <TouchableHighlight>
              <View style={styles.vlooMenuItemButton}>
                  <Text style={styles.vlooMenuText}>Feedback</Text>
                  <Icon name="ios-arrow-forward" size={15} style={{marginLeft: 277, marginTop: 1, color:'#a7a7a7'}}/>

              </View>
            </TouchableHighlight>
            <View style={styles.divider}></View>
            <TouchableHighlight>
              <View style={styles.vlooMenuItemButton}>
                  <Text style={styles.vlooMenuText}>Help</Text>
                  <Icon name="ios-arrow-forward" size={15} style={{marginLeft: 310, marginTop: 1, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>
            <View style={styles.divider}></View>
            <TouchableHighlight>
              <View style={styles.vlooMenuItemButton}>
                  <Text style={styles.vlooMenuText}>Terms and Conditions</Text>
                  <Icon name="ios-arrow-forward" size={15} style={{marginLeft: 201, marginTop: 1, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>
            <View style={styles.divider}></View>
            <TouchableHighlight>
              <View style={styles.vlooMenuItemButton}>

                  <Text style={styles.vlooMenuText}>About</Text>
                  <Icon name="ios-arrow-forward" size={15} style={{marginLeft: 301, marginTop: 1, color:'#a7a7a7'}}/>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.facebookAuthButton}>
        <FBLogin

          permissions={["email","user_friends"]}
          onLogin={function(data){
            _this.setState({ user : data.credentials, loggedIn: true, });
            _this.createNewUserFromFacebook();
          }}
          onLogout={function(){
            _this.setState({ user : null, loggedIn: false, });
          }}
          onLoginFound={function(data){
            _this.setState({ user : data.credentials, loggedIn: true, });
          }}
          onLoginNotFound={function(){
            _this.setState({ user : null, loggedIn: false, });
          }}
          onError={function(data){

          }}
          onCancel={function(){

          }}
          onPermissionsMissing={function(data){

          }}
        />
        </View>

        <Banner.AdMobBanner
          style={{marginBottom: 47,}}
          bannerSize={"smartBannerPortrait"}
          adUnitID={"ca-app-pub-0032051710031187/7869830279"}
          didFailToReceiveAdWithError={this.bannerError} />

      </ScrollView>
      </View>
    ;} else {
      whatToRender =
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
                _this.setState({ user : data.credentials, loggedIn: true, });
              }}
              onLogout={function(){
                console.log("Logged out.");
                _this.setState({ user : null, loggedIn: false, userToken: null, userId: null, });
              }}
              onLoginFound={function(data){
                console.log("Existing login found.");
                _this.setState({ user : data.credentials, loggedIn: true, });
              }}
              onLoginNotFound={function(){
                console.log("No user logged in.");
                _this.setState({ user : null, loggedIn: false, });
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
    ;}

		return(

      <View style={styles.container}>
        {whatToRender}
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


module.exports = Profile;
