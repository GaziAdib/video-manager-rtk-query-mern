import { rootApi } from "../api/rootApi"

export const profileApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchUserProfileInfo: builder.query({
            query: (userId) => `/user/profile/${userId}`,
        }),

        UpdateUserProfileInfo: builder.mutation({
            query: ({ userId, data }) => ({
                url: `/user/profile/${userId}/update`,
                method: 'PUT',
                body: data
            }),
        }),

    })
})



export const { useFetchUserProfileInfoQuery, useUpdateUserProfileInfoMutation } = profileApi;