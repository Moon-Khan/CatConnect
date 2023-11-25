import { AppRegistry } from 'react-native';
import App from './src/App'; // Import your main component
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App); // Register the main component
