// ./src/Screen/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeIcon from 'react-native-vector-icons/Feather';
import DoctorIcon from 'react-native-vector-icons/FontAwesome';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/Feather';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [catProfiles, setCatProfiles] = useState([]);
  const [userData, setUserData] = useState({});
  const [filteredCatProfiles, setFilteredCatProfiles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [haReadNotifications, setHasReadNotifications] = useState(false);


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
        const usersSnapshot = await firestore().collection('users').get();
        const promises = [];

        usersSnapshot.forEach((userDoc) => {
          const catProfilesSnapshot = userDoc.ref.collection('catProfiles').get();
          promises.push(catProfilesSnapshot);
        });

        const catProfilesSnapshots = await Promise.all(promises);

        const allCatProfilesData = catProfilesSnapshots
          .map((catProfileSnapshot) => {
            return catProfileSnapshot.docs.map((catProfileDoc) => catProfileDoc.data());
          })
          .flat();

        setCatProfiles(allCatProfilesData);
      } catch (error) {
        console.error('Error fetching all cat profiles:', error);
      }
    };

    fetchAllCatProfiles();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const unreadNotificationsSnapshot = await firestore()
          .collection('Notifications')
          .where('userId', '==', user.uid)
          .where('status', '==', 'unread')
          .get();

        const readNotificationsSnapshot = await firestore()
          .collection('Notifications')
          .where('userId', '==', user.uid)
          .where('status', '==', 'read')
          .get();

        const unreadNotificationsData = unreadNotificationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const readNotificationsData = readNotificationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(unreadNotificationsData);
        setHasUnreadNotifications(unreadNotificationsData.length > 0);
        setHasReadNotifications(readNotificationsData.length > 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user.uid]);

  const handleNotificationPress = () => {
    // Navigate to NotificationsScreen and mark all unread notifications as read
    navigation.navigate('NotificationsScreen', { notifications});
    // navigation.navigate('NotificationsScreen', { notifications, markAsRead: markAllAsRead });
  };

  const markAllAsRead = async () => {
    try {
      // Mark all unread notifications as read
      await Promise.all(
        notifications.map(async (notification) => {
          await firestore().collection('Notifications').doc(notification.id).update({
            status: 'read',
          });
        })
      );

      // Update state to reflect that all notifications have been read
      setNotifications([]);
      setHasUnreadNotifications(false);
      setHasReadNotifications(false);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };



  const handleSearch = (text) => {
    setSearchText(text);

    const filteredProfiles = catProfiles.filter((catProfile) => {
      const catName = catProfile['1'].basicInfo.catName.toLowerCase();
      return catName.includes(text.toLowerCase());
    });

    setFilteredCatProfiles(filteredProfiles);
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
      <TouchableOpacity
        key={basicInfo.catName}
        style={styles.petCard}
        onPress={() => handleCatProfilePress(catProfile)}
      >
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


      <TouchableOpacity style={styles.notifibutton} onPress={handleNotificationPress}>
        <Image
          style={styles.NotificationIcon}
          resizeMode="cover"
          source={require("../../assets/Catassets/notification.png")}
        />
        {hasUnreadNotifications && <View style={styles.unreadDot} />}
        {haReadNotifications && <View style={styles.readDot} />}
      </TouchableOpacity>

      <ScrollView>
        {searchText.trim() !== ''
          ? filteredCatProfiles.map((catProfile) => renderPetCard(catProfile))
          : catProfiles.map((catProfile) => renderPetCard(catProfile))}
      </ScrollView>
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <HomeIcon name="home" size={24} color="#47C1FF" />
          <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AppointmentScreen')}>
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
    top: 5,
  },
  hearticon: {
    width: 110,
    height: 15,
    position: "absolute",
    top: 79,
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
  notifibutton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  unreadDot: {
    position: 'absolute',
    top: 5,
    right: 25,
    backgroundColor: '#47C1FF',
    width: 12,
    height: 10,
    borderRadius: 5,
  },
  readDot: {
    position: 'absolute',
    top: 5,
    right: 25,
    // backgroundColor: 'black',
    width: 12,
    height: 10,
    borderRadius: 5,
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
    width: '100%',
  },
  petName: {
    fontSize: 16,
    marginBottom: 1,
    color: '#212529',
    fontFamily: 'Poppins-SemiBold',
  },
  breed: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 1,
    fontFamily: 'Poppins-Medium',
  },
  available: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 1,
    fontFamily: 'Poppins-SemiBold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginTop: 10,
  },

  menuItem: {
    alignItems: 'center',

  },
  menuText: {
    // margin: 5,
    fontSize: 12,
  },
});

export default HomeScreen;

