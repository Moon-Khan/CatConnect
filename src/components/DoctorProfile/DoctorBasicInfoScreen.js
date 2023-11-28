// DoctorBasicInfoScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateDoctorbasicInfo } from '../../Redux/Slices/DoctorProfile/DoctorProfileSlice';

const DoctorBasicInfoScreen = ({ navigation }) => {
    const doctorName = useSelector((state) => state.doctorProfile.doctorbasicInfo.doctorName);
    const specialization = useSelector((state) => state.doctorProfile.doctorbasicInfo.specialization);
    const contactInfo = useSelector((state) => state.doctorProfile.doctorbasicInfo.contactInfo);
    const hospitalInfo = useSelector((state) => state.doctorProfile.doctorbasicInfo.hospitalInfo);
    const experience = useSelector((state) => state.doctorProfile.doctorbasicInfo.experience);
    const fee = useSelector((state) => state.doctorProfile.doctorbasicInfo.fee);

    //redux code
    const dispatch = useDispatch();

    const handleDoctorNameChange = (text) => {
        dispatch(updateDoctorbasicInfo({ doctorName: text }));
    };

    const handleSpecializationChange = (text) => {
        dispatch(updateDoctorbasicInfo({ specialization: text }));
    };

    const handleContactInfoChange = (text) => {
        dispatch(updateDoctorbasicInfo({ contactInfo: text }));
    };

    const handleHospitalInfoChange = (text) => {
        dispatch(updateDoctorbasicInfo({ hospitalInfo: text }));
    };

    const handleExperienceChange = (text) => {
        dispatch(updateDoctorbasicInfo({ experience: text }));
    };

    const handleFeeChange = (text) => {
        dispatch(updateDoctorbasicInfo({ fee: text }));
    };

    const handleNextPage = () => {
        // Ensure that doctorName is defined
        if (doctorName !== undefined) {
            navigation.navigate('DoctorHome'); // Adjust the screen name accordingly
        } else {
            console.error('Invalid DoctorProfileData. Ensure doctorName is defined.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Doctor Information</Text>

            <View style={styles.inputContainer}>
                <Text>Doctor's Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Doctor Name"
                    value={doctorName}
                    onChangeText={handleDoctorNameChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Specialization</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Specialization"
                    value={specialization}
                    onChangeText={handleSpecializationChange}
                />
            </View>

            
            <View style={styles.inputContainer}>
                <Text>Contact Info</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contact Info"
                    value={contactInfo}
                    onChangeText={handleContactInfoChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Hospital Info</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hospital Info"
                    value={hospitalInfo}
                    onChangeText={handleHospitalInfoChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Experience</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Experience"
                    value={experience}
                    onChangeText={handleExperienceChange}
                />
            </View>


            <View style={styles.inputContainer}>
                <Text>Fee</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fee"
                    value={fee}
                    onChangeText={handleFeeChange}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
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
});

export default DoctorBasicInfoScreen;
