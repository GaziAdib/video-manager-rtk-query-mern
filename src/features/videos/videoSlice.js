import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    search: '',
    videoType: '',
};

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        search: (state, action) => {
            state.search = action.payload;
        },
        videoTypeSelected: (state, action) => {
            state.videoType = action.payload?.toLowerCase();
        },
        clearVideoType: (state, action) => {
            state.videoType = '';
        },
        clearSearch: (state) => {
            state.search = ''
        }
    }
});


export default videosSlice.reducer;
export const { search, clearSearch, videoTypeSelected, clearVideoType } = videosSlice.actions