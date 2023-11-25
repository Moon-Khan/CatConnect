// MediaUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mediaList: [],
};

const mediaUploadSlice = createSlice({
  name: 'mediaUpload',
  initialState,
  reducers: {
    addMedia: (state, action) => {
      state.mediaList.push(action.payload);
    },
    clearMedia: (state) => {
      state.mediaList = [];
    },
  },
});

export const { addMedia, clearMedia } = mediaUploadSlice.actions;
export default mediaUploadSlice.reducer;
