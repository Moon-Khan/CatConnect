
// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';

import authReducer from '../Slices/Auth/AuthSlice';
import catProfileReducer from '../Slices/CatProfile/CatProfileSlice'
import  firestoreReducer  from '../Slices/FirestoreSlice'; 
import doctorProfileReducer from '../Slices/DoctorProfile/DoctorProfileSlice'; 

const rootReducer = combineReducers({
  auth: authReducer,
  catProfile: catProfileReducer,
  firestore:firestoreReducer,
  doctorProfile: doctorProfileReducer,
});

export default rootReducer;