// /src/Screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setLoading, setError, setUser } from '../../Redux/Slices/Auth/AuthSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const handleLogin = async () => {
    try {
      dispatch(setLoading(true));
      const userCredential = await auth().signInWithEmailAndPassword(email, password);

      dispatch(setUser(userCredential.user.uid));
      dispatch(setLoading(false));
      navigation.navigate('Home');
      console.log('Login successful!');
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, styles.underline]} 
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={[styles.input, styles.underline]} 
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffff",
    padding: 16,
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#47C1FF',
  },
  input: {
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 8,
    alignSelf: 'stretch',
    color: '#000',
    fontFamily: 'Poppins-SemiBold',

  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: '#47C1FF',
    width: '80%',
    alignSelf: 'center',
    minHeight: 1,
    marginTop: 6,
  },
  button: {
    backgroundColor: '#47C1FF', // Using the same color as SignUp button
    padding: 12,
    borderRadius: 25,
    marginTop: 15,
    width: '50%',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffff',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
});


export default LoginScreen;
