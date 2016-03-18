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
} from 'react-native';

var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;


var FB_PHOTO_WIDTH = 200;


var FacebookAuthentication = React.createClass({
  getInitialState: function(){
    return {
      user: null,
      loggedInWithFacebook: false,
      loggedIn: false,
    };
  },

  componentWillMount: function(){
    this.updateView();
  },

  updateView: function(){
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        _this.setState({ user : data.credentials, loggedIn: true, });

      } else {
        _this.setState({ user : null, loggedIn: false, });
      }
    });
  },

  render: function() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.loginContainer}>
        <FBLogin style={{ marginBottom: 10, }}
            permissions={["email","user_friends"]}
            onLogin={function(data){
              console.log("Logged in!");
              console.log(data);
              _this.setState({ user : data.credentials });
            }}
            onLogout={function(){
              console.log("Logged out.");
              _this.setState({ user : null });
            }}
            onLoginFound={function(data){
              console.log("Existing login found.");
              console.log(data);
              _this.setState({ user : data.credentials });
            }}
            onLoginNotFound={function(){
              console.log("No user logged in.");
              _this.setState({ user : null });

            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          />
      </View>
    );
  }
});

var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  },

  render: function(){
    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

        <Image
          style={styles.profilePhoto}
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  }
});

var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
  },
  bottomBump: {
    marginBottom: 15,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 48,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 3,

  }
});


module.exports = FacebookAuthentication;
