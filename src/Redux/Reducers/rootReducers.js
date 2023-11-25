// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import catProfileReducer from '../Slices/CatProfile/BasicInfoSlice';
import physicalHealthReducer from '../Slices/CatProfile/PhysicalAndHealthSlice'; 
import personalityAvailabilityReducer from '../Slices/CatProfile/PersonalityAndAvailabilitySlice'; 
import mediaUploadReducer from '../Slices/CatProfile/MediaUploadSlice';


const rootReducer = combineReducers({
  catProfile: catProfileReducer,
  physicalHealth: physicalHealthReducer,
  personalityAvialability:personalityAvailabilityReducer,
  mediaUpload: mediaUploadReducer,
  // Add other reducers here if you have more slices
});

export default rootReducer;
