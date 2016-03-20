'user strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ActivityIndicatorIOS,
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var LogInEmailForm = t.struct({
  username: t.String,
  password: t.String,
});


var options = {
  fields: {
    username: {
      error: 'Insert a valid last username.',
      autoCapitalize: 'none',
      autoCorrect: false,
      selectionColor: '#6656c8',
      returnKeyType: 'next',
    },
    password: {
      error: 'Insert a valid passowrd.',
      autoCapitalize: 'none',
      autoCorrect: false,
      password: true,
      secureTextEntry: true,
      selectionColor: '#6656c8',
      returnKeyType: 'go',
    },
  }
};

class LogInEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password:  undefined,
      animating: false,
    };
  }

  componentDidMount() {
  }

  logInUserAndGetToken(){
    const { updateToken, getItemsByCategory } = this.props;
    fetch('http://www.ondernemer.io/api/auth/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "username": this.state.username,
          "password": this.state.password,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(updateToken(responseData.key));
      updateToken(responseData.key);
      this.setState({
        animating: false,
      });
    }).catch(function(ex) {
    console.log(ex);
    })
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      this.setState({
        username : value.username,
        password : value.password,
        animating: true,
      });
      this.logInUserAndGetToken();
    }
  }

  categoryOnPress() {
    const { searchTitle, selectedCategory, updateToken, getItemsByCategory } = this.props;
    getItemsByCategory(title=searchTitle,category=selectedCategory);
  }

  render() {
    const { token, username, category } = this.props;

    return (
            <View style={styles.wrapper}>
              <Text>{token} AND category: {category}</Text>
              <Form
                ref="form"
                type={LogInEmailForm}
                options={options}
              />
            <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableHighlight>
            <TouchableHighlight>
                <Text style={styles.registerText}>Don't have an account yet? Join us</Text>
            </TouchableHighlight>

              <ActivityIndicatorIOS
              animating={this.state.animating}
              style={[styles.centering, {height: 80}]}
              size="large"
            />
            <TouchableHighlight onPress={this.categoryOnPress.bind(this)}>
                <Text style={styles.registerText}>Get Cat</Text>
            </TouchableHighlight>
            </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    marginTop: 100,
    padding: 20,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#6656c8',
    borderColor: '#6656c8',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  registerText: {
    textAlign: 'center',

  }
});

module.exports = LogInEmail;
