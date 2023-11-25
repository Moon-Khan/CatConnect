// PhysicalAndHealthSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    color: '',
    pattern: '',
    eyeColor: '',
    coatLength: '',
    vaccinationStatus: '',
    medicalCertificate: null,
};

const PhysicalHealthSlice = createSlice({
    name: 'physicalHealth',
    initialState,
    reducers: {
        updateColor: (state, action) => {
            state.color = action.payload;
        },
        updatePattern: (state, action) => {
            state.pattern = action.payload;
        },
        updateEyeColor: (state, action) => {
            state.eyeColor = action.payload;
        },
        updateCoatLength: (state, action) => {
            state.coatLength = action.payload;
        },
        updateVaccinationStatus: (state, action) => {
            state.vaccinationStatus = action.payload;
        },
        updateMedicalCertificate: (state, action) => {
            state.medicalCertificate = action.payload;
        },
    },
});

export const { updateColor, updatePattern, updateEyeColor, updateCoatLength, updateVaccinationStatus,updateMedicalCertificate } = PhysicalHealthSlice.actions;
export default PhysicalHealthSlice.reducer;
