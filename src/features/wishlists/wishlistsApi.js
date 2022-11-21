import { rootApi } from "../api/rootApi"

export const wishlistsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch user based wish
        fetchWishlists: builder.query({
            query: (userId) => `/videos/wishlists/${userId}/all`,
            // providesTags: ['Wish']
        }),

        fetchAllWishlists: builder.query({
            query: () => `/videos/wishlists/allWishlists`,
        }),

        // create wish
        addWishlist: builder.mutation({
            query: (data) => ({
                url: '/videos/wishlists/create',
                method: 'POST',
                body: data
            }),
            // invalidatesTags: ['Wish']
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdWishlist } = await queryFulfilled;
                    console.log(createdWishlist);
                    console.log('arg', arg);

                    dispatch(
                        rootApi.util.updateQueryData('fetchAllWishlists', undefined, (draft) => {
                            draft?.push(createdWishlist);
                        })
                    )

                } catch (error) {
                    alert('error')
                    console.log(error);
                }
            }
        }),
        // delete wishlist
        deleteWishlist: builder.mutation({
            query: (id) => ({
                url: `/videos/wishlists/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData(
                            'fetchAllWishlists',
                            arg?.id,
                            (draft) => {
                                return draft.filter(
                                    (wishlist) => wishlist?._id !== arg
                                );
                            }
                        )
                    );

                } catch (error) {
                    console.log('error in catch block');
                }
            }
        })
    })
})






export const { useFetchWishlistsQuery, useFetchAllWishlistsQuery, useAddWishlistMutation, useDeleteWishlistMutation } = wishlistsApi