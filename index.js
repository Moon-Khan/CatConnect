
// index.js
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import RoleSelectionScreen from './RoleSelectionScreen'; // Import the new screen
import { name as appName } from './app.json';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => App);
