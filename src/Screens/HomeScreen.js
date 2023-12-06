// // ./src/HomeScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const HomeScreen = () => {
//   const [catProfileData, setCatProfileData] = useState(null);
//   const user = auth().currentUser;

//   useEffect(() => {
//     const fetchCatProfileData = async () => {
//       try {
//         // Assuming 'catProfiles' is the collection name in Firestore
//         const catProfileSnapshot = await firestore()
//           .collection('users')
//           .doc(user.uid) // Use user.uid instead of hardcoded userId
//           .collection('catProfiles')
//           .get();

//         console.log('catprofile snapshot', catProfileSnapshot.docs);

//         if (!catProfileSnapshot.empty) {
//           // Assuming there is only one document per user in 'catProfiles'
//           console.log('user login', user.uid);
//           const catProfileData = catProfileSnapshot.docs[0].data();
//           console.log('catProfile data', catProfileData);
//           setCatProfileData(catProfileData);
//         } else {
//           // No cat profile data found
//           setCatProfileData(null);
//         }
//       } catch (error) {
//         console.error('Error fetching cat profile data:', error);
//       }
//     };

//     if (user) {
//       fetchCatProfileData();
//     }
//   }, [user]); // Update the dependency to include user

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home Screen</Text>
//       {catProfileData !== null ? (
//         <View>
//           <Text>Cat Name: {catProfileData['1'].basicInfo.catName}</Text>
//           <Text>Breed: {catProfileData['1'].basicInfo.breed}</Text>
//           <Text>Age: {catProfileData['1'].basicInfo.age}</Text>
//           {catProfileData['4'].mediaUpload.mediaList && catProfileData['4'].mediaUpload.mediaList.length > 0 ? (
//             <Image
//               style={styles.catImage}
//               source={{ uri: catProfileData['4'].mediaUpload.mediaList[0].uri }}
//             />
//           ) : (
//             <Text>No cat profile picture available</Text>
//           )}
//           {/* Display other cat profile data properties */}
//         </View>
//       ) : (
//         <Text>Loading cat profile data...</Text>
//       )}
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
//   catImage: {
//     width: 200,
//     height: 200,
//     marginTop: 10,
//     resizeMode: 'cover',
//   },
// });

// export default HomeScreen;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Home from 'react-native-vector-icons/Feather';
// import Doctor from 'react-native-vector-icons/FontAwesome';
// import Chat from 'react-native-vector-icons/Ionicons';
// import Profile from 'react-native-vector-icons/Feather';
// import Noti from 'react-native-vector-icons/MaterialIcons';
// import Search from 'react-native-vector-icons/MaterialIcons';


// const HomeScreen = () => {
//   const [searchText, setSearchText] = useState('');

//   const handleSearch = (text) => {
//     setSearchText(text);
//   };

//   const renderRecommendedItems = () => {
//     const recommendedItems = ['Recommended', 'New', 'Persian', 'Colico', 'Himalayan', 'Black Contrast'];

//     return (
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.recommendedScrollContainer}
//       >
//         {recommendedItems.map((item, index) => (
//           <View key={index} style={styles.recommendedItem}>
//             <Text style={{ ...styles.recommendedText, color: 'white' }}>{item}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     );
//   };

//   const renderPetCard = (petName, description, age, gender, rating) => (
//     <View style={styles.petCard}>
//       <Text style={styles.petName}>{petName}</Text>
//       <Text style={styles.description}>{description}</Text>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.age}>{age}</Text>
//         <Text style={styles.gender}>{gender}</Text>
//       </View>
//       <View style={styles.ratingContainer}>
//         {/* Display rating stars or any other UI element */}
//         <Text style={styles.rating}>{rating}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Noti name="notifications-none" size={33} style={{ position: 'absolute', top: '1%', right: '1%' }} />

//       <View style={styles.header}>
//         <Text style={styles.greeting}>Hello User </Text>
//       </View>
//       <View style={styles.recommendedContainer}>
//         {renderRecommendedItems()}
//       </View>
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputContainer}>
//           <Search name="search" size={25} style={{ marginLeft: 10 }} color="#9F9F9F" />
//           <TextInput
//             placeholder="Search..."
//             placeholderTextColor="#9F9F9F"
//             onChangeText={handleSearch}
//             value={searchText}
//             style={styles.searchInput}
//           />
//         </View>
//       </View>

//       <ScrollView style={styles.petCardContainer}>
//         {renderPetCard('Mamoon Khan', 'Persian coated', '11 months old', 'Female', '4.5')}
//         {renderPetCard('Mamoon Khan', 'Persian coated', '11 months old', 'Female', '4.5')}
//         {renderPetCard('Mamoon Khan', 'Persian coated', '11 months old', 'Female', '4.5')}
//         {renderPetCard('Mamoon Khan', 'Persian coated', '11 months old', 'Female', '4.5')}
//       </ScrollView>

//       <View style={styles.bottomMenu}>
//         <TouchableOpacity style={styles.menuItem}>
//           <Home name="home" size={24} color="#47C1FF" />
//           <Text style={{ ...styles.menuText, color: '#47C1FF' }} >Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem}>
//           <Doctor name="stethoscope" size={24} color="#9F9F9F" />
//           <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem}>
//           <Chat name="chatbox-ellipses-outline" size={24} color="#9F9F9F" />
//           <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem}>
//           <Profile name="user" size={24} color="#9F9F9F" />
//           <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };


import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Home from 'react-native-vector-icons/Feather';
import Doctor from 'react-native-vector-icons/FontAwesome';
import Chat from 'react-native-vector-icons/Ionicons';
import Profile from 'react-native-vector-icons/Feather';
import Noti from 'react-native-vector-icons/MaterialIcons';
import Search from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [catProfiles, setCatProfiles] = useState([]);

  useEffect(() => {
    const fetchAllCatProfiles = async () => {
      try {
        // const user = auth().currentUser;


        const usersSnapshot = await firestore()
          .collection('users')
          .get();
        const promises = [];

        usersSnapshot.forEach((userDoc) => {
          const catProfilesSnapshot = userDoc.ref.collection('catProfiles').get();
          promises.push(catProfilesSnapshot);
        });

        const catProfilesSnapshots = await Promise.all(promises);

        const allCatProfilesData = catProfilesSnapshots.map((catProfileSnapshot) => {
          return catProfileSnapshot.docs.map((catProfileDoc) => catProfileDoc.data());
        }).flat();

        setCatProfiles(allCatProfilesData);

      } catch (error) {
        console.error('Error fetching all cat profiles:', error);
      }
    };

    fetchAllCatProfiles();
  }, []);



  const handleSearch = (text) => {
    setSearchText(text);
  };

  const renderRecommendedItems = () => {
    const recommendedItems = ['Recommended', 'New', 'Persian', 'Colico', 'Himalayan', 'Black Contrast'];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedScrollContainer}
      >
        {recommendedItems.map((item, index) => (
          <View key={index} style={styles.recommendedItem}>
            <Text style={{ ...styles.recommendedText, color: 'white' }}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    );

  };

  const renderPetCard = (catProfile) => {
    console.log('renderPet card catProfile=', catProfile);
    if (!catProfile || !catProfile['1'] || !catProfile['4']) {
      return (
        <View style={styles.petCard}>
          <Text>No cat profile data available</Text>
        </View>
      );
    }

    console.log('catProfile=', catProfile);
    const basicInfo = catProfile['1'].basicInfo || {};

    return (
      <View key={basicInfo.catName} style={styles.petCard}>
        <View style={styles.imageContainer}>
          {catProfile['4'].mediaUpload.mediaList && catProfile['4'].mediaUpload.mediaList.length > 0 ? (
            <Image
              style={styles.thumbnailImage}
              source={{ uri: catProfile['4'].mediaUpload.mediaList[0].uri }}
            />
          ) : (
            <Text>No cat profile picture available</Text>
          )}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.petName}>Cat Name: {basicInfo.catName}</Text>
          <Text style={styles.description}>Breed: {basicInfo.breed}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.age}>Age: {basicInfo.age}</Text>
            {/* Add more details if needed */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Noti name="notifications-none" size={33} style={{ position: 'absolute', top: '1%', right: '1%' }} />

      <View style={styles.header}>
        <Text style={styles.greeting}>Hello User </Text>
      </View>
      <View style={styles.recommendedContainer}>{renderRecommendedItems()}</View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search name="search" size={25} style={{ marginLeft: 10 }} color="#9F9F9F" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#9F9F9F"
            onChangeText={handleSearch}
            value={searchText}
            style={styles.searchInput}
          />
        </View>
      </View>


      <ScrollView >
        {catProfiles.map((catProfile) => renderPetCard(catProfile))}
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Home name="home" size={24} color="#47C1FF" />
          <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Doctor name="stethoscope" size={24} color="#9F9F9F" />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Chat name="chatbox-ellipses-outline" size={24} color="#9F9F9F" />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Profile name="user" size={24} color="#9F9F9F" />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',

  },
  subText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
  },
  recommendedContainer: {
    marginTop: 16,
  },
  recommendedScrollContainer: {
    paddingRight: 16,
  },
  recommendedItem: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#9F9F9F',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    color: '#212529',
  },

  searchContainer: {
    marginTop: 16,
  },
  imageContainer: {
    marginRight: 15,
  },

  thumbnailImage: {
    width: 70,
    height: 80,
    borderRadius: 5,
  },

  petCardContainer: {
    marginTop: 16,
  },
  petCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    padding: 16,
    borderRadius: 8,
    margin: 12,
    marginBottom: 2,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  age: {
    marginRight: 8,
  },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 10,
    padding: 5,  
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    margin: 5,
    fontSize: 12,
  },
});

export default HomeScreen;

