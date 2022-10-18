import { rootApi } from "../api/rootApi"

export const wishlistsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all wish
        fetchWishlists: builder.query({
            query: (id) => `/videos/wishlists/${id}/all`,
        }),

        // create wish
        addWishlist: builder.mutation({
            query: (data) => ({
                url: '/videos/wishlists/create',
                method: 'POST',
                body: data
            }),
        }),
        // delete wishlist
        deleteWishlist: builder.mutation({
            query: (id) => ({
                url: `/videos/wishlists/${id}`,
                method: 'DELETE'
            }),
        })
    })
})






export const { useFetchWishlistsQuery, useAddWishlistMutation, useDeleteWishlistMutation } = wishlistsApi