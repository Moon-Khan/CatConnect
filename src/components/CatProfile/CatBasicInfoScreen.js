// CatBasicInfoScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCatName, updateBreed, updateGender, updateAge } from '../../Redux/Slices/CatProfile/BasicInfoSlice';

const CatBasicInfoScreen = ({ navigation }) => {
  const catName = useSelector((state) => state.BasicInfo.catName); // Use 'BasicInfo' instead of 'basicInfoSlice'
  const breed = useSelector((state) => state.BasicInfo.breed);
  const gender = useSelector((state) => state.BasicInfo.gender);
  const age = useSelector((state) => state.BasicInfo.age);

  //redux code
  const dispatch = useDispatch();

  const handleCatNameChange = (text) => {
    dispatch(updateCatName(text));
  };

  const handleBreedChange = (text) => {
    dispatch(updateBreed(text));
  };

  const handleGenderChange = (text) => {
    dispatch(updateGender(text));
  };

  const handleAgeChange = (text) => {
    dispatch(updateAge(text));
  };

  const handleNextPage = () => {
    // Navigate to the next page (replace 'NextPage' with the actual name of the next screen)
    navigation.navigate('PhysicalAndHealthInfo');
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
