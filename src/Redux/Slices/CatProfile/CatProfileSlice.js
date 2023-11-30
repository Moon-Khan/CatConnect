// ./src/Redux/CatProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    basicInfo: {
        catName: '',
        breed: '',
        gender: '',
        age: '',
    },
    physicalHealth: {
        color: '',
        pattern: '',
        eyeColor: '',
        coatLength: '',
        vaccinationStatus: '',
        medicalCertificate: null,
    },
    personalityAndAvailability: {
        temperament: '',
        socialCompatibility: '',
        description: '',
        availabilityStatus: '',
    },
    mediaUpload: {
        mediaList: [],
    },
};

const catProfileSlice = createSlice({
    name: 'catProfile',
    initialState,
    reducers: {
        updateBasicInfo: (state, action) => {
            state.basicInfo = { ...state.basicInfo, ...action.payload };
        },
        updatePhysicalHealth: (state, action) => {
            state.physicalHealth = { ...state.physicalHealth, ...action.payload };
        },
        updatePersonalityAndAvailability: (state, action) => {
            state.personalityAndAvailability = {
                ...state.personalityAndAvailability,
                ...action.payload,
            };
        },
        
        addMedia: (state, action) => {
            state.mediaUpload.mediaList.push(action.payload);
        },
        clearMedia: (state) => {
            state.mediaUpload.mediaList = [];
        },
    },
});

export const {
    updateBasicInfo,
    updatePhysicalHealth,
    updatePersonalityAndAvailability,   
    addMedia,
    clearMedia,
} = catProfileSlice.actions;
export default catProfileSlice.reducer;
