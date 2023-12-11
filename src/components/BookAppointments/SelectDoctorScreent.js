// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const AppointmentHomeScreen = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [doctors, setDoctors] = useState([]);
//     const [filteredDoctors, setFilteredDoctors] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchDoctors = async () => {
//             try {
//                 const doctorsSnapshot = await firestore().collection('doctors').get();

//                 const doctorsData = doctorsSnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setDoctors(doctorsData);
//                 setFilteredDoctors(doctorsData); // Initialize filteredDoctors with all doctors
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching doctors:', error);
//                 setLoading(false);
//             }
//         };

//         fetchDoctors();
//     }, []);

//     const renderDoctorItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.doctorItem}
//             onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
//         >
//             <View style={styles.doctorIconContainer}>
//                 {/* You can replace the placeholder icon with the actual doctor icon */}
//                 <Text style={styles.doctorIcon}>👨‍⚕</Text>
//             </View>
//             <View style={styles.doctorInfoContainer}>
//                 <Text style={styles.doctorName}>{item.doctorName}</Text>
//                 <Text style={styles.doctorSpecialty}>{item.specialization}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     const handleSearch = (text) => {
//         setSearchQuery(text);
//         const filtered = doctors.filter((doctor) =>
//             doctor.doctorName.toLowerCase().includes(text.toLowerCase())
//         );
//         setFilteredDoctors(filtered);
//     };

//     if (loading) {
//         return <ActivityIndicator />;
//     }

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search Doctors"
//                 value={searchQuery}
//                 onChangeText={handleSearch}
//             />
//             <FlatList
//                 data={filteredDoctors}
//                 renderItem={renderDoctorItem}
//                 keyExtractor={(item) => item.id}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     searchInput: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 16,
//         padding: 8,
//     },
//     doctorItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//         paddingVertical: 16,
//     },
//     doctorIconContainer: {
//         marginRight: 16,
//     },
//     doctorIcon: {
//         fontSize: 24,
//     },
//     doctorInfoContainer: {
//         flex: 1,
//     },
//     doctorName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'black', // Set the font color to black
//     },
//     doctorSpecialty: {
//         fontSize: 16,
//         color: '#666',
//     },
// });

// export default AppointmentHomeScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DoctorCard = ({ doctor, onPress }) => (
    <TouchableOpacity style={styles.doctorCard} onPress={onPress}>
        <View style={styles.doctorIconContainer}>
            {/* You can replace the placeholder icon with the actual doctor icon */}
            <Text style={styles.doctorIcon}>👨‍⚕</Text>
        </View>
        <View style={styles.doctorInfoContainer}>
            <Text style={styles.doctorName}>{doctor.doctorName}</Text>
            <Text style={styles.doctorSpecialty}>{doctor.specialization}</Text>
        </View>
    </TouchableOpacity>
);

const AppointmentHomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsSnapshot = await firestore().collection('doctors').get();

                const doctorsData = doctorsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setDoctors(doctorsData);
                setFilteredDoctors(doctorsData); // Initialize filteredDoctors with all doctors
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = doctors.filter((doctor) =>
            doctor.doctorName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    const renderDoctorItem = ({ item }) => (
        console.log(' Appointment-item=',item),

        <DoctorCard
            doctor={item}
            onPress={() => navigation.navigate('DoctorDetailScreen', { doctorData: item })}
        />
    );

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search Doctors"
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredDoctors}
                renderItem={renderDoctorItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    doctorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        padding: 16,
        marginBottom: 12,
    },
    doctorIconContainer: {
        marginRight: 16,
    },
    doctorIcon: {
        fontSize: 24,
    },
    doctorInfoContainer: {
        flex: 1,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    doctorSpecialty: {
        fontSize: 16,
        color: '#666',
    },
});

export default AppointmentHomeScreen;
