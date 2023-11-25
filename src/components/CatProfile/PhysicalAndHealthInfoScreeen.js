// PhysicalAndHealthInfoScreen.js
import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import {updateColor, updatePattern, updateEyeColor, updateCoatLength, updateVaccinationStatus, updateMedicalCertificate} from '../../Redux/Slices/CatProfile/PhysicalAndHealthSlice';


const PhysicalAndHealthScreen = ({ navigation }) => {

  
    const color = useSelector((state) => state.physicalHealth.color);
    const pattern = useSelector((state) => state.physicalHealth.pattern);
    const eyeColor = useSelector((state) => state.physicalHealth.eyeColor);
    const coatLength = useSelector((state) => state.physicalHealth.coatLength);
    const vaccinationStatus = useSelector((state) => state.physicalHealth.vaccinationStatus);
    const medicalCertificate = useSelector((state) => state.physicalHealth.medicalCertificate);

    //redux code
    const dispatch = useDispatch();


    const handleColorChange = (text) => {
        dispatch(updateColor(text));
    };

    const handlePatternChange = (text) => {
        dispatch(updatePattern(text));
    };

    const handleEyeColorChange = (text) => {
        dispatch(updateEyeColor(text));
    };

    const handleCoatLengthChange = (text) => {
        dispatch(updateCoatLength(text));
    };
    const handleVaccinationStatusChange = (text) => {
        dispatch(updateVaccinationStatus(text));
    };
    const handleMedicalCertificateChange = (text) => {
        dispatch(updateMedicalCertificate(text));
    };



    // const handleSave = () => {
    //     // Handle saving data to your store or API
    //     console.log('Data saved:', { color, pattern, eyeColor, coatLength, vaccinationStatus, medicalCertificate });
    // };

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
        // Navigate to the next page (replace 'NextPage' with the actual name of the next screen)
        navigation.navigate('PersonalityAndAvailabilityInfo');
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
                <RadioButton.Group onValueChange={handleVaccinationStatusChange} value={vaccinationStatus}>
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




  // const [color, setColor] = useState('');
    // const [pattern, setPattern] = useState('');
    // const [eyeColor, setEyeColor] = useState('');
    // const [coatLength, setCoatLength] = useState('');

    // const [vaccinationStatus, setVaccinationStatus] = useState('');
    // const [medicalCertificate, setMedicalCertificate] = useState(null);



           {/* <Button mode="contained" style={styles.saveButton} onPress={handleSave}>
                Save
            </Button> */}