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
            query: (videoId) => ({
                url: `/videos/${videoId}/comment/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comment']
            // async onQueryStarted(args, { queryFulfilled, dispatch }) {
            //     try {

            //         await queryFulfilled;

            //         dispatch(
            //             rootApi.util.updateQueryData(
            //                 'fetchComments',
            //                 args?.videoId,
            //                 (draft) => {
            //                     return draft.filter(
            //                         (c) => c?._id != args && c?.video_id == args
            //                     );
            //                 }
            //             )
            //         );

            //     } catch (error) {
            //         console.log(error);
            //     }
            // }
        })
    })
})



export const { useFetchCommentsQuery, useAddCommentMutation, useDeleteCommentMutation } = commentsApi