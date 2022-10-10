import { rootApi } from "../api/rootApi"

export const videosApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all video
        fetchVideos: builder.query({
            query: () => '/videos',
        }),

        fetchSingleVideo: builder.query({
            query: (id) => `/videos/${id}`,
        }),

        // create Video
        addVideos: builder.mutation({
            query: (data) => ({
                url: '/videos/createVideo',
                method: 'POST',
                body: data
            }),
        })
    })
})


export const { useFetchVideosQuery, useFetchSingleVideoQuery, useAddVideosMutation } = videosApi