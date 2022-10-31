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

            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: createdVideo } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                            draft?.push(createdVideo);
                        })
                    )

                } catch (error) {
                    console.log(error);
                }
            }
        }),
        // delete Video
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {

                    const { data: videoData } = await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData(
                            'fetchVideos',
                            undefined,
                            (draft) => {
                                return draft.filter(
                                    (video) => video?._id !== arg
                                );
                            }
                        )
                    );

                } catch (error) {
                    console.log('error in catch block');
                }
            }
        }),

        // update Video
        updateVideo: builder.mutation({
            query: ({ videoId, data }) => ({
                url: `/videos/${videoId}/update`,
                method: 'PUT',
                body: data
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data: updatedVideo } = await queryFulfilled;
                    console.log(updatedVideo);
                    console.log('args', args);

                    dispatch(
                        rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                            // const video = draft.find((item) => item?._id === args.videoId)
                            const video = draft?.find((videoItem) => videoItem?._id === args?.videoId);
                            console.log(JSON.stringify(video));
                            video._id = args?.videoId;
                            video.title = args?.data?.title;
                            video.category = args?.data?.category;
                            video.description = args?.data?.description;
                            video.thumbnailUrl = args?.data?.thumbnailUrl;
                            video.videoUrl = args?.data?.videoUrl


                        })
                    );

                } catch (error) {
                    console.log(error);
                }
            }
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
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;


                    dispatch(
                        rootApi.util.updateQueryData('fetchSingleVideo', args?.videoId, (draft) => {
                            const videoData1 = draft;

                            if (videoData1?.likes?.indexOf(args?.authorId) == -1) {
                                videoData1?.likes?.push(args?.authorId);
                            }
                        })
                    );

                    dispatch(rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                        const videoData2 = draft?.find((video) => video?._id == args?.videoId)
                        if (videoData2?.likes?.indexOf(args?.authorId) == -1) {
                            videoData2?.likes?.push(args?.authorId);
                        }
                    }));



                } catch (error) {
                    console.log(error);
                }
            }

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
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    await queryFulfilled;

                    dispatch(
                        rootApi.util.updateQueryData('fetchSingleVideo', args?.videoId, (draft) => {
                            const videoData1 = draft;
                            if (videoData1?.likes?.includes(args?.authorId)) {
                                videoData1?.likes?.pop(args?.authorId);
                            }

                        })
                    );

                    dispatch(rootApi.util.updateQueryData('fetchVideos', undefined, (draft) => {
                        const videoData2 = draft?.find((video) => video?._id == args?.videoId);
                        if (videoData2?.likes?.includes(args?.authorId)) {
                            videoData2?.likes?.pop(args?.authorId);
                        }
                    }));

                } catch (error) {
                    console.log(error);
                }
            }
        }),

        // search by title
        searchByTitle: builder.query({
            query: (title) => `videos/search/${title}`
        })
    })
})






export const { useFetchVideosQuery, useFetchSingleVideoQuery, useAddVideosMutation, useDeleteVideoMutation, useUpdateVideoMutation, useLikeVideoByAuthorMutation, useUnlikeVideoByAuthorMutation, useSearchByTitleQuery } = videosApi