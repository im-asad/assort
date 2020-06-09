import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {View, Text} from 'native-base';
import {_retrieveData, _storeData} from '../utils/asyncStorage';
import {verifyToken} from '../actions/auth';

class Welcome extends React.Component {
  async componentDidMount() {
    const token = await _retrieveData('token');
    const response = await verifyToken(token);
    if (response.status === 200) {
      this.props.navigation.navigate('dashboard');
    } else {
      alert('you are not logged in');
    }
  }
  render() {
    console.log('THESE ARE THE PROPS: ', this.props);
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('login')}>
          <Text style={styles.textStyles}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.textStyles}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: 70,
    position: 'absolute',
    top: 80,
  },
  welcomeText: {
    textAlign: 'center',
    position: 'absolute',
    top: 10,
  },
  loginButton: {
    backgroundColor: '#85C872',
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: 'center'
  },
  registerButton: {
    backgroundColor: '#C2EF7E',
    width: '100%',
    height: 50,
    alignItems: "center",
    justifyContent: 'center'
  },
  textStyles: {
    color: "#fff",
  }
});

export default Welcome;
