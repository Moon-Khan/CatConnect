// ./src/Components/DoctrProfile/DoctorHome.js


import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const CommonBtn = ({ w, h, txt, onClick, status }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { width: w, height: h, backgroundColor: status ? '#2A2A72' : '#7F7F7F' },
            ]}
            onPress={onClick}
            disabled={!status}
        >
            <Text style={styles.buttonText}>{txt}</Text>
        </TouchableOpacity>
    );
};


const DoctorHome = () => {

    const [doctorProfile, setDoctorProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = auth().currentUser;
    const navigation = useNavigation();

    const handleDoctorDetail = () => {

        navigation.navigate('DoctorDetailScreen');
    };

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                // const doctorId = route.params?.doctorId;

                console.log('doctorId=', user.uid);

                if (user) {
                    const doctorSnapshot = await firestore()
                        .collection('doctors')
                        .doc(user.uid)
                        .get();

                    if (doctorSnapshot.exists) {
                        const doctorData = doctorSnapshot.data();
                        setDoctorProfile(doctorData);
                    } else {
                        console.log('Doctor data not found');
                    }
                } else {
                    console.log('Invalid navigation, doctorId not provided.');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
                setLoading(false);
            }
        };

        fetchDoctorProfile();
    }, [user]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2A2A72" />
            </View>
        );
    }

    if (!doctorProfile) {
        return <Text>Doctor profile data not available.</Text>;
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} underlayColor="#ffffff00">
                    <Image source={require('./images/logo.png')} style={styles.back} />
                </TouchableOpacity> */}
                <Text style={[styles.title, { marginLeft: 10 }]}>CatConnect</Text>
            </View>

            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    {/* <Image source={require('./images/doctor.png')} style={styles.profileImage} /> */}
                    <Text style={styles.profileName}>{doctorProfile?.doctorName}</Text>
                </View>

                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Specialization</Text>
                    <Text style={styles.sectionContent}>{doctorProfile?.specialization}</Text>
                </View>

                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Contact Info</Text>
                    <Text style={styles.sectionContent}>{doctorProfile?.contactInfo}</Text>
                </View>

                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>City</Text>
                    <Text style={styles.sectionContent}>{doctorProfile?.city}</Text>
                </View>

                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <Text style={styles.sectionContent}>{doctorProfile?.address}</Text>
                </View>


                {/* <CommonBtn
                    w={200}
                    h={40}
                    txt="View Appointments"
                    onClick={() => navigation.navigate('DoctorDetailScreen')}
                    status={true}
                /> */}

                <TouchableOpacity style={styles.button} onPress={handleDoctorDetail}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        elevation: 5,
        alignItems: 'center',
        paddingLeft: 20,
    },
    back: {
        width: 24,
        height: 24,
    },
    backBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
    },
    profileSection: {
        marginBottom: 20,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black', // Set the font color to black
    },
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#2A2A72',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    profileImageContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700',
        marginTop: 10,
    },
});

export default DoctorHome;