'user strict';

import React, {
  Component,
  StyleSheet,
  StatusBarIOS,
  NavigatorIOS,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  AlertIOS,
} from 'react-native';

var t = require('tcomb-form-native');
var Form = t.form.Form;

var Person = t.struct({
  username: t.String,
  email: t.String,
  password: t.String,
  confirmPassword: t.String
});


var options = {
  fields: {
    name: {
      error: 'Insert a valid last name.',
      autoCapitalize: 'none',
      autoCorrect: false,
      selectionColor: '#6656c8',
      returnKeyType: 'next',
    },
    username: {
      error: 'Insert a valid first name.',
      autoCapitalize: 'none',
      autoCorrect: false,
      selectionColor: '#6656c8',
      returnKeyType: 'next',
    },
    email: {
      error: 'Insert a valid last email.',
      autoCapitalize: 'none',
      autoCorrect: false,
      selectionColor: '#6656c8',
      keyboardType: 'email-address',
      returnKeyType: 'next',
    },
    password: {
      error: 'Insert a valid passowrd.',
      autoCapitalize: 'none',
      autoCorrect: false,
      password: true,
      secureTextEntry: true,
      help: 'Password must be atleast 6 characters long.',
      selectionColor: '#6656c8',
      returnKeyType: 'next',
    },
    confirmPassword: {
      error: 'Both passowrds must match.',
      autoCapitalize: 'none',
      autoCorrect: false,
      password: true,
      secureTextEntry: true,
      selectionColor: '#6656c8',
      returnKeyType: 'join',
    },
  }
};

class RegisterEmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      username: undefined,
      email: undefined,
      password1:  undefined,
      password2: undefined,
      response: undefined,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // give focus to the name textbox
    this.refs.form.getComponent('username').refs.input.focus();
  }

  fetchUserDetails(){
    fetch('http://www.ondernemer.io/api/auth/registration/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "username": this.state.username,
          "email": this.state.email,
          "password1": this.state.password1,
          "password2": this.state.password2,
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
      console.log('OK!')
      this.setState({
        registered : true,
        response : responseData,
      });
      console.log(this.state.response)
    }).catch(function(ex) {
    console.log(ex)
    })
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
      this.setState({
        username : value.username,
        email : value.email,
        password1 : value.password,
        password2 : value.confirmPassword,
      });
      this.fetchUserDetails();
    }
  }


  render() {
    return (
      <View style={styles.container}>
        {/* display */}
        <Form
          ref="form"
          type={Person}
          options={options}
        />
      <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Join Vloo</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
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
  }
});

module.exports = RegisterEmail;
