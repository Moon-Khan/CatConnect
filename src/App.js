
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './Redux/Stores/store';
import SignupScreen from './components/auth/SignupScreen';
import LoginScreen from './components/auth/LoginScreen';
import HomeScreen from '../src/Screens/HomeScreen';
import RoleSelectionScreen from './Screens/RoleSelectionScreen';
import CatBasicInfoScreen from './components/CatProfile/CatBasicInfoScreen';
import PhysicalAndHealthInfo from './components/CatProfile/PhysicalAndHealthInfoScreeen';
import PersonalityAndAvailabilityInfo from './components/CatProfile/PersonalityAndAvailabilityInfoScreen'
import CatMediaUploadScreen from './components/CatProfile/MediaUploadScreen';
import DoctorBasicInfoScreen from './components/DoctorProfile/DoctorBasicInfoScreen';
import DoctorHome from './components/DoctorProfile/DoctorHome';
import Pending from './components/DoctorProfile/Pending';

const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CatBasicInfo" component={CatBasicInfoScreen} />
        <Stack.Screen name="PhysicalAndHealthInfo" component={PhysicalAndHealthInfo} />
        <Stack.Screen name="PersonalityAndAvailabilityInfo" component={PersonalityAndAvailabilityInfo} />
        <Stack.Screen name="CatMediaUpload" component={CatMediaUploadScreen} />
        <Stack.Screen name="DoctorBasicInfo" component={DoctorBasicInfoScreen} />
        <Stack.Screen name="DoctorHome" component={DoctorHome} />
        <Stack.Screen name="Pending" component={Pending} />


      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
