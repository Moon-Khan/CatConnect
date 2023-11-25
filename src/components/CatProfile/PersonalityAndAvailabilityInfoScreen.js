// PersonalityAndAvailabilityInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateTemperament, updateSocialCompatibility, updateDescription, updateAvailabilityStatus } from '../../Redux/Slices/CatProfile/PhysicalAndHealthSlice';


const PersonalityAvialabilityScreen = ({ navigation }) => {


    const temperament = useSelector((state) => state.personalityAvialability.temperament);
    const socialCompatibility = useSelector((state) => state.personalityAvialability.socialCompatibility);
    const description = useSelector((state) => state.personalityAvialability.description);
    const availabilityStatus = useSelector((state) => state.personalityAvialability.availabilityStatus);


    //redux code
    const dispatch = useDispatch();

    const handleTemparamentChange = (text) => {
        dispatch(updateTemperament(text));
    };

    const handleSocialCompatibilityChange = (text) => {
        dispatch(updateSocialCompatibility(text));
    };

    const handleDescriptionChange = (text) => {
        dispatch(updateDescription(text));
    };

    const handleAvailabilityStatusChange = (text) => {
        dispatch(updateAvailabilityStatus(text));
    };


    const handleNextPage = () => {
        // Navigate to the next page
        navigation.navigate('CatMediaUpload');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Personality and Behavior</Text>

            <View style={styles.inputContainer}>
                <Text>Temperament</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Temperament"
                    value={temperament}
                    onChangeText={handleTemparamentChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Social Compatibility</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Social Compatibility"
                    value={socialCompatibility}
                    onChangeText={handleSocialCompatibilityChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Description"
                    multiline
                    value={description}
                    onChangeText={handleDescriptionChange}
                />
            </View>

            <Text style={styles.title}>Breeding Availability</Text>

            <View style={styles.inputContainer}>
                <Text>Availability Status</Text>
                <RadioButton.Group onValueChange={handleAvailabilityStatusChange} value={availabilityStatus}>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton.Item label="Available" value="Available" />
                        <RadioButton.Item label="Not Available" value="Not Available" />
                    </View>
                </RadioButton.Group>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Next Page</Text>
            </TouchableOpacity>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
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
    descriptionInput: {
        height: 80, // Adjust the height for a multiline description input
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
    saveButton: {
        marginTop: 16,
    },
});

export default PersonalityAvialabilityScreen;



// const [temperament, setTemperament] = useState('');
// const [socialCompatibility, setSocialCompatibility] = useState('');
// const [description, setDescription] = useState('');
// const [availabilityStatus, setAvailabilityStatus] = useState('');

// const handleSave = () => {
//     // Handle saving data to your store or API
//     console.log('Data saved:', { temperament, socialCompatibility, description, availabilityStatus });
// };

{/* <Button mode="contained" style={styles.saveButton} onPress={handleSave}>
                Save
            </Button> */}