// ./src/CatProfile/PersonalityAndAvailabilityInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalityAndAvailability } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';


const PersonalityAvialabilityScreen = ({ navigation }) => {


    const temperament = useSelector((state) => state.catProfile.personalityAndAvailability.temperament);
    const socialCompatibility = useSelector((state) => state.catProfile.personalityAndAvailability.socialCompatibility);
    const description = useSelector((state) => state.catProfile.personalityAndAvailability.description);
    const availabilityStatus = useSelector((state) => state.catProfile.personalityAndAvailability.availabilityStatus);


    //redux code
    const dispatch = useDispatch();

    const handleTemparamentChange = (text) => {
        dispatch(updatePersonalityAndAvailability({ temperament: text }));
    };

    const handleSocialCompatibilityChange = (text) => {
        dispatch(updatePersonalityAndAvailability({ socialCompatibility: text }));
    };

    const handleDescriptionChange = (text) => {
        dispatch(updatePersonalityAndAvailability({ description: text }));
    };

    const handleAvailabilityStatusChange = (text) => {
        dispatch(updatePersonalityAndAvailability({ availabilityStatus: text }));
    };


    const handleNextPage = () => {
        try {
            dispatch(saveCatProfileToFirestore({
                personalityAndAvailability: {
                    temperament,
                    socialCompatibility,
                    description,
                    availabilityStatus,
                },
            },
            ));
            navigation.navigate('CatMediaUpload');

        } catch (err) {
            console.log(err);
        }

    };

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: 'white' }}>
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
                <RadioButton.Group
                    onValueChange={(value) => handleAvailabilityStatusChange(value)}
                    value={availabilityStatus}

                >
                    <View style={styles.radioButtonContainer}>
                        <RadioButton.Item label="Available" value="Available" color="#47C1FF" />
                        <RadioButton.Item label="Not Available" value="Not Available" color="#47C1FF" />
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
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
    },

    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#212529',
        borderWidth: 1,
        borderRadius: 12,
        marginTop: 8,
        padding: 8,
    },
    descriptionInput: {
        height: 80, // Adjust the height for a multiline description input
    },
    button: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
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
