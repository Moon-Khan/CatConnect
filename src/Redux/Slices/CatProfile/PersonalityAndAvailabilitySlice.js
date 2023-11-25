// PhysicalAndHealthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    temperament: '',
    socialCompatibility: '',
    description: '',
    availabilityStatus: '',

};


const PersonalityAvialabilitySlice = createSlice({
    name: 'personalityAvialability',
    initialState,
    reducers: {
        updateTemperament: (state, action) => {
            state.color = action.payload;
        },
        updateSocialCompatibility: (state, action) => {
            state.pattern = action.payload;
        },
        updateDescription: (state, action) => {
            state.eyeColor = action.payload;
        },
        updateAvailabilityStatus: (state, action) => {
            state.coatLength = action.payload;
        },

    },
});

export const { updateTemperament, updateSocialCompatibility, updateDescription, updateAvailabilityStatus } = PersonalityAvialabilitySlice.actions;
export default PersonalityAvialabilitySlice.reducer;
