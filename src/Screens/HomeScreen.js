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
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CatScreen from './CatScreen'; // Import your CatScreen component
import HomeIcon from 'react-native-vector-icons/Feather';
import DoctorIcon from 'react-native-vector-icons/FontAwesome';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/Feather';
import NotificationIcon from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [catProfiles, setCatProfiles] = useState([]);
  const [userData, setUserData] = useState({}); // Initialize with an empty object
  // const { width, height } = Dimensions.get('window');

  const user = auth().currentUser;

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log('User document does not exist in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {


    const fetchAllCatProfiles = async () => {
      try {

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

  const handleCatProfilePress = (catProfile) => {
    navigation.navigate('CatScreen', { catProfile });
  };

  const renderRecommendedItems = () => {
    const recommendedItems = ['New'];
    const recommendedItems2 = ['Recommended', 'Persian', 'Colico', 'Himalayan', 'Black Contrast'];


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
        {recommendedItems2.map((item, index) => (
          <View key={index} style={styles.recommendedItem2}>
            <Text style={{ ...styles.recommendedText, color: '#7E7E7E' }}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const renderPetCard = (catProfile) => {

    if (!catProfile || !catProfile['1'] || !catProfile['4']) {
      return (
        <View style={styles.petCard}>
          <Text>No cat profile data available</Text>
        </View>
      );
    }

    const basicInfo = catProfile['1'].basicInfo || {};
    const personalityAndAvailability = catProfile['3'].personalityAndAvailability || {};

    return (
      <TouchableOpacity key={basicInfo.catName} style={styles.petCard} onPress={() => handleCatProfilePress(catProfile)}>

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
          <Text style={styles.petName}>{basicInfo.catName}</Text>
          <Text style={styles.breed}>{basicInfo.breed}</Text>
          <Text style={styles.available}>{personalityAndAvailability.availabilityStatus}</Text>
          <Image
            style={styles.hearticon}
            resizeMode="cover"
            source={require("../../assets/Catassets/hearts.png")}
          />

        </View>
      </TouchableOpacity>

    );
  };

  return (
    <View style={styles.container}>
      {/* <NotificationIcon name="notifications-none" size={33}
        import availabilityStatusstyle={{ position: 'absolute', top: '1%', right: '1%' }} /> */}
      <Image
        style={styles.NotificationIcon}
        resizeMode="cover"
        source={require("../../assets/Catassets/notification.png")}
      />

      <View style={styles.header1}>
        <Text style={styles.greeting}>Hello {userData.username || ''} </Text>
        <Image
          style={styles.handicon}
          resizeMode="cover"
          source={require("../../assets/Catassets/hand.png")}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.greeting}>Select Best Breed For Your Cat </Text>
      </View>


      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon name="search" size={25} style={{ marginLeft: 10 }} color="#9F9F9F" />

          <TextInput
            placeholder="Search..."
            placeholderTextColor="#9F9F9F"
            onChangeText={handleSearch}
            value={searchText}
            style={styles.searchInput}
          />
          <Image
            style={styles.filtericon}
            resizeMode="cover"
            source={require("../../assets/Catassets/filter.png")}
          />

        </View>

        <View style={styles.recommendedContainer}>{renderRecommendedItems()}</View>

      </View>



      <ScrollView>
        {catProfiles.map((catProfile) => renderPetCard(catProfile))}
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}
        >
          <HomeIcon name="home" size={24} color="#47C1FF" />
          <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DoctorScreen')}>
          <DoctorIcon name="stethoscope" size={24} color="#9F9F9F" />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatScreen')}>
          <ChatIcon name="chatbox-ellipses-outline" size={24} color="#9F9F9F" />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <ProfileIcon name="user" size={24} color="#9F9F9F" />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  greeting: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
    flex: 1,
    flexDirection: 'row',

  },
  handicon: {
    flex: 1,
    flexDirection: 'row',
    width: 30,
    height: 30,
    position: "absolute",
    left: 125,
  },
  filtericon: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  NotificationIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 10,
    top:5,
  },
  // NotificationIcon: {
  //   position: 'absolute',
  //   top: height * 0.01, // Use a percentage of the screen height
  //   right: width * 0.02, // Use a percentage of the screen width
  //   height: height * 0.05, // Use a percentage of the screen height
  //   width: width * 0.07, // Use a percentage of the screen width
  // },

  hearticon: {
    width: 110,
    height: 15,
    position: "absolute",
    top: 79,
  },
  // hearticon: {
  //   width: width * 0.7, // Use a percentage of the screen width
  //   height: 15,
  //   position: "absolute",
  //   top: height * 0.7, // Use a percentage of the screen height
  // },


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
    backgroundColor: '#47C1FF',
    paddingTop: 10,
    paddingLeft: 17,
    paddingRight: 17,
    marginRight: 10,
    borderRadius: 20,
  },
  recommendedItem2: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    borderRadius: 20,
  },
  recommendedText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
  },


  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
  },
  // searchInputContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderColor: '#fff',
  //   backgroundColor: '#fff',
  //   width: width * 0.9, // Use a percentage of the screen width
  //   borderWidth: 1,
  //   borderRadius: 25,
  //   height: 50,
  // },

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
    width: 90,
    height: 100,
    borderRadius: 5,
  },

  petCardContainer: {
    marginTop: 16,
  },
  petCard: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    paddingLeft: 20,
    borderRadius: 8,
    margin: 12,
    marginLeft: 0,
    marginBottom: 2,
    width: '100%'
  },

  petName: {
    fontSize: 16,
    marginBottom: 1,
    color: '#212529',
    fontFamily: 'Poppins-SemiBold'
  },

  breed: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 1,
    fontFamily: 'Poppins-Medium'
  },

  available: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 1,
    fontFamily: 'Poppins-SemiBold'
  },

  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 10,
    // padding: 5,
  },
  menuItem: {

    alignItems: 'center',
    borderColor: '#9F9F9F',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
  },
  menuText: {
    // margin: 5,
    fontSize: 12,
  },
});

export default HomeScreen;

