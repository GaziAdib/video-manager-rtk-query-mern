import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    wishlist: [],
};

const wishlistSlice = createSlice({
    name: 'wishlists',
    initialState,
    reducers: {
        addWishList: (state, action) => {
            if (state?.wishlist) {
                const existId = state?.wishlist?.find((item) => item?.id === action?.payload?.id);
                if (!existId) {
                    state?.wishlist?.push(action?.payload);
                } else {
                    alert('Cannot add multiple times! already added');
                }
            } else {
                state.wishlist.push(action?.payload);
            }
        },

        deleteWishItem: (state, action) => {
            state.wishlist = state.wishlist?.filter((item) => item.id !== action.payload)
        }
    }
});


export default wishlistSlice.reducer;
export const { addWishList, deleteWishItem } = wishlistSlice.actions