// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation
// import { useSelector } from 'react-redux';
// import auth from '@react-native-firebase/auth';


// // Include CommonBtn directly in Pending.js
// const CommonBtn = ({ w, h, txt, onClick, status }) => {
//     return (
//         <TouchableOpacity
//             style={[
//                 styles.button,
//                 { width: w, height: h, backgroundColor: status ? '#2A2A72' : '#7F7F7F' },
//             ]}
//             onPress={onClick}
//             disabled={!status}
//         >
//             <Text style={styles.buttonText}>{txt}</Text>
//         </TouchableOpacity>
//     );
// };

// const Pending = ({ route }) => {

//     const { doctorId } = route.params;
//     const [appointments, setAppointments] = useState([]);
//     const navigation = useNavigation();
//     const loggedDoctorId = useSelector(state => state.auth.doctorId); // Assuming you have the doctorId in your auth state

//     const fetchPendingAppointments = async () => {
//         try {
//             const user = auth().currentUser;

//             if (user) {
//                 const appointmentsSnapshot = await firestore()
//                     .collection('appointments')
//                     .where('doctorId', '==', loggedDoctorId) // Check if the appointment is for the currently logged-in doctor
//                     .where('status', '==', 'Pending')
//                     .get();

//                 console.log('Appointments Snapshot:', appointmentsSnapshot);

//                 if (appointmentsSnapshot.empty) {
//                     console.log('No pending appointments found for doctorId:', doctorId);
//                     setAppointments([]);
//                 } else {
//                     const pendingAppointments = appointmentsSnapshot.docs.map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }));

//                     console.log('Pending Appointments:', pendingAppointments);
//                     setAppointments(pendingAppointments);
//                 }
//             }
//         } catch (error) {
//             console.error('Error fetching appointments:', error);
//         }
//     };


//     const handleAccept = async (id) => {
//         try {
//             await firestore()
//                 .collection('doctors')
//                 .doc(doctorId)
//                 .collection('appointments')
//                 .doc(id)
//                 .update({
//                     status: 'Accepted',
//                 });

//             fetchPendingAppointments();

//             // Navigate to confirmation screen with status
//             navigation.navigate('Home', { status: 'Accepted' });
//         } catch (error) {
//             console.error('Error accepting appointment:', error);
//         }
//     };

//     const handleReject = async (id) => {
//         try {
//             await firestore()
//                 .collection('doctors')
//                 .doc(doctorId)
//                 .collection('appointments')
//                 .doc(id)
//                 .update({
//                     status: 'Rejected',
//                 });

//             fetchPendingAppointments();

//             // Navigate to confirmation screen with status
//             navigation.navigate('AppointmentConfirmation', { status: 'Rejected' });
//         } catch (error) {
//             console.error('Error rejecting appointment:', error);
//         }
//     };

//     useEffect(() => {
//         fetchPendingAppointments();
//     }, [doctorId]);

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 {/* <TouchableOpacity style={styles.backBtn} underlayColor="#ffffff00">
//                     <Image source={require('./images/back.png')} style={styles.back} />
//                 </TouchableOpacity> */}
//                 <Text style={[styles.title, { marginLeft: 10 }]}>Pending Appointments</Text>
//             </View>

//             <FlatList
//                 data={appointments}
//                 renderItem={({ item }) => (
//                     <View style={styles.itemView}>
//                         {/* <Image source={require('./images/profile.png')} style={styles.docImage} /> */}

//                         <View style={styles.detailsContainer}>
//                             <Text style={styles.name}>{item.patientName}</Text>
//                             <Text style={styles.timing}>
//                                 Day: {item.day}, Slot: {item.slot}
//                             </Text>
//                         </View>

//                         <Text style={styles.status}>{item.status}</Text>

//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity onPress={() => handleAccept(item.id)}>
//                                 <Text style={[styles.actionButton, { color: 'green' }]}>Accept</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => handleReject(item.id)}>
//                                 <Text style={[styles.actionButton, { color: 'red' }]}>Reject</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}
//                 keyExtractor={(item) => item.id.toString()}
//             />

//             {/* Using CommonBtn directly in Pending.js */}
//             <CommonBtn
//                 w={200}
//                 h={40}
//                 txt="View Appointments"
//                 onClick={() => navigation.navigate('Pending', { doctorId: doctorProfile?.id })}
//                 status={true}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     itemView: {
//         width: '94%',
//         height: 100,
//         borderRadius: 10,
//         borderWidth: 0.5,
//         alignSelf: 'center',
//         marginTop: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 15,
//     },
//     docImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//     },
//     detailsContainer: {
//         flex: 1,
//         marginLeft: 15,
//     },
//     name: {
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     timing: {
//         fontSize: 16,
//         marginTop: 5,
//     },
//     status: {
//         borderRadius: 10,
//         backgroundColor: '#f2f2f2',
//         padding: 5,
//         color: 'orange',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     actionButton: {
//         marginLeft: 10,
//         fontWeight: '600',
//     },
//     header: {
//         height: 60,
//         width: '100%',
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         elevation: 5,
//         alignItems: 'center',
//         paddingLeft: 20,
//     },
//     back: {
//         width: 24,
//         height: 24,
//     },
//     backBtn: {
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     // Styles for CommonBtn
//     button: {
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 16,
//         backgroundColor: '#2A2A72', // Default background color
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//     },
// });

// export default Pending;


// DoctorAppointmentsList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


const AppointmentCard = ({ appointment, onAccept, onReject }) => (
  <View style={styles.appointmentCard}>
    <Text>User Name: {appointment.userName}</Text>
    <Text>Status: {appointment.status}</Text>
    <TouchableOpacity onPress={() => onAccept(appointment.id)}>
      <Text style={styles.actionButton}>Accept</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onReject(appointment.id)}>
      <Text style={styles.actionButton}>Reject</Text>
    </TouchableOpacity>
  </View>
);

const DoctorAppointmentsList = ({ route }) => {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  const { doctorId } = route.params;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsSnapshot = await firestore()
          .collection('Appointments')
          .where('doctorId', '==', doctorId)
          .get();

        const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleAccept = async (appointmentId) => {
    try {
      // Update appointment status in Firestore
      await firestore().collection('Appointments').doc(appointmentId).update({
        status: 'Accepted',
      });

      // Fetch user's FCM token from Firestore
      const appointmentSnapshot = await firestore().collection('Appointments').doc(appointmentId).get();
      const userId = appointmentSnapshot.data().userId;

      const userSnapshot = await firestore().collection('users').doc(userId).get();
      const userToken = userSnapshot.data().fcmToken;

      // Notify the user about the appointment status change
      await firestore().collection('Notifications').add({
        userId: userId,
        message: 'Your appointment has been accepted.',
        status: 'unread',
      });

      // Send a push notification to the user
      await sendPushNotification(userToken, 'Appointment Accepted', 'Your appointment has been accepted.');
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      // Update appointment status in Firestore
      await firestore().collection('Appointments').doc(appointmentId).update({
        status: 'Rejected',
      });

      // Fetch user's FCM token from Firestore
      const appointmentSnapshot = await firestore().collection('Appointments').doc(appointmentId).get();
      const userId = appointmentSnapshot.data().userId;

      const userSnapshot = await firestore().collection('users').doc(userId).get();
      const userToken = userSnapshot.data().fcmToken;

      // Notify the user about the appointment status change
      await firestore().collection('Notifications').add({
        userId: userId,
        message: 'Your appointment has been rejected.',
        status: 'unread',
      });

      // Send a push notification to the user
      await sendPushNotification(userToken, 'Appointment Rejected', 'Your appointment has been rejected.');
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };


  const sendPushNotification = async (userToken, title, message) => {
    try {
      await messaging().sendMessage({
        data: {
          title,
          body: message,
        },
        token: userToken,
      });
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };


  return (
    <View style={styles.container}>
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appointmentCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
  },
  actionButton: {
    color: 'blue',
    marginTop: 8,
  },
});

export default DoctorAppointmentsList;
