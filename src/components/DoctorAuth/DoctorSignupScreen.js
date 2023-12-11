// DoctorSignupScreen.js

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
// import { useDispatch } from 'react-redux';
// import { saveDoctorProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DoctorSignupScreen = () => {
    const navigation = useNavigation();
    // const dispatch = useDispatch();

    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const handleNextPage = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(gmail, password);

            const doctorId = userCredential.user.uid;
            const doctorProfileData = {
                gmail,
                doctorName,
                specialization,
                contactInfo,
                city,
                address,
            };

            // Save the doctor profile data to Firestore
            await firestore().collection('doctors').doc(doctorId).set(doctorProfileData);

            // navigation.navigate('DoctorHome', { doctorId });
            navigation.navigate('DoctorHomeScreen');
        } catch (error) {
            console.error('Error creating doctor account:', error);
            Alert.alert('Error', 'Failed to create an account. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Doctor Information</Text>

            <TextInput
                style={styles.input}
                placeholder="Gmail"
                value={gmail}
                onChangeText={(text) => setGmail(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Doctor's Name"
                value={doctorName}
                onChangeText={(text) => setDoctorName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Specialization"
                value={specialization}
                onChangeText={(text) => setSpecialization(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Contact Info"
                value={contactInfo}
                onChangeText={(text) => setContactInfo(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={(text) => setCity(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
            />


            <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('DoctorLoginScreen')}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        marginRight: 10,
    },
    loginLink: {
        color: 'blue',
    },
});

export default DoctorSignupScreen;


