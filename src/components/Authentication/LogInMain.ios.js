'use strict';

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


import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux';

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

const Icon = require('react-native-vector-icons/Ionicons');
const FBLogin = require('react-native-facebook-login');
const FBLoginManager = require('NativeModules').FBLoginManager;
const Actions = require('react-native-router-flux').Actions;
const Modal   = require('react-native-modalbox');

import * as myActions from '../../actions/actions';



class LogInMain extends Component {
  componentWillMount(){
    const { actions, token, loggedIn, router, auth } = this.props;
    console.log(auth.token)
    actions.changeLoginStatus(false);
  }

  render() {
    const { actions, loggedIn, token, router, auth } = this.props;
    if(auth.loggedIn == false){
      return (
        <View style={styles.logInContainer}>
          <View style={styles.bgImageWrapper}>
            <Image source={{uri: "https://s3.amazonaws.com/sehla/backgroun_1.jpg"}} style={styles.bgImageLogin} />
          </View>

          <View style={styles.logInHeader}>
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', marginBottom: 3, letterSpacing: 3,}}>JOIN NOW!</Text>
            <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold'}}>Its easier than ever to sell your items with Vloo</Text>
            <View style={{backgroundColor: 'white', width: 77, height: 3, marginTop: 15, marginBottom: 15}} />
            <Text style={{color: 'white', fontSize: 18, fontWeight: '400'}}>Log in and discover beautiful things near you or start selling in seconds. </Text>
          </View>

          <View style={styles.authButtonsHolder}>
            <View style={styles.facebookButtonHolder}>
              <FBLogin
              permissions={["email","user_friends"]}
              loginBehavior={FBLoginManager.LoginBehaviors.Native}
              onLogin={function(data){
                console.log("Logged in!");
              }}
              onLogout={function(){
                console.log("Logged out.");
              }}
              onLoginFound={function(data){
                console.log("Existing login found.");
              }}
              onLoginNotFound={function(){
                console.log("No user logged in.");
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
            </View>

          <TouchableOpacity
          style={styles.emailLogInTextHolder}
          onPress={actions.routes.login()}
          >
              <Text style={styles.emailLogInText}>Log in with your email</Text>
          </TouchableOpacity>

        </View>
      </View>
      );
    } else  {
      return(
        <View>
          <Text>Logged in: {token}</Text>
        </View>

      );
    }
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 1,
    height: 160,
    width: 400,
  },
  bgImageLogin: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    opacity: 1,
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
  facebookButtonHolder: {
    alignItems: 'center',
    backgroundColor: '#415dae',
    width: 280,
    padding: 4,
  },
  emailLogInTextHolder: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 6,
    width: 280,
  },
  emailLogInText: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 15,
    padding: 9,
  },


});




module.exports = LogInMain;
