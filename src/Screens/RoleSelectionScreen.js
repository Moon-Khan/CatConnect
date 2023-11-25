// RoleSelectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  const handleRoleSelection = (role) => {
    // Navigate to HomeScreen based on the selected role
    navigation.navigate('CatBasicInfo', { role });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelection('maleCat')}>
        <Text style={styles.buttonText}>Do you have a male cat?</Text>
        
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelection('femaleCat')}>
        <Text style={styles.buttonText}>Do you have a female cat?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleRoleSelection('doctor')}>
        <Text style={styles.buttonText}>Are you a doctor?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RoleSelectionScreen;
