import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    search: '',
    videoType: '',
    pageNumber: 1
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
        },
        changeCurrentPage: (state, action) => {
            state.pageNumber = action.payload;
        }
    }
});


export default videosSlice.reducer;
export const { search, clearSearch, videoTypeSelected, clearVideoType, changeCurrentPage } = videosSlice.actions