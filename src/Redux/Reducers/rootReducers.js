
// redux/reducers/rootReducer.js
import { combineReducers } from 'redux';

import authReducer from '../Slices/Auth/AuthSlice';
import catProfileReducer from '../Slices/CatProfile/CatProfileSlice'
import  firestoreReducer  from '../Slices/FirestoreSlice'; 

const rootReducer = combineReducers({
  auth: authReducer,
  catProfile: catProfileReducer,
  firestore:firestoreReducer,
});

export default rootReducer;