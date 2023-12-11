// DoctorLoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import { setLoading, setError, setUser } from '../../Redux/Slices/Auth/AuthSlice';
import { useNavigation } from '@react-navigation/native';

const DoctorLoginScreen = () => {
    const navigation = useNavigation();
    // const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    const handleLogin = async () => {
        try {
            // dispatch(setLoading(true));
            const userCredential = await auth().signInWithEmailAndPassword(email, password);

            // dispatch(setUser(userCredential.user.uid));
            // dispatch(setLoading(false));

            // Fetch doctor profile data after successful login
            const doctorId = userCredential.user.uid;
            const doctorSnapshot = await firestore().collection('doctors').doc(doctorId).get();

            if (doctorSnapshot.exists) {
                const doctorData = doctorSnapshot.data();
                // navigation.navigate('DoctorHome', { doctorId, doctorData });
                navigation.navigate('PendingAppointments', { doctorId });
            } else {
                console.log('Doctor data not found');
            }

            console.log('Login successful!');
        } catch (error) {
            // dispatch(setError(error.message));
            // dispatch(setLoading(false));
            Alert.alert('Error', 'Invalid email or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
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
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DoctorLoginScreen;