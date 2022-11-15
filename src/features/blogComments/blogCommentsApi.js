import { rootApi } from "../api/rootApi"

router.get('/:id/getComments', getBlogComments)

//add new blog comment
router.post('/:id/addBlogComment', addBlogComment)

//delete comment
router.delete('/:id/blogComment/delete', deleteBlogCommentById)


export const blogCommentsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all comments for each video id
        fetchBlogComments: builder.query({
            query: (blogId) => `/blog/${blogId}/getComments`,
            providesTags: (result, error, arg) =>
                result
                    ? [
                        ...result.map(({ blogId }) => ({ type: "Comment", blogId })),
                        "Comment",
                    ]
                    : ["Comment"],
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
        deleteBlogComment: builder.mutation({
            query: (blogId) => ({
                url: `/blog/${blogId}/blogComment/delete`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comment']
        })
    })
})



export const { useFetchBlogCommentsQuery, useAddBlogCommentMutation, useDeleteBlogCommentMutation } = blogCommentsApi