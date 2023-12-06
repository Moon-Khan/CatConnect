// ./src/CatProfile/CatBasicInfoScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, RadioButton } from 'react-native-paper';
import { updateBasicInfo } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';

const CatBasicInfoScreen = ({ navigation }) => {
  const catName = useSelector((state) => state.catProfile.basicInfo.catName);
  const breed = useSelector((state) => state.catProfile.basicInfo.breed);
  const gender = useSelector((state) => state.catProfile.basicInfo.gender);
  const age = useSelector((state) => state.catProfile.basicInfo.age);

  //redux code
  const dispatch = useDispatch();

  const handleCatNameChange = (text) => {
    dispatch(updateBasicInfo({ catName: text }));
  };

  const handleBreedChange = (text) => {
    dispatch(updateBasicInfo({ breed: text }));
  };

  const handleGenderChange = (text) => {
    dispatch(updateBasicInfo({ gender: text }));
  };

  const handleAgeChange = (text) => {
    dispatch(updateBasicInfo({ age: text }));
  };

  const handleNextPage = () => {
    // Ensure that basicInfo and catName are defined
    if (catName !== undefined) {
      dispatch(saveCatProfileToFirestore({
        basicInfo: {
          catName,
          breed,
          gender,
          age,
        },
      }, 'catProfiles'
      ));
      navigation.navigate('PhysicalAndHealthInfo');
    } else {
      console.error('Invalid catProfileData. Ensure basicInfo and catName are defined.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Cat Information</Text>

      <View style={styles.inputContainer}>
        <Text style={fontFamily = 'Poppins-Regular'}>Cat's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Cat Name"
          value={catName}
          onChangeText={handleCatNameChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text fontFamily='Poppins-Regular'>Breed</Text>
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={breed}
          onChangeText={handleBreedChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text fontFamily='Poppins-Regular'>Gender</Text>
        <View style={styles.radioButtonContainer}>
          <RadioButton
            value="Male"
            status={gender === 'Male' ? 'checked' : 'unchecked'}
            onPress={() => handleGenderChange('Male')}
            color="#47C1FF" // Set color for checked sta

          />

          <Text style={{ ...styles.radioButtonText, fontFamily: 'Poppins-Regular' }}>Male</Text>
          <RadioButton
            value="Female"
            status={gender === 'Female' ? 'checked' : 'unchecked'}
            onPress={() => handleGenderChange('Female')}
            color="#47C1FF" // Set color for checked sta


          />
          <Text style={{ ...styles.radioButtonText, fontFamily: 'Poppins-Regular' }}>Female</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text fontFamily='Poppins-Regular'>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={handleAgeChange}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNextPage}>
        <Text style={styles.buttonText}>Next Page</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'left',
    color: '#212529',
    fontFamily: 'Poppins-SemiBold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: '#212529',
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    padding: 8,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#47C1FF',
    padding: 15,
    borderRadius: 15,
    marginTop: 30,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  radioButtonText: {
    marginLeft: 8,
    marginRight:15,


  },
});

export default CatBasicInfoScreen;

