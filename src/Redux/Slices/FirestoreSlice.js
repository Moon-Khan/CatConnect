import { createSlice } from '@reduxjs/toolkit';
import FirebaseService from '../../Services/firebase';

const initialState = {
  catProfiles: {}, // Object to store all user profiles
};

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {


    

    saveCatProfileToFirestore: (state, action) => {
      const catProfileData = action.payload;

      // Generate a unique key for each user profile
      const profileKey = Object.keys(state.catProfiles).length + 1;

      // Update the state to store all user profiles
      state.catProfiles[profileKey] = catProfileData;

      // Save to Firestore only when all 4 pages are filled
      if (Object.keys(state.catProfiles).length === 4) {
        // Assuming 'catProfiles' is the collection name in Firestore
        FirebaseService.addCatProfile(state.catProfiles, 'catProfiles');
      }
    },
  },
});

export const { saveCatProfileToFirestore } = firestoreSlice.actions;
export default firestoreSlice.reducer;