import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    search: '',
};

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        search: (state, action) => {
            state.search = action.payload;
        },
        clearSearch:(state) => {
            state.search = ''
        }
    }
});


export default videosSlice.reducer;
export const { search, clearSearch } = videosSlice.actions