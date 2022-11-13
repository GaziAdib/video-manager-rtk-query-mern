import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: ''
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        search: (state, action) => {
            state.search = action.payload;
        },
        clearSearch: (state) => {
            state.search = ''
        }
    }
});


export default blogSlice.reducer;
export const { search, clearSearch } = blogSlice.actions;