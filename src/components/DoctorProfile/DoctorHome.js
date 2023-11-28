import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from './Header';

const DoctorHome = ({ navigation }) => {
    const [numColumns, setNumColumns] = useState(2);

    const doctorProfile = {
        id: 1,
        name: 'John Doe',
        bio: 'Passionate about car care .',
        specialization: 'Dr. John is a dedicated Cat Specialist with a profound passion for feline well-being. With extensive experience and a deep understanding of cat behavior and health, Dr. Doe is committed to providing exceptional care for your beloved feline companionsKnown for their gentle approach and compassionate demeanor, Dr.Doe strives to create a stress- free environment for both cats and their owners.From routine check - ups to specialized treatments, the Cat Specialist is well - equipped to address a wide range of feline health issues.' ,
        degree: 'Doctor of Medicine',
        status: 'Available',
        photo: require('./images/doctor.png'),
    };

    return (
        <ScrollView style={styles.container}>
            <Header title={'CatConnect'} icon={require('./images/logo.png')} />
            <View style={styles.profileContainer}>
                {/* Profile Photo and Name Section */}
                <View style={styles.profileImageContainer}>
                    <Image source={doctorProfile.photo} style={styles.profileImage} />
                    <Text style={styles.profileName}>{doctorProfile.name}</Text>
                </View>

                {/* Description Section */}
                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.sectionContent}>{doctorProfile.bio}</Text>
                </View>

                {/* Specialization Section */}
                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Specialization</Text>
                    <Text style={styles.sectionContent}>{doctorProfile.specialization}</Text>
                </View>

                {/* Degree Section */}
                <View style={styles.profileSection}>
                    <Text style={styles.sectionTitle}>Degree</Text>
                    <Text style={styles.sectionContent}>{doctorProfile.degree}</Text>
                </View>

                {/* Appointment Button */}
                <TouchableOpacity
                    style={styles.appointmentBtn}
                    onPress={() => navigation.navigate('Pending')}
                >
                    <Text style={styles.appointmentBtnText}>View Appointments</Text>
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
    profileContainer: {
        alignItems: 'center',
        padding: 20,
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
    },
    appointmentBtn: {
        backgroundColor: '#2A2A72',
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 15,
        marginTop: 20,  // Adjusted margin top
    },
    appointmentBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default DoctorHome;
