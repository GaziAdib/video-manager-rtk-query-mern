import { rootApi } from "../api/rootApi"

export const blogsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch all blogs
        fetchBlogs: builder.query({
            query: () => '/blogs/',
        }),

        // fetchSingleVideo: builder.query({
        //     query: (id) => `/videos/${id}`,
        // }),

        // create Video
        addBlog: builder.mutation({
            query: (data) => ({
                url: '/blogs/createBlog',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdBlog } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchBlogs', undefined, (draft) => {
                            draft?.push(createdBlog);
                        })
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        // delete Video
        // deleteVideo: builder.mutation({
        //     query: (id) => ({
        //         url: `/videos/${id}`,
        //         method: 'DELETE'
        //     }),
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {

        //             await queryFulfilled;

        //             dispatch(
        //                 rootApi.util.updateQueryData(
        //                     'fetchVideos',
        //                     undefined,
        //                     (draft) => {
        //                         return draft.filter(
        //                             (video) => video?._id !== arg
        //                         );
        //                     }
        //                 )
        //             );

        //         } catch (error) {
        //             console.log('error in catch block');
        //         }
        //     }
        // }),

        // update Video
        // updateVideo: builder.mutation({
        //     query: ({ videoId, data }) => ({
        //         url: `/videos/${videoId}/update`,
        //         method: 'PUT',
        //         body: data
        //     }),
        //     async onQueryStarted(args, { queryFulfilled, dispatch }) {
        //         try {

        //             await queryFulfilled;

        //             dispatch(rootApi.util.updateQueryData('fetchSingleVideo', args?.videoId, (draft) => {
        //                 var video = draft;
        //                 Object.assign(video, {
        //                     _id: args?.videoId,
        //                     title: args?.data?.title,
        //                     videoSourceType: args?.data?.videoSourceType,
        //                     category: args?.data?.category,
        //                     description: args?.data?.description,
        //                     thumbnailUrl: args?.data?.thumbnailUrl,
        //                     videoUrl: args?.data?.videoUrl
        //                 });
        //             }));

        //             dispatch(
        //                 rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
        //                     const video = draft?.find((videoItem) => videoItem?._id === args?.videoId);
        //                     video._id = args?.videoId;
        //                     video.title = args?.data?.title;
        //                     video.videoSourceType = args?.data?.videoSourceType
        //                     video.category = args?.data?.category;
        //                     video.description = args?.data?.description;
        //                     video.thumbnailUrl = args?.data?.thumbnailUrl;
        //                     video.videoUrl = args?.data?.videoUrl;
        //                 })
        //             );


        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // }),


        // search by title
        searchBlogByTitle: builder.query({
            query: (title) => `/blogs/search/${title}`
        })
    })
})






export const { useFetchBlogsQuery, useAddBlogMutation, useSearchBlogByTitleQuery } = blogsApi