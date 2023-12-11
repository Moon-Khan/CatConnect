// ./src/CatProfile/CatBasicInfoScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, RadioButton } from 'react-native-paper';
import { updateBasicInfo } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';
import { useNavigation } from '@react-navigation/native';

const CatBasicInfoScreen = () => {
  const catName = useSelector((state) => state.catProfile.basicInfo.catName);
  const breed = useSelector((state) => state.catProfile.basicInfo.breed);
  const gender = useSelector((state) => state.catProfile.basicInfo.gender);
  const age = useSelector((state) => state.catProfile.basicInfo.age);
  const navigation = useNavigation();

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
  const handleSkipPage = () => {
    navigation.navigate('Home');
  }

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
      <View>
        <Text style={styles.title2}>Create Your Cat profile</Text>

      </View>
      <View>
        <Text style={styles.title}>Cat Basic Info</Text>

      </View>


      <View style={styles.inputContainer}>
        <Text style={fontFamily = 'Poppins-Regular'}>Cat's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Kitty"
          value={catName}
          onChangeText={handleCatNameChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text fontFamily='Poppins-Regular'>Breed</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Persian"
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
          placeholder="e.g. 3"
          value={age}
          onChangeText={handleAgeChange}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNextPage}>
        <Text style={styles.buttonText}>Next Page</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipbutton} onPress={handleSkipPage}>
        <Text style={styles.skipbuttonText}>Skip</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    justifyContent: 'center',
    backgroundColor: '#fff',
    fontSize:15,
  },
  title: {
    fontSize: 24,
    marginTop: 100,
    marginBottom: 30,
    textAlign: 'left',
    color: '#212529',
    fontFamily:'Poppins-SemiBold'
  },
  title2:{
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
    fontSize: 16,
    paddingTop: 5,
    alignItems: 'center',
    position: 'absolute',
    top: 10,


  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#D9D9D9',
    color: '#7E7E7E',
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 1,
    marginTop: 6,
    padding: 10,
    fontFamily: 'Poppins-SemiBold',

  },
  button: {
    backgroundColor: '#47C1FF',
    padding: 15,
    borderRadius: 25,

    marginTop: 30,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginBottom:20,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  skipbutton: {
    backgroundColor: '#DFF4FF',
    paddingTop: 5,
    paddingBottom:5,
    paddingLeft:14,
    paddingRight:14,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },

  skipbuttonText: {
    color: '#47C1FF', 
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  radioButtonText: {
    marginLeft: 0,
    marginRight: 32,
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

