import { rootApi } from "../api/rootApi"

export const commentsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all comments for each video id
        fetchComments: builder.query({
            query: (id) => `/videos/${id}/comments`,
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: "Comment", id })),
                        "Comment",
                    ]
                    : ["Comment"],
        }),


        // create add comment
        addComment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}/addcomments`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdComment } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchComments', args?.id, (draft) => {
                            // console.log(JSON.stringify(draft));
                            draft?.push(createdComment);
                        })
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        // delete comment
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