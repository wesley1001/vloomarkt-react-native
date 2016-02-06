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
  TouchableWithoutFeedback,
} from 'react-native';


var Icon = require('../node_modules/react-native-vector-icons/Ionicons');


class Profile extends Component {


	constructor(props) {
      super(props);
      this.state = {};
  	}

	render(){
		return(
      <View style={styles.container}>

        {/* MAIN HEADER - USER INFO & PROFILE PICTURE */}
        <View style={styles.mainHeader}>
            <View style={styles.bgImageWrapper}>
              <Image source={{uri: 'https://scontent-cdg2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11800037_10155988719445096_8510525465155941740_n.jpg?oh=39164c7271ca286089f881641c6bf2a6&oe=57362229'}} style={styles.bgImage} />
            </View>
            <View style={styles.mainHeaderContent}>
            <Image style={styles.profilePicture}  source={{uri: 'https://scontent-cdg2-1.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11800037_10155988719445096_8510525465155941740_n.jpg?oh=39164c7271ca286089f881641c6bf2a6&oe=57362229'}}/>
            <Text style={styles.fullName}>
              Qasim A.
              {"\n"}
              <Text style={styles.userInformation}>
              0 sales - 0 purchases - since 16/02/14
              </Text>
            </Text>
          </View>
        </View>

        <ScrollView
  contentContainerStyle={styles.contentContainer}
  style={styles.scrollView}>
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


        <View style={styles.logOutHolder}>
          <TouchableWithoutFeedback>
            <Text style={styles.logOutText}>Logout</Text>
          </TouchableWithoutFeedback>
        </View>

      </ScrollView>

     
      </View>
      
		);
	}
}


var styles = StyleSheet.create({
	container:{
		flex: 1,
    backgroundColor: '#eeeeee'
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
    height: 168,
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
  logOutHolder: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  logOutText: {
    fontWeight: '500',
    fontSize: 15,
  }
  

});


module.exports = Profile;
