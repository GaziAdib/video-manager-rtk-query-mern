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
        }),
        // delete Video
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE'
            }),
        }),

          // update Video
        updateVideo: builder.mutation({
            query: ({videoId, data}) => ({
                url: `/videos/${videoId}`,
                method: 'PUT',
                body: data
            }),
        }),

          // update Video like count
          increaseLikeCount: builder.mutation({
            query: ({videoId, likeCount}) => ({
                url: `/videos/${videoId}`,
                method: 'PATCH',
                body: likeCount
            }),
        })
    })
})


export const { useFetchVideosQuery, useFetchSingleVideoQuery, useAddVideosMutation, useDeleteVideoMutation, useUpdateVideoMutation, useIncreaseLikeCountMutation } = videosApi