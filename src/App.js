
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './Redux/Stores/store';
import SignupScreen from './components/UserAuth/SignupScreen';
import LoginScreen from './components/UserAuth/LoginScreen';
import DoctorSignupScreen from './components/DoctorAuth/DoctorSignupScreen';
import DoctorLoginScreen from './components/DoctorAuth/DoctorLoginScreen';
import HomeScreen from '../src/Screens/HomeScreen';
import DoctorHomeScreen from '../src/Screens/DoctorHome';
import AppointmentScreen from './components/BookAppointments/SelectDoctorScreent';
import CatScreen from './Screens/CatDetailScreen';
import DoctorDetailScreen from './Screens/DoctorDetailScreen';
import RoleSelectionScreen from './Screens/RoleSelectionScreen';
import CatBasicInfoScreen from './components/CatProfile/CatBasicInfoScreen';
import PhysicalAndHealthInfo from './components/CatProfile/PhysicalAndHealthInfoScreeen';
import PersonalityAndAvailabilityInfo from './components/CatProfile/PersonalityAndAvailabilityInfoScreen'
import CatMediaUploadScreen from './components/CatProfile/MediaUploadScreen';
import Splashscreen from './Screens/Splash';
import ProfileScreen from './Screens/ProfileScreen';
import PendingAppointment from './Screens/DcotorAppointmentLists';  

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splashscreen">

        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DoctorSignupScreen" component={DoctorSignupScreen} />
        <Stack.Screen name="DoctorLoginScreen" component={DoctorLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="CatScreen" component={CatScreen} />
        <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CatBasicInfo" component={CatBasicInfoScreen} />
        <Stack.Screen name="PhysicalAndHealthInfo" component={PhysicalAndHealthInfo} />
        <Stack.Screen name="PersonalityAndAvailabilityInfo" component={PersonalityAndAvailabilityInfo} />
        <Stack.Screen name="CatMediaUpload" component={CatMediaUploadScreen} />
        <Stack.Screen name="PendingAppointments" component={PendingAppointment} />

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
