import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogSearch: '',
    pageNumber: 1
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
        },
        changePageNumber: (state, action) => {
            state.pageNumber = action.payload;
        }
    }
});


export default blogSlice.reducer;
export const { searchBlog, clearSearchBlog, changePageNumber } = blogSlice.actions
