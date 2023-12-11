// Screens/BookAppointmentScreen.js
// Screens/BookAppointmentScreen.js
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserAppointmentToFirestore, addDoctorAppointmentToFirestore } from '../../Redux/Slices/FirestoreSlice';
import FirebaseService from '../../Services/firebase';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Add this line

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
];

const BookAppointmentScreen = ({ route }) => {
    const navigation = useNavigation();
    const { doctor } = route.params;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [isTimeSlotsModalVisible, setTimeSlotsModalVisibility] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    // Define toggleDatePicker function
    const toggleDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleDateChange = (event, date) => {
        setDatePickerVisibility(Platform.OS === 'ios');

        if (event && event.nativeEvent && event.nativeEvent.timestamp) {
            date = new Date(event.nativeEvent.timestamp);
        }

        if (date instanceof Date && !isNaN(date)) {
            setSelectedDate(date);
        } else {
            console.error('Error selecting date: Invalid date object');
            setSelectedDate(new Date()); // Set a default date or handle the error accordingly
        }
        console.log('Selected Date:', selectedDate); // Add this line
    };

    const toggleTimeSlotsModal = () => {
        setTimeSlotsModalVisibility(!isTimeSlotsModalVisible);
    };

    const handleTimeSlotSelect = (time) => {
        setSelectedTimeSlot(time);
        toggleTimeSlotsModal();
    };

    const handleBookAppointment = async () => {
        try {
            console.log('Doctor:', doctor.gmailId);
            console.log('User:', user.uid);
            console.log('Selected Date:', selectedDate);
            console.log('Selected Time Slot:', selectedTimeSlot);

            // Ensure that user, selectedDate, selectedTimeSlot, and doctor?.gmailId are defined
            if (!user || !user.uid || !selectedDate || !selectedTimeSlot || !doctor?.gmailId) {
                console.error('Error booking appointment: User, UID, date, time slot, or doctorGmailId is missing');
                return;
            }

            // Ensure that the user has a display name, or use a default name
            const patientName = user.displayName || 'Patient Name';

            const userAppointmentData = {
                doctorGmailId: doctor.gmailId,
                selectedDate: firestore.Timestamp.fromDate(selectedDate), // Corrected method
                selectedTimeSlot: selectedTimeSlot,
                status: 'Pending',
            };

            const doctorAppointmentData = {
                doctorGmailId: doctor.gmailId,
                patientName: patientName,
                selectedDate: firestore.Timestamp.fromDate(selectedDate), // Corrected method
                selectedTimeSlot: selectedTimeSlot,
                status: 'Pending',
                userId: user.uid,
            };

            console.log('User Appointment Data:', userAppointmentData);
            console.log('Doctor Appointment Data:', doctorAppointmentData);

            await dispatch(saveUserAppointmentToFirestore({ user, userAppointmentData }));
            await dispatch(addDoctorAppointmentToFirestore({ doctor, doctorAppointmentData }));

            navigation.navigate('Pending', { doctorId: doctor.gmailId });
            console.log('Appointment booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Book Appointment with Dr. {doctor.doctorName}</Text>

            <TouchableOpacity style={styles.datePickerButton} onPress={toggleDatePicker}>
                <Text style={styles.datePickerButtonText}>
                    {selectedDate.toLocaleDateString('en-US')}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.timeSlotPickerButton} onPress={toggleTimeSlotsModal}>
                <Text style={styles.timeSlotPickerButtonText}>
                    {selectedTimeSlot || 'Select Time Slot'}
                </Text>
            </TouchableOpacity>

            {isDatePickerVisible && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isTimeSlotsModalVisible}
                onRequestClose={toggleTimeSlotsModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Select Time Slot</Text>
                        <FlatList
                            data={timeSlots}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.timeSlotItem}
                                    onPress={() => handleTimeSlotSelect(item)}
                                >
                                    <Text style={styles.timeSlotText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBookAppointment}
            >
                <Text style={styles.bookButtonText}>Book Appointment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    datePickerButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
    datePickerButtonText: {
        fontSize: 16,
    },
    timeSlotPickerButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 16,
    },
    timeSlotPickerButtonText: {
        fontSize: 16,
    },
    bookButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    bookButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 10,
        width: '80%',
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    timeSlotItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    timeSlotText: {
        fontSize: 16,
    },
});

export default BookAppointmentScreen;