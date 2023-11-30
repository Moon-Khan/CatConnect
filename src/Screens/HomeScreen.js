// // ./src/HomeScreen.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const HomeScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center', 
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//   },
// });

// export default HomeScreen;



// ./src/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [catProfileData, setCatProfileData] = useState(null);
  const userId = useSelector((state) => state.auth.user.uid);

  useEffect(() => {
    const fetchCatProfileData = async () => {
      try {
        // Assuming 'catProfiles' is the collection name in Firestore
        const catProfileSnapshot = await firestore()
          .collection('users')
          .doc(userId)
          .collection('catProfiles')
          .doc('default') // You may need to adjust this based on your data structure
          .get();

        if (catProfileSnapshot.exists) {
          setCatProfileData(catProfileSnapshot.data());
        } else {
          // No cat profile data found
          setCatProfileData(null);
        }
      } catch (error) {
        console.error('Error fetching cat profile data:', error);
      }
    };

    fetchCatProfileData();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {catProfileData ? (
        <View>
          <Text>Cat Name: {catProfileData.catName}</Text>
          <Text>Breed: {catProfileData.breed}</Text>
          {/* Display other cat profile data properties */}
        </View>
      ) : (
        <Text>No cat profile data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
