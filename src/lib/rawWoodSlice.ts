
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData: [],
    imageUrl: "https://image.tmdb.org/t/p/original"  // Set default TMDB image URL
}

const RawWoodSlice = createSlice({
    name: "RawWood",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload
        },
        setimageUrl: (state, action) => {
            state.imageUrl = action.payload
        }
    },
});

export const {  setBannerData, setimageUrl } = RawWoodSlice.actions;
export default RawWoodSlice.reducer