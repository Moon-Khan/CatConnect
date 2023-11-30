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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Cat Information</Text>

            <View style={styles.inputContainer}>
                <Text>Cat Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cat Color"
                    value={color}
                    onChangeText={handleColorChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Cat Pattern</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cat Pattern"
                    value={pattern}
                    onChangeText={handlePatternChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Eye Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Eye Color"
                    value={eyeColor}
                    onChangeText={handleEyeColorChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Coat Length</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Coat Length"
                    value={coatLength}
                    onChangeText={handleCoatLengthChange}
                />
            </View>

            <Text style={styles.sectionTitle}>Health and Medical Information</Text>

            <View style={styles.inputContainer}>
                <Text>Vaccination Status</Text>
                <RadioButton.Group
                    onValueChange={(value) => handleVaccinationStatusChange(value)}
                    value={vaccinationStatus}
                >
                    <View style={styles.radioButtonContainer}>
                        <RadioButton.Item label="Vaccinated" value="Vaccinated" />
                        <RadioButton.Item label="Not Vaccinated" value="Not Vaccinated" />
                    </View>
                </RadioButton.Group>
            </View>

            <View style={styles.inputContainer}>
                <Text>Medical Certificate</Text>
                <TouchableOpacity style={styles.attachmentButton} value={medicalCertificate} onPress={handleAttachment}>
                    <Text>{medicalCertificate ? 'Change Attachment' : 'Attach PDF'}</Text>
                </TouchableOpacity>
                {medicalCertificate && (
                    <Text style={styles.attachmentText}>{medicalCertificate.name}</Text>
                )}
            </View>

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
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
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
        color: 'blue',
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
    saveButton: {
        marginTop: 16,
    },
});

export default PhysicalAndHealthScreen;

