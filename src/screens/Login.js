import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {login} from '../actions/auth';
import {_retrieveData, _storeData} from '../utils/asyncStorage';

function Login(props) {
  const [email, onEmailChange] = useState('');
  const [password, onPasswordChange] = useState('');
  const onLoginSubmit = async () => {
    const response = await login({email, password});
    if (response.status === 200) {
      await _storeData('token', response.token);
      props.navigation.navigate('Dashboard');
    } else {
      alert(response.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        onChangeText={text => onEmailChange(text.toLowerCase())}
        value={email}
        style={styles.input}
        placeholder="Email"
      />
      <TextInput
        onChangeText={text => onPasswordChange(text)}
        value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"
      />

      <TouchableOpacity style={styles.loginButton} onPress={onLoginSubmit}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#85C872',
    borderRadius: 4,
    width: '70%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    width: '70%',
    backgroundColor: '#85C872',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginTop: 10,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Login;
