import { rootApi } from "../api/rootApi"


export const blogCommentsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all comments for each video id
        fetchBlogComments: builder.query({
            query: (blogId) => `/blog/${blogId}/getComments`,
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.map(({ blogId }) => ({ type: "BlogComment", blogId })),
                        "BlogComment",
                    ]
                    : ["BlogComment"],
        }),


        // create add comment
        addBlogComment: builder.mutation({
            query: ({ blogId, data }) => ({
                url: `/blog/${blogId}/addBlogComment`,
                method: 'POST',
                body: data
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdBlogComment } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchBlogComments', args?.blogId, (draft) => {
                            draft?.push(createdBlogComment);
                        })
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        // delete comment
        deleteBlogComment: builder.mutation({
            query: (blogId) => ({
                url: `/blog/${blogId}/blogComment/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['BlogComment']
        })
    })
})



export const { useFetchBlogCommentsQuery, useAddBlogCommentMutation, useDeleteBlogCommentMutation } = blogCommentsApi