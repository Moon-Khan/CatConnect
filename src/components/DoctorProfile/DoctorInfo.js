// /src/Components/DoctorProfile/DoctorInfo.js
// /src/Components/DoctorProfile/DoctorInfo.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DoctorSignupScreen = () => {
    const navigation = useNavigation();

    // Add additional state variables
    const [doctorName, setDoctorName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [fee, setFee] = useState('');

    const handleSignup = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;

            // Store user data in Firestore 'users' collection
            await firestore().collection('doctors').doc(uid).set({
                email: email,
                username: username,
            });

            // Store doctor data in Firestore 'doctors' collection
            const docRef = await firestore().collection('doctors').add({
                email: email,
                username: username,
                doctorName: doctorName,
                specialization: specialization,
                contactInfo: contactInfo,
                city: city,
                address: address,
                fee: fee,
            });

            navigation.navigate('CatBasicInfo');
            console.log('Account created successfully!');
        } catch (error) {
            console.log(error.message);
            Alert.alert('Error', 'Failed to create an account. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doctor Signup</Text>
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Username"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            {/* Add additional input fields for doctor signup */}
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Doctor Name"
                onChangeText={(text) => setDoctorName(text)}
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Specialization"
                onChangeText={(text) => setSpecialization(text)}
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Contact Info"
                onChangeText={(text) => setContactInfo(text)}
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="City"
                onChangeText={(text) => setCity(text)}
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Address"
                onChangeText={(text) => setAddress(text)}
            />
            <TextInput
                style={[styles.input, styles.underline]}
                placeholder="Fee"
                onChangeText={(text) => setFee(text)}
            />
            {/* ... (existing code) */}
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
        backgroundColor: '#47C1FF',
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
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        color: '#000',
        marginRight: 5,
    },
    loginLink: {
        color: '#47C1FF',
        fontWeight: 'bold',
    },
});


export default DoctorSignupScreen;
