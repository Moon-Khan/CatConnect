// ./src/Screens/DoctorDetailScreen.js

import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
//const auth = require('@react-native-firebase/auth');
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const DoctorDetailScreen = ({ route }) => {
    const { doctorData } = route.params;

    const user = auth().currentUser;
    const [userData, setUserData] = useState(null);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const userDoc = await firestore().collection('users').doc(user.uid).get();
                if (userDoc.exists) {
                    setUserData(userDoc.data());
                } else {
                    console.log('User document does not exist in Firestore.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);


    const handleBookAppointment = async () => {
        try {
            console.log('Booking appointment for user:', user.uid);
            console.log('Booking appointment with doctor:', userData.username);
            if (user) {
                // Create an appointment object
                const appointment = {
                    userId: user.uid,
                    userName: userData.username,
                    doctorId: doctorData.id,
                    status: 'pending', // You can set an initial status
                };

                // Add the appointment to the 'Appointments' collection
                await firestore().collection('Appointments').add(appointment);

                // Notify the user that the appointment request has been sent
                console.log('Appointment request sent');

                // You can also navigate to a success screen or show a notification to the user
            } else {
                console.log('User not logged in');
                // Handle the case where the user is not logged in
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    if (!doctorData) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Doctor data not available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{doctorData.doctorName}</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Specialization:</Text>
                <Text style={styles.value}>{doctorData.specialization}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Contact Info:</Text>
                <Text style={styles.value}>{doctorData.contactInfo}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>City:</Text>
                <Text style={styles.value}>{doctorData.city}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{doctorData.address}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
                <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 8,
    },
    value: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#47C1FF', // Using the same color as SignUp button
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 16,
        marginTop: 25,
        width: '50%',
    },
    buttonText: {
        fontSize: 22,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
});

export default DoctorDetailScreen;
