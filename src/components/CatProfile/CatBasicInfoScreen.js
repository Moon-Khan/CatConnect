// CatBasicInfoScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
    <View style={styles.container}>
      <Text style={styles.title}>Cat Information</Text>

      <View style={styles.inputContainer}>
        <Text>Cat's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Cat Name"
          value={catName}
          onChangeText={handleCatNameChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Breed</Text>
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={breed}
          onChangeText={handleBreedChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Gender"
          value={gender}
          onChangeText={handleGenderChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Age</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CatBasicInfoScreen;
