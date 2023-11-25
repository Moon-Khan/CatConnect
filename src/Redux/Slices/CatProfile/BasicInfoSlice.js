// BasicInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  catName: '',
  breed: '',
  gender: '',
  age: '',
};

const basicInfoSlice = createSlice({
  name: 'BasicInfo',
  initialState,
  reducers: {
    updateCatName: (state, action) => {
      state.catName = action.payload;
    },
    updateBreed: (state, action) => {
      state.breed = action.payload;
    },
    updateGender: (state, action) => {
      state.gender = action.payload;
    },
    updateAge: (state, action) => {
      state.age = action.payload;
    },
  },
});

export const { updateCatName, updateBreed, updateGender, updateAge } = basicInfoSlice.actions;
export default basicInfoSlice.reducer;
