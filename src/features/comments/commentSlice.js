import { createSlice } from "@reduxjs/toolkit";


const initialState = {
};

const commentSlice = createSlice({
    name: 'comments',
    initialState
});

export default commentSlice.reducer;
