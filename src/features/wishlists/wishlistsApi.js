import { rootApi } from "../api/rootApi"

export const wishlistsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch user based wish
        fetchWishlists: builder.query({
            query: (id) => `/videos/wishlists/${id}/all`,
            providesTags: ['Wishlist']
        }),

        fetchAllWishlists: builder.query({
            query: () => `/videos/wishlists/allWishlists`,
            providesTags: ['Wishlist']
        }),

        // create wish
        addWishlist: builder.mutation({
            query: (data) => ({
                url: '/videos/wishlists/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Wishlist']
        }),
        // delete wishlist
        deleteWishlist: builder.mutation({
            query: (id) => ({
                url: `/videos/wishlists/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Wishlist']
        })
    })
})






export const { useFetchWishlistsQuery, useFetchAllWishlistsQuery, useAddWishlistMutation, useDeleteWishlistMutation } = wishlistsApi