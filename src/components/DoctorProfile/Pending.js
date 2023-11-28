import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Header from './Header';

const Pending = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, doctor: 'Waqas', time: '08:10 PM', status: 'Pending' },
        { id: 2, doctor: 'Mamoon', time: '08:10 PM', status: 'Pending' },
        { id: 3, doctor: 'Saira', time: '08:10 PM', status: 'Pending' },
        { id: 4, doctor: 'Sir Rizwan', time: '08:10 PM', status: 'Pending' },
        // Add more appointments as needed
    ]);

    const handleAccept = (id) => {
        // Update the status of the accepted appointment
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status: 'Accepted' } : appointment
        );
        setAppointments(updatedAppointments);

        // Implement any additional logic if needed
        console.log(`Appointment ${id} accepted`);
    };

    const handleReject = (id) => {
        // Update the status of the rejected appointment
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status: 'Rejected' } : appointment
        );
        setAppointments(updatedAppointments);

        // Implement any additional logic if needed
        console.log(`Appointment ${id} rejected`);
    };

    return (
        <View style={styles.container}>
            <Header icon={require('./images/back.png')} title={'Pending Appointments'} />
            <FlatList
                data={appointments}
                renderItem={({ item }) => (
                    <View style={styles.itemView}>
                        <Image source={require('./images/profile.png')} style={styles.docImage} />
                        <View style={styles.detailsContainer}>
                            <Text style={styles.name}>{item.doctor}</Text>
                            <Text style={styles.timing}>{item.time}</Text>
                        </View>
                        <Text style={styles.status}>{item.status}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleAccept(item.id)}>
                                <Text style={[styles.actionButton, { color: 'green' }]}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleReject(item.id)}>
                                <Text style={[styles.actionButton, { color: 'red' }]}>Reject</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemView: {
        width: '94%',
        height: 100,
        borderRadius: 10,
        borderWidth: 0.5,
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    docImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    timing: {
        fontSize: 16,
        marginTop: 5,
    },
    status: {
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
        padding: 5,
        color: 'orange',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 10,
        fontWeight: '600',
    },
});

export default Pending;
