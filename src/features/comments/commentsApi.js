import { rootApi } from "../api/rootApi"

export const commentsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all comments for each video id
        fetchComments: builder.query({
            query: (id) => `/videos/${id}/comments`,
            providesTags: ['Comment']
        }),

        // create add comment
        addComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}/addcomments`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Comment']
        }),
        // create add comment
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}/comment/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comment']
        })
    })
})






export const { useFetchCommentsQuery, useAddCommentMutation, useDeleteCommentMutation } = commentsApi