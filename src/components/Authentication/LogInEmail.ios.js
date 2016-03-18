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
      const { reducer, updateToken } = this.props;
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
        updateToken(responseData.key);
        console.log(updateToken(responseData.key))
        console.log(responseData.key);
        this.setState({
          animating: false,
        });
      }).catch(function(ex) {
      console.log(ex);
      })
    }
  }

  render() {
    const { reducer } = this.props;

    return (
      <View style={styles.container}>
        <Text>{reducer}</Text>
        <Form
          ref="form"
          type={LogInEmailForm}
          options={options}
        />
      <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 100,
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

module.exports = LogInEmail;
