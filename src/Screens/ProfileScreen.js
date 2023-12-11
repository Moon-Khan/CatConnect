import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'; // Import Alert
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import firestore

const ProfileScreen = ({ navigation }) => {
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

    const handleLogout = async () => {
        try {
            await auth().signOut();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.'); // Use Alert
        }
    };

    const navigateToCatBasicInfo = () => {
        navigation.navigate('CatBasicInfo');
    };

    const navigateToSettings = () => {
        navigation.navigate('Settings');
    };

    const navigateToFeedback = () => {
        navigation.navigate('Feedback');
    };

    return (
        <View>
            <View>
                <Text style={styles.title}>Profile</Text>
            </View>

            {userData && (
                <View>
                    <Text style={styles.userInfo}>{userData.email}</Text>
                    <Text style={styles.userInfo}>{userData.username || ''} </Text>
                </View>
            )}

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => {/* Handle 'My Profile' action */ }}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={navigateToCatBasicInfo}>
                    <Text style={styles.buttonText}>Add Cat Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={navigateToFeedback}>
                    <Text style={styles.buttonText}>Feedback</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    title: {
        fontSize: 30,
        marginTop: 30,
        marginBottom: 10,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold'
    },
    userInfo: {
        fontSize: 14,
        color: '#7E7E7E',
        marginBottom: 1,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 10,

    },
    container: {
        marginTop: 40,

        margin: 20,
    },
    button: {
        textAlign: 'left',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        paddingTop: 5,

    },
    buttonText: {
        fontSize: 24,
        color: '#7E7E7E',
        textAlign: 'left',
        fontFamily: 'Poppins-SemiBold',
    }


});



export default ProfileScreen;
