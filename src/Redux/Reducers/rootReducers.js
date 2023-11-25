
// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';

import authReducer from '../Slices/Auth/AuthSlice';
import basicInfoReducer from '../Slices/CatProfile/BasicInfoSlice'; // Change to 'basicInfoReducer'
import physicalHealthReducer from '../Slices/CatProfile/PhysicalAndHealthSlice';
import personalityAvailabilityReducer from '../Slices/CatProfile/PersonalityAndAvailabilitySlice';
import mediaUploadReducer from '../Slices/CatProfile/MediaUploadSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  BasicInfo: basicInfoReducer, // Change to 'basicInfoReducer'
  physicalHealth: physicalHealthReducer,
  personalityAvialability: personalityAvailabilityReducer,
  mediaUpload: mediaUploadReducer,
  // Add other reducers here if you have more slices
});

export default rootReducer;