// ./src/CatProfile/PhysicalAndHealthInfoScreen.js
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updatePhysicalHealth } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';


const PhysicalAndHealthScreen = ({ navigation }) => {


    const color = useSelector((state) => state.catProfile.physicalHealth.color);
    const pattern = useSelector((state) => state.catProfile.physicalHealth.pattern);
    const eyeColor = useSelector((state) => state.catProfile.physicalHealth.eyeColor);
    const coatLength = useSelector((state) => state.catProfile.physicalHealth.coatLength);
    const vaccinationStatus = useSelector((state) => state.catProfile.physicalHealth.vaccinationStatus);
    const medicalCertificate = useSelector((state) => state.catProfile.physicalHealth.medicalCertificate);

    //redux code
    const dispatch = useDispatch();


    const handleColorChange = (text) => {
        dispatch(updatePhysicalHealth({ color: text }));
    };

    const handlePatternChange = (text) => {
        dispatch(updatePhysicalHealth({ pattern: text }));
    };

    const handleEyeColorChange = (text) => {
        dispatch(updatePhysicalHealth({ eyeColor: text }));
    };

    const handleCoatLengthChange = (text) => {
        dispatch(updatePhysicalHealth({ coatLength: text }));
    };
    const handleVaccinationStatusChange = (text) => {
        console.log('Selected value:', text);
        dispatch(updatePhysicalHealth({ vaccinationStatus: text }));
    };
    const handleMedicalCertificateChange = (text) => {
        console.log('Selected value:', text);
        dispatch(updatePhysicalHealth({ medicalCertificate: text.uri }));
    };

    const handleAttachment = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });

            // setMedicalCertificate(result);
            handleMedicalCertificateChange(result);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker
            } else {
                console.error('Error picking document:', err);
            }
        }
    };

    const handleNextPage = () => {
        try {
            dispatch(saveCatProfileToFirestore({
                physicalHealth: {
                    color,
                    pattern,
                    eyeColor,
                    coatLength,
                    vaccinationStatus,
                    medicalCertificate,
                },
            },
            ));
            navigation.navigate('PersonalityAndAvailabilityInfo');


        } catch (err) { console.log(err); }

    };
    return (
        <ScrollView style={{ ...styles.container, backgroundColor: 'white' }}>
            <Text style={styles.title}>Physical Information</Text>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Cat Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cat Color"
                    value={color}
                    onChangeText={handleColorChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Cat Pattern</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cat Pattern"
                    value={pattern}
                    onChangeText={handlePatternChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Eye Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Eye Color"
                    value={eyeColor}
                    onChangeText={handleEyeColorChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Coat Length</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Coat Length"
                    value={coatLength}
                    onChangeText={handleCoatLengthChange}
                />
            </View>

            <Text style={styles.sectionTitle}>Medical Information</Text>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Vaccination Status</Text>
                <RadioButton.Group
                    onValueChange={(value) => handleVaccinationStatusChange(value)}
                    value={vaccinationStatus}

                >
                    <View style={styles.radioButtonContainer}>
                        <RadioButton.Item
                            label="Vaccinated"
                            value="Vaccinated"
                            color="#47C1FF"
                        />
                        <RadioButton.Item
                            label="Not Vaccinated"
                            value="Not Vaccinated"
                            color="#47C1FF"
                        />
                    </View>
                </RadioButton.Group>
            </View>

            {/* <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Medical Certificate</Text>
                <TouchableOpacity
                    style={{ ...styles.attachmentButton, backgroundColor: '#212529', width: '80%', alignSelf: 'center' }}
                    value={medicalCertificate}
                    onPress={handleAttachment}
                >

                    <Text style={{ color: 'white' }}>{medicalCertificate ? 'Change Attachment' : 'Attach PDF'}</Text>
                </TouchableOpacity>
                {medicalCertificate && (
                    <Text style={styles.attachmentText}>{medicalCertificate.name}</Text>
                )}
            </View> */}


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
    sectionTitle: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
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
        fontFamily: 'Poppins-Regular',

    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    attachmentButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 8,
        alignItems: 'center',
    },
    attachmentText: {
        marginTop: 8,
        color: 'white',
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

export default PhysicalAndHealthScreen;

