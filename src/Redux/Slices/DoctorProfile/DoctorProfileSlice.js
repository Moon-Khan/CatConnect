// CatProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    doctorbasicInfo: {
        doctorName: '',
        specialization: '',
        degree: '',
        contactInfo: '',
        hospitalInfo: '',
        experience: '',
        qualifications: '',
        fee: '',
    },
};

const doctorProfileSlice = createSlice({
    name: 'doctorProfile',
    initialState,
    reducers: {
        updateDoctorbasicInfo: (state, action) => {
            state.doctorbasicInfo = { ...state.doctorbasicInfo, ...action.payload };
        },
    },
});

export const {
    updateDoctorbasicInfo,
} = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
