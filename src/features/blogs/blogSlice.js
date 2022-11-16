import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogSearch: ''
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        searchBlog: (state, action) => {
            state.blogSearch = action.payload;
        },
        clearSearchBlog: (state) => {
            state.blogSearch = '';
        }
    }
});


export default blogSlice.reducer;
export const { searchBlog, clearSearchBlog } = blogSlice.actions
