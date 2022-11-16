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
        clearBlogSearch: (state) => {
            state.blogSearch = '';
        }
    }
});


export default blogSlice.reducer;
export const { searchBlog, clearBlogSearch } = blogSlice.actions;