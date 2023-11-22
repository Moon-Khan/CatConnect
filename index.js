// // index.js

// import { AppRegistry } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SignupScreen from './SignupScreen';
// import LoginScreen from './LoginScreen' // Import LoginScreen
// import { name as appName } from './app.json';

// const Stack = createStackNavigator();

// const App = () => (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Signup">
//       <Stack.Screen name="Signup" component={SignupScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

// AppRegistry.registerComponent(appName, () => App);



// index.js
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => App);
