// RoleSelectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const RoleSelectionScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGenderSelection = (role) => {
    // Navigate to HomeScreen based on the selected role
    navigation.navigate('Signup', { role });
  };
  const handleRoleSelection = (role) => {
    // Navigate to HomeScreen based on the selected role
    navigation.navigate('DoctorBasicInfo', { role });
  };

  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="fadeInDown"
        duration={1500}
        style={styles.title}>
        Select Your Role
      </Animatable.Text>
      <Animatable.View
        animation="fadeInUp"
        duration={1500}
        delay={500}
        style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleGenderSelection('male')}>
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleRoleSelection('doctor')}>
          <Text style={styles.buttonText}>Are you a doctor?</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginLink}>Skip</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#47C1FF',


  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#ffff',
    fontFamily: 'Poppins-SemiBold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'pink', // Using the same color as SignUp button
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    color: '#ffff',
    fontFamily: 'Poppins-SemiBold',
  },
  loginContainer: {
    marginTop: 20,
  },
  loginLink: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign:'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize:20,
  },
});

export default RoleSelectionScreen;
