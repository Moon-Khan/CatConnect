// ./src/Screens/splash.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


const SplashScreen = () => {

    const navigation = useNavigation();

    const handleLogin = () => {

        navigation.navigate('RoleSelection');
    };

    return (
        <View style={styles.container}>
            <Animatable.View
                animation="zoomIn"
                duration={1500}
                style={styles.logoContainer}>
                {/* <Animatable.Image
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite"
                    // source={require('./path-to-your-cat-image.png')} // Replace with your cat image
                    style={styles.logo}
                /> */}
            </Animatable.View>
            <Animatable.Text
                animation="fadeInDown"
                duration={1200}
                style={styles.title}>
                Cat Breed System
            </Animatable.Text>
            <Animatable.Text
                animation="fadeInUp"
                duration={1200}
                delay={500}
                style={styles.subtitle}>
                Find Your Perfect Match & Book Doctor Appointments
            </Animatable.Text>
            <Animatable.View
                animation="fadeIn"
                duration={1500}
                delay={1000}
                style={styles.pawPrintsContainer}>
                {/* <Image
                    // source={require('./path-to-paw-image.png')} // Replace with your paw image
                    style={styles.pawPrint}
                />
                <Image
                    // source={require('./path-to-paw-image.png')} // Replace with your paw image
                    style={styles.pawPrint}
                /> */}
            </Animatable.View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#47C1FF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
    pawPrintsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    pawPrint: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
    },

    button: {
        backgroundColor: 'pink', // Using the same color as SignUp button
        padding: 12,
        borderRadius: 25,
        marginTop: 15,
        width: '50%',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
});

export default SplashScreen;
