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
            query: ({ videoId, data }) => ({
                url: `/videos/${videoId}`,
                method: 'PUT',
                body: data
            }),
        }),

        // update Video like By Users
        likeVideoByAuthor: builder.mutation({
            query: ({ videoId, authorId }) => ({
                url: `/videos/${videoId}/likes`,
                method: 'PATCH',
                body: {
                    likes: authorId
                }
            }),
        }),

        // update Video unlike By Users
        unlikeVideoByAuthor: builder.mutation({
            query: ({ videoId, authorId }) => ({
                url: `/videos/${videoId}/unlikes`,
                method: 'PATCH',
                body: {
                    likes: authorId
                }
            }),
        }),

        // search by title
        searchByTitle: builder.query({
            query: (title) => `videos/search/${title}`
        })
    })
})






export const { useFetchVideosQuery, useFetchSingleVideoQuery, useAddVideosMutation, useDeleteVideoMutation, useUpdateVideoMutation, useLikeVideoByAuthorMutation, useUnlikeVideoByAuthorMutation, useSearchByTitleQuery } = videosApi